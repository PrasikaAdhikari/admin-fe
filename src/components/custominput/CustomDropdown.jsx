import React from "react";
import { Dropdown } from "react-bootstrap";

export const CustomDropdown = ({ options, selected, setSelected }) => {
  const handleSelect = (value) => {
    setSelected(value);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle
        as="div"
        className="form-control w-100 d-flex justify-content-between align-items-center"
      >
        {selected?.value || "Select category"}
      </Dropdown.Toggle>

      <Dropdown.Menu className="w-100">
        {options.map((option) => (
          <Dropdown.Item
            key={option.value}
            as="button"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleSelect(option);
            }}
            className="d-flex justify-content-between align-items-center"
          >
            {option.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
