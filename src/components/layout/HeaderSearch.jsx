import React, { useEffect, useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

// Flatten any value to lowercase string
const flat = (v) => {
  if (v == null) return "";
  if (typeof v === "string") return v.toLowerCase();
  if (Array.isArray(v)) return v.map(flat).join(" ");
  if (typeof v === "object") return Object.values(v).map(flat).join(" ");
  return String(v).toLowerCase();
};

export default function HeaderSearch({
  placeholder = "Search Products...",
  onSearchChange, // callback to update filtered products in parent
}) {
  const { products } = useSelector((store) => store.productStore);
  const [q, setQ] = useState("");

  useEffect(() => {
    const val = q.trim().toLowerCase();
    if (!val) {
      onSearchChange?.([]); // reset to full list
      return;
    }

    const safeProducts = Array.isArray(products) ? products : [];
    const filtered = safeProducts.filter(
      (p) =>
        flat(p?.name).includes(val) ||
        flat(p?.description).includes(val) ||
        flat(
          p?.category || p?.categoryName || p?.categorySlug || p?.tags
        ).includes(val)
    );

    onSearchChange?.(filtered);
  }, [q, products, onSearchChange]);

  return (
    <InputGroup className="mb-3">
      <Form.Control
        placeholder={placeholder}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="rounded-start-4"
      />
    </InputGroup>
  );
}
