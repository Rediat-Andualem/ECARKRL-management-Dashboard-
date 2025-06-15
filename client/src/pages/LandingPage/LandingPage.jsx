import React, { useState } from "react";
import styles from "./LandingPage.module.css";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import AddChemicals from "../AddChemical/AddChemical";
import AddGases from "../AddGas/AddGas";
import ConsumeChemicals from "../AddConsumables/AddConsumables";
import RegisterConsumables from "../AddConsumables/AddConsumables";
import AddGasConsumed from "../GasConsumed/GasConsumed";
import ListChemicals from "../ListChemicals/ListChemicals";
import ListConsumables from "../ListConsumables/ListConsumables";
import ListGases from "../ListGases/ListGases.jsx";
import OldGasBills from "../OldGasBills/OldGasBills.jsx";
import UserDisplay from "../UserDisplay/UserDisplay.jsx";

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
        setSelectedComponent(<ListChemicals />);
        break;
      case "listConsumables":
        setSelectedComponent(<ListConsumables />);
        break;
      case "listGases":
        setSelectedComponent(<ListGases />);
        break;
      case "oldGasBills":
        setSelectedComponent(<OldGasBills />);
        break;
      case "listOfUsers":
        setSelectedComponent(<UserDisplay />);
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
            <button
              className={styles.buttonStyle}
              onClick={() => renderComponent("AddChemicals")}
            >
              Register Chemicals
            </button>
            <br />
            <button
              className={styles.buttonStyle}
              onClick={() => renderComponent("AddGases")}
            >
              Register Gas Cylinder
            </button>
            <br />
            <button
              className={styles.buttonStyle}
              onClick={() => renderComponent("RegisterConsumables")}
            >
              Register Consumables
            </button>
            {/* <br /> */}
            <hr className={`text-white`} />
            <button
              className={styles.buttonStyle}
              onClick={() => renderComponent("AddGasConsumed")}
            >
              Gas cylinder consumed
            </button>
            <br />
            <button
              className={styles.buttonStyle}
              onClick={() => renderComponent("oldGasBills")}
            >
              Old gas bills
            </button>
            <hr className={`text-white`} />
            <button
              className={styles.buttonStyle}
              onClick={() => renderComponent("listChemicals")}
            >
              Search Chemicals
            </button>
            <br />
            <button
              className={styles.buttonStyle}
              onClick={() => renderComponent("listConsumables")}
            >
              Search Consumables
            </button>
            <br />
            <button
              className={styles.buttonStyle}
              onClick={() => renderComponent("listGases")}
            >
              Search Gases
            </button>
            {/* <br /> */}
            <hr className="text-white" />

            {userData.userRole === "1" && (
              <button
                className={styles.buttonStyle}
                onClick={() => renderComponent("listOfUsers")}
              >
                User Profile
              </button>
            )}
          </div>
        </div>
      </div>

      <div className={`${styles.ch2}`}>
  {selectedComponent || (
    <>
      <h1 className="text-white m-4">Select an option from the left</h1>
      <ul className={`text-white m-4 ${styles.forList}`}>
        <li>
          To register chemicals, select <strong>Register Chemicals</strong>.
        </li>
        <li>
          To register gas cylinders, select{" "}
          <strong>Register Gas Cylinder</strong>.
        </li>
        <li>
          To register consumables, select{" "}
          <strong>Register Consumables</strong>.
        </li>
        <li>
          To deduct the amount of gas cylinder used, select{" "}
          <strong>Gas Cylinder Consumed</strong>.
        </li>
        <li>
          To see previous gas bills, select <strong>Old Gas Bills</strong>.
        </li>
        <li>
          To see the list of chemicals in stock, select{" "}
          <strong>Search Chemicals</strong>.
        </li>
        <li>
          To search for consumables in stock, select{" "}
          <strong>Search Consumables</strong>.
        </li>
        <li>
          To see the gases available in stock, select{" "}
          <strong>Search Gases</strong>.
        </li>
      </ul>
    </>
  )}

  {/* Render the selected component if any */}
  {/* {selectedComponent} */}
</div>

    </div>
  );
}

export default LandingPage;
