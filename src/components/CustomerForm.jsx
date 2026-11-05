// Import React and useState
import React, { useState } from "react";

// Create CustomerForm component and receive props
const CustomerForm=({ onSaveCustomer, onClose, customerToEdit })=> {

  // Store customer form values
  const [formData, setFormData] = useState(
    customerToEdit || {
      name: "",
      email: "",
      phone: "",
      company: "",
      status: "Active"
    }
  );

  // Store validation error message
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate phone number
    if (formData.phone.length !== 10 || isNaN(formData.phone)) {
      setError("Enter a valid 10-digit phone number.");
      return;
    }

    // Prepare customer data
    const customerData = {
      ...formData,
      id: customerToEdit ? customerToEdit.id : Date.now(),
      dateAdded: customerToEdit
        ? customerToEdit.dateAdded
        : new Date().toISOString().split("T")[0]
    };

    // Send customer data to App component
    onSaveCustomer(customerData);

    // Close the form
    onClose();
  };

  // Display the form
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>
          {customerToEdit ? "Edit Customer" : "Add Customer"}
        </h2>

        <form onSubmit={handleSubmit}>

          {/* Customer Name */}
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          {/* Customer Email */}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Customer Phone */}
          <input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          {/* Company Name */}
          <input
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
            required
          />

          {/* Customer Status */}
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          {/* Display error */}
          {error && <p className="form-error">{error}</p>}

          {/* Form buttons */}
          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>

            <button type="submit">
              {customerToEdit ? "Update Customer" : "Add Customer"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

// Export component
export default CustomerForm;