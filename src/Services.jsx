import PropTypes from "prop-types";

export default function Services({ service, onChange }) {
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
        value={service.price}
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
        <option value="">SELECT Service TYPE</option>
        <option>Engine & Performance</option>
        <option>Tires & Wheels</option>
        <option>Brakes & Suspension</option>
        <option>Battery & Electrical</option>
        <option>Transmission & Drivetrain</option>
        <option>Exterior & Bodywork</option>
        <option>Interior & Comfort</option>
      </select>
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
