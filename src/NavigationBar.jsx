import { useState } from "react";

export function NavigationBar() {
  const [activeTab, setActiveTab] = useState("User"); // Default active tab

  const tabs = [
    { name: "User", href: "/register" },
    { name: "Workshop", href: "/profile" },
  ];

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#2c3e50", // Dark blue/gray background
        padding: "10px 20px",
        marginBottom: "20px",
        width: "620px",
        borderRadius: "5px",
      }}
    >
      {/* Logo or Brand Name */}
      <div
        style={{
          color: "white",
          fontSize: "1.5em",
          fontWeight: "bold",
        }}
      >
        Registration
      </div>

      {/* Navigation Links */}
      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        {tabs.map((tab) => (
          <a
            key={tab.name}
            href={tab.href}
            onClick={() => setActiveTab(tab.name)}
            style={{
              textDecoration: "none",
              color: activeTab === tab.name ? "#2c3e50" : "white", // Active tab text color
              backgroundColor: activeTab === tab.name ? "white" : "transparent", // Active tab background color
              fontSize: "1em",
              fontWeight: activeTab === tab.name ? "bold" : "500", // Bold font for active tab
              padding: "8px 12px",
              borderRadius: "4px",
              transition: "background-color 0.3s, color 0.3s",
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab.name)
                e.target.style.backgroundColor = "#34495e";
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.name)
                e.target.style.backgroundColor = "transparent";
            }}
          >
            {tab.name}
          </a>
        ))}
      </div>
    </nav>
  );
}
