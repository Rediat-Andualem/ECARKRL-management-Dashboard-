import React, { useState } from "react";
import styles from "./LandingPage.module.css";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";


import AddChemicals from "../AddChemical/AddChemical";
import AddGases from "../AddGas/AddGas";
import ConsumeChemicals from "../AddConsumables/AddConsumables";
import RegisterConsumables from "../AddConsumables/AddConsumables"
import AddGasConsumed from "../GasConsumed/GasConsumed"


function LandingPage() {
  const userData = useAuthUser();
  const [selectedComponent, setSelectedComponent] = useState(null);

  // Function to handle button clicks and set the component
  const renderComponent = (componentName) => {
    switch (componentName) {
      case "AddChemicals":
        setSelectedComponent(<AddChemicals />);
        break;
      case "AddGases":
        setSelectedComponent(<AddGases />);
        break;
      case "ConsumeChemicals":
        setSelectedComponent(<ConsumeChemicals />);
        break;
      case "RegisterConsumables":
        setSelectedComponent(<RegisterConsumables />);
        break;
      case "AddGasConsumed":
        setSelectedComponent(<AddGasConsumed />);
        break;
      default:
        setSelectedComponent(null);
    }
  };

  return (
    <div className="d-flex">
      {/* Left Side Navigation */}
      <div className={`${styles.ch1}`}>
        <div className={styles.profile}>
          <h3>User Profile Detail</h3>
          <h4>Name : {userData.displayName} </h4>
          <h4>Email : {userData.userEmail} </h4>
          <hr className={`text-white`} />
          <div className="container p-5">
            <button className={styles.buttonStyle} onClick={() => renderComponent("AddChemicals")}>
              Add Chemicals
            </button>
            <br />
            <button className={styles.buttonStyle} onClick={() => renderComponent("AddGases")}>
              Add Gas
            </button>
            <br />
            <button className={styles.buttonStyle} onClick={() => renderComponent("RegisterConsumables")}>
              Consumables Registration
            </button>
            <br />
            <button className={styles.buttonStyle} onClick={() => renderComponent("AddGasConsumed")}>
             Gas cylinder consumed
            </button>
          </div>
        </div>
      </div>

      {/* Right Side Content Area */}
      <div className={`${styles.ch2}`}>
        {selectedComponent || <p>Select an option from the left</p>}
      </div>
    </div>
  );
}

export default LandingPage;
