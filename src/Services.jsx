import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import client from "./api/client";

export default function Services({ service, onChange }) {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await client.get("workshops/categories/");
        setCategories(response.data); //    `response.data` contains an array of category objects
      } catch (err) {
        setError("Failed to fetch categories.");
        console.error("Error fetching service categories:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}>
      <input
        type="text"
        placeholder="Service name"
        value={service.name}
        onChange={(e) => onChange("name", e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={service.description}
        onChange={(e) => onChange("description", e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={service.price || ""}
        onChange={(e) => onChange("price", e.target.value)}
      />

      <select
        value={service.category}
        onChange={(e) => onChange("category", e.target.value)}
        style={{
          padding: "10px",
          marginBottom: "20px",
          backgroundColor: "transparent",
          color: "white",
          width: "300px",
          height: "45px",
          borderRadius: "5px",
          borderColor: "white",
        }}
      >
        <option value="">Service Category</option>
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <option key={index} value={category.name} className="op">
              {category.name}
            </option>
          ))
        ) : (
          <option disabled className="op">
            No categories available
          </option>
        )}
      </select>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

Services.propTypes = {
  service: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    category: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};
