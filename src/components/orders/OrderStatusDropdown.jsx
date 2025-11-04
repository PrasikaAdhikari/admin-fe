import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { changeStatusAction } from "../../features/orders/orderActions";

const OrderStatusDropdown = ({ orderStatus, orderId }) => {
  const allStatuses = ["Order Received", "Shipped", "Delivered"];
  const [status, setStatus] = useState(orderStatus);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelect = async (selected) => {
    setStatus(selected);
    setIsLoading(true);
    const result = await changeStatusAction(orderId, selected);
    if (result) setIsLoading(false);
  };

  // Filter out the current status so only others appear in dropdown
  const availableOptions = allStatuses.filter((s) => s !== status);

  return (
    <Dropdown>
      <Dropdown.Toggle
        disabled={isLoading}
        variant={
          status === "Delivered"
            ? "success"
            : status === "Shipped"
            ? "warning"
            : "info"
        }
        id="dropdown-basic"
      >
        {status}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {availableOptions.map((option) => (
          <Dropdown.Item key={option} onClick={() => handleSelect(option)}>
            {option}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default OrderStatusDropdown;
