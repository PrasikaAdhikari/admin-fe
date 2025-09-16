import {
  FaHome,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-6">
      <h1 className="text-2xl font-bold mb-10">WhiteUI.Store</h1>

      <nav className="flex flex-col gap-6">
        <a
          href="/dashboard"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <FaHome /> Dashboard
        </a>
        <a
          href="/products"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <FaBox /> Products
        </a>
        <a
          href="/orders"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <FaShoppingCart /> Orders
        </a>
        <a
          href="/customers"
          className="flex items-center gap-3 hover:text-blue-400"
        >
          <FaUsers /> Users
        </a>
        <FaChartLine /> Reports
      </nav>
    </div>
  );
};

export default Sidebar;
