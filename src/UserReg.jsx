import client from "./api/client.js";
import { useState, useEffect } from "react";
import ErrorMessage from "./ErrorMessage.jsx";
import "./loginBtn.css";
import { Link } from "react-router-dom";

export default function UserReg() {
  // create states for the  input fields
  const [formInputs, setFormInput] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    phone_numbe: "",
    password: "",
    carmake: 1,
    confirm_pass: "",
  });
  const [error, setError] = useState(null);
  const [responseCar, setResponseCar] = useState([]);
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await client.get("/carmakes/");
        setResponseCar(response.data); //   `response.data` contains the array of car makes
      } catch (err) {
        setError("Failed to fetch car makes.");
        console.error("Error fetching car makes:", err);
      }
    };

    fetchCarData();
  }, []); // Empty dependency array to run only once on component mount

  function getCarID(carName) {
    const car = responseCar.find((car) => car.name === carName);
    return car ? car.id : 1; // Return the car's id, or 1
  }
  const handleReg = async (event) => {
    event.preventDefault();
    setError(null); // Reset error state

    const responseCar = await client.get("/carmakes/");

    console.log(responseCar);

    try {
      // Check if passwords match before making the API call
      if (formInputs.password !== formInputs.confirm_pass) {
        setError("The passwords do not match.");
        return; // Exit early, no need to proceed with the API call
      }
      const response = await client.post("/users/register/", {
        account: {
          email: formInputs.email,
          username: formInputs.username,
          password: formInputs.password,
          phone_number: formInputs.phone_numbe,
        },
        first_name: formInputs.first_name,
        last_name: formInputs.last_name,
        carmake: getCarID(formInputs.carmake),
      });
      console.log(response);
      setError("s");
      // Redirect user or update app state
    } catch (err) {
      console.error("Registration failed:", err);

      // Check for backend validation errors
      if (err.response && err.response.status === 400) {
        const backendErrors = err.response.data; // The error object from the API

        // A helper function to recursively find the first error message
        function extractFirstError(obj) {
          for (const key in obj) {
            if (Array.isArray(obj[key]) && obj[key].length > 0) {
              return obj[key][0]; // Return the first message in the array
            } else if (typeof obj[key] === "object" && obj[key] !== null) {
              const nestedError = extractFirstError(obj[key]); // Recursively check nested objects
              if (nestedError) {
                return nestedError;
              }
            }
          }
          return null; // Return null if no error message is found
        }

        const firstError = extractFirstError(backendErrors); // Extract the first error message
        setError(firstError || "Check data and try again."); // Use the extracted message or a default
      } else {
        // Handle unexpected errors
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
            placeholder="First Name"
            value={formInputs.first_name}
            onChange={(event) => {
              // const newFormInput = {...formInputs}; //shallow copy, spread syntax
              // newFormInput.first_name=event.target.value
              // setFormInput(newFormInput);
              setFormInput({ ...formInputs, first_name: event.target.value });
            }}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={formInputs.last_name}
            onChange={(event) => {
              setFormInput({ ...formInputs, last_name: event.target.value });
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
            }}
          >
            <option value="" className="op">
              Car Make
            </option>
            {responseCar && responseCar.length > 0 ? (
              responseCar.map((car, index) => (
                <option key={index} value={car.name} className="op">
                  {car.name}
                </option>
              ))
            ) : (
              <option disabled>No car makes available</option>
            )}
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
        </form>
        <ErrorMessage message={error} />
        <div>
          <span>Already have an account? </span>
          <Link to="/">Login</Link>
        </div>
      </div>
    </>
  );
}
