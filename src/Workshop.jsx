import client from "./api/client.js";
import { useState } from "react";
import ErrorMessage from "./ErrorMessage.jsx";
import "./loginBtn.css";
import { Link } from "react-router-dom";
// import { NavigationBar } from "./NavigationBar.jsx";
import Services from "./Services.jsx";
export default function WorkShop() {
  // create states for the  input fields
  let responseService = null;
  let responseCar = null;
  const prepareData = async () => {
    responseCar = await client.get("/carmakes/");
    responseService = await client.get("/workshops/categories/");
  };
  prepareData();
  const [formInputs, setFormInput] = useState({
    name: "",
    address: "",
    email: "",
    username: "",
    phone_numbe: "",
    password: "",
    carmake: 1,
    confirm_pass: "",
    category: 1,
  });
  const [error, setError] = useState(null);

  const [services, setServices] = useState([]); // Array to manage multiple components

  function getCategoryID(Category) {
    if (!responseService) return 0;
    const category = responseService.data.find(
      (serv) => serv.name === Category
    );
    console.log("here");
    console.log(responseService);
    return category ? Number(category.id) : 1;
  }

  const handleServiceChange = (id, field, value) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === id ? { ...service, [field]: value } : service
      )
    );
  };
  const handleAddService = () => {
    // Add a new blank service object
    setServices([
      ...services,
      { id: Date.now(), name: "", description: "", price: 0, category: 1 },
    ]);
  };

  const handleReg = async (event) => {
    event.preventDefault();
    setError(null); // Reset error state

    console.log(responseCar);

    function getCarID(carName) {
      const car = responseCar.data.find((car) => car.name === carName);
      return car ? car.id : 1; // Return the car's id, or 1
    }

    try {
      // Check if passwords match before making the API call
      if (formInputs.password !== formInputs.confirm_pass) {
        setError("The passwords do not match.");
        return; // Exit early, no need to proceed with the API call
      }

      const response = await client.post("/workshops/register/", {
        name: formInputs.name,
        carmakes: [getCarID(formInputs.carmake)],
        account: {
          email: formInputs.email,
          username: formInputs.username,
          password: formInputs.password,
          phone_number: formInputs.phone_numbe,
        },
        address: formInputs.address,
        services: services.map((service) => ({
          category: getCategoryID(service.category),
          name: service.name,
          description: service.description,
          price: Number(service.price),
        })),
      });

      console.log(response);
      setError("s");
      // Redirect user or update app state
    } catch (err) {
      console.error("Registration failed:", err);

      if (err.response && err.response.status === 400) {
        const backendErrors = err.response.data;

        function extractFirstError(obj) {
          for (const key in obj) {
            if (Array.isArray(obj[key]) && obj[key].length > 0) {
              return obj[key][0];
            } else if (typeof obj[key] === "object" && obj[key] !== null) {
              const nestedError = extractFirstError(obj[key]);
              if (nestedError) {
                return nestedError;
              }
            }
          }
          return null;
        }

        const firstError = extractFirstError(backendErrors);
        setError(firstError || "Check data and try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <div
        className="register"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          // justifySelf: "center",
          // alignSelf: "center",
          alignItems: "center",
        }}
      >
        <form
          onSubmit={handleReg}
          style={{
            height: "60%",
            width: "650px",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
          action="post"
        >
          <input
            type="text"
            placeholder="Name"
            value={formInputs.name}
            onChange={(event) => {
              setFormInput({ ...formInputs, name: event.target.value });
            }}
          />
          <input
            type="text"
            placeholder="Address"
            value={formInputs.address}
            onChange={(event) => {
              setFormInput({ ...formInputs, address: event.target.value });
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={formInputs.email}
            onChange={(event) => {
              setFormInput({ ...formInputs, email: event.target.value });
            }}
          />
          <input
            type="text"
            placeholder="Username"
            value={formInputs.username}
            onChange={(event) => {
              setFormInput({ ...formInputs, username: event.target.value });
            }}
          />

          <input
            type="text"
            placeholder="Phone Number"
            pattern="\+20[0-9]*"
            title="Phone number must start with +20"
            value={formInputs.phone_numbe}
            onChange={(event) => {
              setFormInput({ ...formInputs, phone_numbe: event.target.value });
            }}
          />

          <select
            value={formInputs.carmake}
            onChange={(event) => {
              setFormInput({ ...formInputs, carmake: event.target.value });
            }}
            style={{
              padding: "10px",
              marginBottom: "20px",
              backgroundColor: "transparent",
              color: "white",
              width: "300px",
              height: "45px",
              borderRadius: "5px",
              borderColor: "white",
              placeholder: "Car Type",
            }}
          >
            <option value="" className={"op"}>
              Select Car Type
            </option>
            <option className={"op"}>Toyota</option>
            <option className={"op"}>Honda</option>
            <option className={"op"}>Ford</option>
            <option className={"op"}>BMW</option>
            <option className={"op"}>Mercedes</option>
          </select>
          <input
            type="password"
            placeholder="Password"
            value={formInputs.password}
            onChange={(event) => {
              setFormInput({ ...formInputs, password: event.target.value });
            }}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={formInputs.confirm_pass}
            onChange={(event) => {
              setFormInput({ ...formInputs, confirm_pass: event.target.value });
            }}
          />
          <button type="button" onClick={handleAddService}>
            Add Service
          </button>
          {services.map((service) => (
            <Services
              key={service.id}
              service={service}
              onChange={(field, value) =>
                handleServiceChange(service.id, field, value)
              }
            />
          ))}

          <div
            style={{
              width: "100%", // Take full width to use justify-content
              height: "50px",
              display: "flex",
              justifyContent: "center",
              marginTop: "20px", // Add spacing above if needed
            }}
          >
            <input
              type="submit"
              value="Register"
              className="button"
              to="/profile"
              style={{
                justifySelf: "center",
                padding: "10px 20px",
                borderRadius: "5px",
                fontWeight: "bold",
                fontSize: "20px",
                width: "620px",
              }}
            />
          </div>
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <span>Already have an account? </span>
            <Link to="/">Login</Link>
          </div>
        </form>
        <ErrorMessage message={error} />
      </div>
    </>
  );
}
