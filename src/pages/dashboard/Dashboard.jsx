import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUserAction } from "../../features/users/userActions";
import { getProductsAction } from "../../features/products/productActions";

// Charts
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
  TimeScale,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { apiProcessor } from "../../utils/axiosHelper";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
  TimeScale
);

// Small helpers --------------------------------------------------------------
const apiUrl = import.meta.env.VITE_APP_API_URL + "/api/v1";
const currency = (n) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "AUD",
  }).format(Number(n || 0));

const card = (title, value, icon, footer, variant = "primary") => (
  <div className="col-12 col-sm-6 col-xl-3">
    <div className={`card border-0 shadow-sm h-100 gradient-${variant}`}>
      <div className="card-body d-flex align-items-center justify-content-between">
        <div>
          <div className="text-uppercase small text-white-50 fw-semibold mb-1">
            {title}
          </div>
          <div className="h3 text-white mb-0">{value}</div>
        </div>
        <div className="display-6 text-white-50">{icon}</div>
      </div>
      {footer && (
        <div className="card-footer border-0 bg-transparent text-white-50 small">
          {footer}
        </div>
      )}
    </div>
  </div>
);

// Dashboard Component --------------------------------------------------------
export default function AdminDashboard() {
  const dispatch = useDispatch();

  // Redux state
  const { users = [] } = useSelector((s) => s.userStore || {});
  const { products = [] } = useSelector((s) => s.productStore || {});

  // Local state
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetchers -----------------------------------------------------------------
  const fetchOrders = async () => {
    try {
      const {
        status,
        orders = [],
        message,
      } = await apiProcessor({
        method: "GET",
        url: `${apiUrl}/orders`,
        isPrivate: true,
      });
      if (status === "success") return orders;
      throw new Error(message || "Failed to load orders");
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await Promise.all([
          dispatch(getAllUserAction()),
          dispatch(getProductsAction()),
        ]);
        const o = await fetchOrders();
        setOrders(o);
      } catch (e) {
        setError(e?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // Derived metrics ----------------------------------------------------------
  const metrics = useMemo(() => {
    const totalUsers = users.length;
    const totalProducts = products.length;
    const activeProducts = products.filter(
      (p) => p?.status === "active"
    ).length;

    const totalOrders = orders.length;
    const revenue = orders.reduce((sum, o) => {
      // Try a few common total fields
      const v = o?.total ?? o?.grandTotal ?? o?.amount ?? o?.totalAmount ?? 0;
      return sum + Number(v || 0);
    }, 0);

    // Orders by status (schema enum: Order received / Shipped / Delivered)
    const byStatus = orders.reduce(
      (acc, o) => {
        const k = o?.status || "Unknown";
        acc[k] = (acc[k] || 0) + 1;
        return acc;
      },
      { "Order received": 0, Shipped: 0, Delivered: 0 }
    );

    // Orders by day (last 30 days)
    const now = new Date();
    const days = [...Array(30)].map((_, i) => {
      const d = new Date(now);
      d.setDate(now.getDate() - (29 - i));
      d.setHours(0, 0, 0, 0);
      return d;
    });

    const ordersByDay = days.map((d) => {
      const next = new Date(d);
      next.setDate(d.getDate() + 1);
      return orders.filter((o) => {
        const c = new Date(o?.createdAt || o?.updatedAt || Date.now());
        return c >= d && c < next;
      }).length;
    });

    // New users by month (last 6 months)
    const months = [...Array(6)].map((_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
      return d;
    });
    const usersByMonth = months.map((m) => {
      const start = new Date(m.getFullYear(), m.getMonth(), 1);
      const end = new Date(m.getFullYear(), m.getMonth() + 1, 1);
      return users.filter((u) => {
        const c = new Date(u?.createdAt || u?.updatedAt || Date.now());
        return c >= start && c < end;
      }).length;
    });

    return {
      totalUsers,
      totalProducts,
      activeProducts,
      totalOrders,
      revenue,
      byStatus,
      days,
      ordersByDay,
      months,
      usersByMonth,
    };
  }, [users, products, orders]);

  // Chart data ---------------------------------------------------------------
  const ordersLineData = useMemo(
    () => ({
      labels: metrics.days.map((d) => d.toLocaleDateString()),
      datasets: [
        {
          label: "Orders (last 30 days)",
          data: metrics.ordersByDay,
          borderWidth: 2,
          fill: true,
          tension: 0.35,
        },
      ],
    }),
    [metrics.days, metrics.ordersByDay]
  );

  const usersBarData = useMemo(
    () => ({
      labels: metrics.months.map((m) =>
        m.toLocaleDateString(undefined, { month: "short", year: "2-digit" })
      ),
      datasets: [
        {
          label: "New users (6 mo)",
          data: metrics.usersByMonth,
        },
      ],
    }),
    [metrics.months, metrics.usersByMonth]
  );

  const ordersByStatusData = useMemo(() => {
    const labels = Object.keys(metrics.byStatus);
    return {
      labels,
      datasets: [
        {
          label: "Orders by status",
          data: labels.map((k) => metrics.byStatus[k]),
        },
      ],
    };
  }, [metrics.byStatus]);

  const productsDoughnut = useMemo(() => {
    const inactive = metrics.totalProducts - metrics.activeProducts;
    return {
      labels: ["Active", "Inactive"],
      datasets: [
        {
          label: "Products",
          data: [metrics.activeProducts, inactive],
        },
      ],
    };
  }, [metrics.activeProducts, metrics.totalProducts]);

  // Layout -------------------------------------------------------------------
  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center text-muted">Loading dashboard…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h1 className="h3 fw-bold mb-1">Admin Dashboard</h1>
          <div className="text-muted">
            Overview of users, products, and orders
          </div>
        </div>
        <div className="d-flex gap-2">
          <Link to="/admin/products" className="btn btn-primary">
            Manage Products
          </Link>
          <Link to="/admin/category" className="btn btn-outline-secondary">
            Manage Categories
          </Link>
          <Link to="/admin/users" className="btn btn-outline-secondary">
            Manage Users
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="row g-3 mb-4">
        {card(
          "Users",
          metrics.totalUsers,
          "👤",
          "All registered users",
          "primary"
        )}
        {card(
          "Products",
          metrics.totalProducts,
          "📦",
          `${metrics.activeProducts} active`,
          "info"
        )}
        {card(
          "Orders",
          metrics.totalOrders,
          "🧾",
          "All-time orders",
          "success"
        )}
        {card(
          "Revenue",
          currency(metrics.revenue),
          "💸",
          "All-time gross",
          "warning"
        )}
      </div>

      {/* Charts Grid */}
      <div className="row g-3">
        <div className="col-12 col-xl-8">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-0 pb-0">
              <h6 className="card-title mb-0">Orders (last 30 days)</h6>
            </div>
            <div className="card-body">
              <Line
                data={ordersLineData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: true, position: "top" } },
                  scales: {
                    x: { grid: { display: false } },
                    y: { beginAtZero: true },
                  },
                }}
                height={280}
              />
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-0 pb-0">
              <h6 className="card-title mb-0">Orders by status</h6>
            </div>
            <div className="card-body">
              <Bar
                data={ordersByStatusData}
                options={{
                  responsive: true,
                  indexAxis: "y",
                  plugins: { legend: { display: false } },
                  scales: { x: { beginAtZero: true } },
                }}
                height={280}
              />
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-0 pb-0">
              <h6 className="card-title mb-0">New users (last 6 months)</h6>
            </div>
            <div className="card-body">
              <Bar
                data={usersBarData}
                options={{
                  responsive: true,
                  plugins: { legend: { display: false } },
                  scales: { y: { beginAtZero: true } },
                }}
                height={280}
              />
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-0 pb-0 d-flex align-items-center justify-content-between">
              <h6 className="card-title mb-0">Product status</h6>
              <span className="text-muted small">Active vs Inactive</span>
            </div>
            <div className="card-body d-flex align-items-center justify-content-center">
              <div style={{ maxWidth: 360, width: "100%" }}>
                <Doughnut
                  data={productsDoughnut}
                  options={{ responsive: true, maintainAspectRatio: true }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders table */}
      <div className="row g-3 mt-1">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 pb-0 d-flex align-items-center justify-content-between">
              <h6 className="card-title mb-0">Recent orders</h6>
              <Link
                to="/admin/orders"
                className="btn btn-sm btn-outline-secondary"
              >
                View all
              </Link>
            </div>
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 8).map((o, idx) => (
                    <tr key={o._id || idx}>
                      <td className="text-muted">
                        {String(o._id || "").slice(-6)}
                      </td>
                      <td>{o?.customerName || o?.customer?.name || "-"}</td>
                      <td>
                        <span className="badge bg-secondary-subtle border text-secondary fw-semibold">
                          {o?.status || "Unknown"}
                        </span>
                      </td>
                      <td>
                        {currency(o?.total ?? o?.grandTotal ?? o?.amount ?? 0)}
                      </td>
                      <td className="text-nowrap">
                        {new Date(o?.createdAt || Date.now()).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  {!orders.length && (
                    <tr>
                      <td colSpan={5} className="text-center text-muted py-4">
                        No orders yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Styles (scoped) */}
      <style>{`
        .gradient-primary { background: linear-gradient(135deg, #1e3a8a, #3b82f6); }
        .gradient-info    { background: linear-gradient(135deg, #0e7490, #06b6d4); }
        .gradient-success { background: linear-gradient(135deg, #166534, #22c55e); }
        .gradient-warning { background: linear-gradient(135deg, #92400e, #f59e0b); }
        .card { border-radius: 1rem; }
      `}</style>
    </div>
  );
}
