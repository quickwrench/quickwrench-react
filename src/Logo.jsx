import logo from "./assets/logo.png";
import "./Logo.css";

export default function Logo() {
  return (
    <>
      <div className={"panal"}>
        <div className={"mylogo"}>
          <img src={logo} alt="our logo" className={"image"} />
        </div>
        <h2 style={{ width: "40%", fontSize: "40px" }}>QuickWrench</h2>
      </div>
    </>
  );
}
