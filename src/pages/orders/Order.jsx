import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { fetchOrdersAction } from "../../features/orders/orderActions";
import OrderStatusDropdown from "../../components/orders/OrderStatusDropdown";

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const result = await fetchOrdersAction();
      if (result.status === "success") setOrders(result.orders);
    };
    getOrders();
  }, []);

  return (
    <div>
      <h1>Manage Orders</h1>
      <Table hover bordered striped>
        <thead>
          <tr>
            <th>#</th>
            <th>OrderId</th>
            <th>Order Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order, index) => (
            <React.Fragment key={order._id}>
              {order.items.map((item, itemIndex) => (
                <tr key={`${order._id}-${item.productId}`}>
                  {itemIndex === 0 && (
                    <>
                      <td rowSpan={order.items.length} className="align-middle">
                        {index + 1}
                      </td>
                      <td rowSpan={order.items.length} className="align-middle">
                        {order._id}
                      </td>
                    </>
                  )}

                  <td>{item.productName}</td>
                  <td className="text-center">{item.quantity} x </td>
                  <td>${item.price}</td>

                  {itemIndex === 0 && (
                    <td
                      rowSpan={order.items.length + 1}
                      className="align-middle"
                    >
                      <OrderStatusDropdown
                        orderStatus={order.status}
                        orderId={order._id}
                      />
                    </td>
                  )}
                </tr>
              ))}
              <tr>
                <td colSpan={4} className="text-end">
                  Total:
                </td>
                <td>${order.total.toFixed(2)}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Order;
