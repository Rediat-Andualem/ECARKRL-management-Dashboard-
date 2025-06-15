import React, { useState } from "react";
import styles from "./LandingPage.module.css";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";


import AddChemicals from "../AddChemical/AddChemical";
import AddGases from "../AddGas/AddGas";
import ConsumeChemicals from "../AddConsumables/AddConsumables";
import RegisterConsumables from "../AddConsumables/AddConsumables"
import AddGasConsumed from "../GasConsumed/GasConsumed"
import ListChemicals from "../ListChemicals/ListChemicals"
import ListConsumables from "../ListConsumables/ListConsumables"
import ListGases from "../ListGases/ListGases.jsx"
import OldGasBills from "../OldGasBills/OldGasBills.jsx"


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
      case "listChemicals":
        setSelectedComponent(< ListChemicals />);
        break;
      case "listConsumables":
        setSelectedComponent(< ListConsumables/>);
        break;
      case "listGases":
        setSelectedComponent(<ListGases />);
        break;
      case "oldGasBills":
        setSelectedComponent(<OldGasBills />);
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
              Register Chemicals
            </button>
            <br />
            <button className={styles.buttonStyle} onClick={() => renderComponent("AddGases")}>
              Register Gas Cylinder
            </button>
            <br />
            <button className={styles.buttonStyle} onClick={() => renderComponent("RegisterConsumables")}>
              Register Consumables
            </button>
            <br />
                <hr className={`text-white`} />
            <button className={styles.buttonStyle} onClick={() => renderComponent("AddGasConsumed")}>
             Gas cylinder consumed
            </button>
            <br />
            <button className={styles.buttonStyle} onClick={() => renderComponent("oldGasBills")}>
             Old gas bills
            </button>
             <hr className={`text-white`} />
              <button className={styles.buttonStyle} onClick={() => renderComponent("listChemicals")}>
              Search Chemicals
            </button>
            <br />
            <button className={styles.buttonStyle} onClick={() => renderComponent("listConsumables")}>
              Search Consumables
            </button>
            <br />
            <button className={styles.buttonStyle} onClick={() => renderComponent("listGases")}>
              Search Gases
            </button>
            <br />
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
