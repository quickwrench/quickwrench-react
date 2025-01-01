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
        <option value="">Select Service Type</option>
        <option className="op">Engine & Performance</option>
        <option className="op">Tires & Wheels</option>
        <option className="op">Brakes & Suspension</option>
        <option className="op">Battery & Electrical</option>
        <option className="op">Transmission & Drivetrain</option>
        <option className="op">Exterior & Bodywork</option>
        <option className="op">Interior & Comfort</option>
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
