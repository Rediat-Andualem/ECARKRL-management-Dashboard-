"use client"

import { useState } from "react"
import styles from "./LandingPage.module.css"
import useAuthUser from "react-auth-kit/hooks/useAuthUser"

import AddChemicals from "../AddChemical/AddChemical"
import AddGases from "../AddGas/AddGas"
import ConsumeChemicals from "../AddConsumables/AddConsumables"
import RegisterConsumables from "../AddConsumables/AddConsumables"
import AddGasConsumed from "../GasConsumed/GasConsumed"
import ListChemicals from "../ListChemicals/ListChemicals"
import ListConsumables from "../ListConsumables/ListConsumables"
import ListGases from "../ListGases/ListGases.jsx"
import OldGasBills from "../OldGasBills/OldGasBills.jsx"
import UserDisplay from "../UserDisplay/UserDisplay.jsx"

function LandingPage() {
  const userData = useAuthUser()
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [activeButton, setActiveButton] = useState(null)

  const renderComponent = (componentName) => {
    setActiveButton(componentName)
    switch (componentName) {
      case "AddChemicals":
        setSelectedComponent(<AddChemicals />)
        break
      case "AddGases":
        setSelectedComponent(<AddGases />)
        break
      case "ConsumeChemicals":
        setSelectedComponent(<ConsumeChemicals />)
        break
      case "RegisterConsumables":
        setSelectedComponent(<RegisterConsumables />)
        break
      case "AddGasConsumed":
        setSelectedComponent(<AddGasConsumed />)
        break
      case "listChemicals":
        setSelectedComponent(<ListChemicals />)
        break
      case "listConsumables":
        setSelectedComponent(<ListConsumables />)
        break
      case "listGases":
        setSelectedComponent(<ListGases />)
        break
      case "oldGasBills":
        setSelectedComponent(<OldGasBills />)
        break
      case "listOfUsers":
        setSelectedComponent(<UserDisplay />)
        break
      default:
        setSelectedComponent(null)
    }
  }

  return (
    <div className={styles.container}>
      {/* Left Side Navigation Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.profile}>
          <div className={styles.profileHeader}>
            <h3 className={styles.profileTitle}>User Profile</h3>
          </div>
          <div className={styles.profileInfo}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Name:</span>
              <span className={styles.infoValue}>{userData.displayName}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Email:</span>
              <span className={styles.infoValue}>{userData.userEmail}</span>
            </div>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.buttonGroup}>
            <div className={styles.sectionLabel}>REGISTER</div>
            <button
              className={`${styles.buttonStyle} ${activeButton === "AddChemicals" ? styles.active : ""}`}
              onClick={() => renderComponent("AddChemicals")}
            >
              Register Chemicals
            </button>
            <button
              className={`${styles.buttonStyle} ${activeButton === "AddGases" ? styles.active : ""}`}
              onClick={() => renderComponent("AddGases")}
            >
              Register Gas Cylinder
            </button>
            <button
              className={`${styles.buttonStyle} ${activeButton === "RegisterConsumables" ? styles.active : ""}`}
              onClick={() => renderComponent("RegisterConsumables")}
            >
              Register Consumables
            </button>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.buttonGroup}>
            <div className={styles.sectionLabel}>TRACK</div>
            <button
              className={`${styles.buttonStyle} ${activeButton === "AddGasConsumed" ? styles.active : ""}`}
              onClick={() => renderComponent("AddGasConsumed")}
            >
              Gas Cylinder Consumed
            </button>
            <button
              className={`${styles.buttonStyle} ${activeButton === "oldGasBills" ? styles.active : ""}`}
              onClick={() => renderComponent("oldGasBills")}
            >
              Old Gas Bills
            </button>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.buttonGroup}>
            <div className={styles.sectionLabel}>SEARCH</div>
            <button
              className={`${styles.buttonStyle} ${activeButton === "listChemicals" ? styles.active : ""}`}
              onClick={() => renderComponent("listChemicals")}
            >
              Search Chemicals
            </button>
            <button
              className={`${styles.buttonStyle} ${activeButton === "listConsumables" ? styles.active : ""}`}
              onClick={() => renderComponent("listConsumables")}
            >
              Search Consumables
            </button>
            <button
              className={`${styles.buttonStyle} ${activeButton === "listGases" ? styles.active : ""}`}
              onClick={() => renderComponent("listGases")}
            >
              Search Gases
            </button>

            {userData.userRole === "1" && (
              <>
                <div className={styles.divider}></div>
                <button
                  className={`${styles.buttonStyle} ${activeButton === "listOfUsers" ? styles.active : ""}`}
                  onClick={() => renderComponent("listOfUsers")}
                >
                  User Profile
                </button>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Right Side Main Content */}
      <main className={styles.mainContent}>
        {selectedComponent ? (
          <div className={styles.contentWrapper}>{selectedComponent}</div>
        ) : (
          <div className={styles.welcomeSection}>
            <h1 className={styles.welcomeTitle}>Welcome back!</h1>
            <p className={styles.welcomeSubtitle}>Select an option from the sidebar to get started</p>
            <ul className={styles.instructionsList}>
              <li>
                <strong>Register Chemicals:</strong> Add new chemicals to your inventory
              </li>
              <li>
                <strong>Register Gas Cylinder:</strong> Register new gas cylinders
              </li>
              <li>
                <strong>Register Consumables:</strong> Track consumable items
              </li>
              <li>
                <strong>Gas Cylinder Consumed:</strong> Record gas usage and consumption
              </li>
              <li>
                <strong>Old Gas Bills:</strong> View historical gas bills and records
              </li>
              <li>
                <strong>Search Chemicals:</strong> Find chemicals in your current stock
              </li>
              <li>
                <strong>Search Consumables:</strong> Look up consumables inventory
              </li>
              <li>
                <strong>Search Gases:</strong> View available gases in stock
              </li>
            </ul>
          </div>
        )}
      </main>
    </div>
  )
}

export default LandingPage
