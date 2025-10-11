import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

export const CustomDropdown = ({ options, selected, setSelected, label }) => {
  const handleSelect = (value) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <Dropdown>
      <Dropdown.Toggle
        as="div"
        className="form-control w-100 d-flex justify-content-between align-items-center"
      >
        {selected.length > 0
          ? selected.join(", ")
          : label || "Select categories"}
      </Dropdown.Toggle>

      <Dropdown.Menu className="w-100">
        {options.map((option) => (
          <Dropdown.Item
            key={option.value}
            as="button"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSelect(option.value);
            }}
            className="d-flex justify-content-between align-items-center"
          >
            {option.label}
            {selected.includes(option.value) && (
              <span className="ms-2 text-primary fw-bold">✓</span>
            )}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
