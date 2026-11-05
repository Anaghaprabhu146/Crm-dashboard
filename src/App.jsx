import "./App.css";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import DashboardCards from "./components/DashboardCards";
import CustomerTable from "./components/CustomerTable";
import CustomerForm from "./components/CustomerForm";

import { useEffect, useState } from "react";
import customersData from "./data/customers";

function App() {
  const [customers, setCustomers] = useState(() => {
    const savedCustomers = localStorage.getItem("customers");

    if (savedCustomers) {
      try {
        return JSON.parse(savedCustomers);
      } catch (error) {
        console.error("Unable to read saved customers:", error);
      }
    }

    return customersData;
  });

  const [viewCustomer, setViewCustomer] = useState(null);
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [showForm, setShowForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Save customers in LocalStorage
  useEffect(() => {
    localStorage.setItem("customers", JSON.stringify(customers));
  }, [customers]);

  // Add customer
  const handleAddCustomer = (newCustomer) => {
    setCustomers((previousCustomers) => [
      ...previousCustomers,
      newCustomer,
    ]);
  };

  // Edit customer
  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
    setShowForm(true);
  };

  // Delete customer
  const handleDeleteCustomer = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (confirmDelete) {
      setCustomers((previousCustomers) =>
        previousCustomers.filter((customer) => customer.id !== id)
      );
    }
  };

  // Save edited or new customer
  const handleSaveCustomer = (customerData) => {
    if (selectedCustomer) {
      setCustomers((previousCustomers) =>
        previousCustomers.map((customer) =>
          customer.id === selectedCustomer.id
            ? customerData
            : customer
        )
      );
    } else {
      setCustomers((previousCustomers) => [
        ...previousCustomers,
        customerData,
      ]);
    }

    setSelectedCustomer(null);
    setShowForm(false);
  };

  // Close form
  const handleCloseForm = () => {
    setSelectedCustomer(null);
    setShowForm(false);
  };

  // Change sidebar section
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  // Filter customers based on sidebar selection
  const filteredCustomers = customers.filter((customer) => {
    if (activeSection === "Active Customers") {
      return customer.status === "Active";
    }

    if (activeSection === "Inactive Customers") {
      return customer.status === "Inactive";
    }

    return true;
  });

  return (
    <div className="app-container">
      <SideBar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      <main className="main-content">
        <Header onAddClick={() => setShowForm(true)} />

        <section className="dashboard-content">
          {/* Welcome Banner */}
          <div className="welcome-banner">
            <div className="banner-info">
              <span className="banner-tag">
                ✧ CRM Insights & Overview
              </span>

              <h1>Customer Management Hub</h1>

              <p>
                Track customer engagement, manage active accounts, and monitor
                recent acquisitions seamlessly in real-time.
              </p>
            </div>

            <div className="banner-actions">
              <button
                className="banner-btn primary-btn"
                onClick={() => setShowForm(true)}
              >
                ⊕ Add New Customer
              </button>

              <button
                className="banner-btn secondary-btn"
                onClick={() => setActiveSection("Customers")}
              >
                Manage Customers
              </button>
            </div>
          </div>

          {/* Dashboard */}
          {activeSection === "Dashboard" && (
            <DashboardCards customers={customers} />
          )}

          {/* Customer Table */}
          {activeSection !== "Dashboard" && (
            <>
              <h2 className="section-title">{activeSection}</h2>

              <CustomerTable
                customers={filteredCustomers}
                onDeleteCustomer={handleDeleteCustomer}
                onEditCustomer={handleEditCustomer}
                onViewCustomer={setViewCustomer}
              />
            </>
          )}

          {/* Add / Edit Form */}
          {showForm && (
            <CustomerForm
              key={selectedCustomer?.id || "new"}
              customerToEdit={selectedCustomer}
              onSaveCustomer={handleSaveCustomer}
              onClose={handleCloseForm}
            />
          )}

          {/* View Customer Modal */}
          {viewCustomer && (
            <div className="view-modal">
              <div className="view-modal-content">
                <h2>Customer Details</h2>

                <p>
                  <strong>Name:</strong> {viewCustomer.name}
                </p>

                <p>
                  <strong>Email:</strong> {viewCustomer.email}
                </p>

                <p>
                  <strong>Phone:</strong> {viewCustomer.phone}
                </p>

                <p>
                  <strong>Company:</strong> {viewCustomer.company}
                </p>

                <p>
                  <strong>Status:</strong> {viewCustomer.status}
                </p>

                <p>
                  <strong>Date Added:</strong>{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }).format(new Date(viewCustomer.dateAdded))}
                </p>

                <button onClick={() => setViewCustomer(null)}>
                  Close
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;