import UserReg from "./UserReg.jsx";
import WorkShop from "./Workshop.jsx";
import { NavigationBar } from "./NavigationBar.jsx";
import { useState } from "react";

export default function Register() {
  const [activeTab, setActiveTab] = useState("Workshop");
  return (
    <>
      <NavigationBar
        active={activeTab}
        onChange={(tabName) => setActiveTab(tabName)}
      />
      {activeTab === "Workshop" ? <WorkShop /> : <UserReg />}
    </>
  );
}
