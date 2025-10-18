import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { fetchOrdersAction } from "../../features/orders/orderActions";

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
      <Table hover>
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
          {orders?.map((order, index) =>
            order.items.map((item, itemIndex) => (
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
                <td className="text-center">{item.quantity} </td>
                <td>{item.price}</td>

                {itemIndex === 0 && (
                  <td rowSpan={order.items.length} className="align-middle">
                    {item.status}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Order;
