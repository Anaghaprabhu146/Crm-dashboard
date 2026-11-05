import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faEye,
  faPenToSquare,
  faTrash,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const CustomerTable = ({
  customers,
  onDeleteCustomer,
  onEditCustomer,
  onViewCustomer,
}) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 5;

  // Date formatting
  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));
  };

  // Search and filter customers
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = customer.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || customer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate total pages
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  // Calculate customer positions
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;

  // Get customers for current page
  const currentCustomers = filteredCustomers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer,
  );

  // Reset to last available page after deleting customers
  useEffect(() => {
    if (totalPages === 0) {
      if (currentPage !== 1) setCurrentPage(1);
    } else if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // Handle search
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  // Handle filter
  const handleFilter = (filter) => {
    setStatusFilter(filter);
    setCurrentPage(1);
  };

  return (
    <div className="table-container">
      <h2>Customer List</h2>

      {/* Filter buttons */}
      <div className="filter-buttons">
        <button
          className={
            statusFilter === "All" ? "filter-btn selected" : "filter-btn"
          }
          onClick={() => handleFilter("All")}
        >
          All
        </button>

        <button
          className={
            statusFilter === "Active" ? "filter-btn selected" : "filter-btn"
          }
          onClick={() => handleFilter("Active")}
        >
          Active
        </button>

        <button
          className={
            statusFilter === "Inactive" ? "filter-btn selected" : "filter-btn"
          }
          onClick={() => handleFilter("Inactive")}
        >
          Inactive
        </button>
      </div>

      {/* Search box */}
      <div className="search-box">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />

        <input
          type="text"
          placeholder="Search customers by name..."
          value={search}
          onChange={handleSearch}
        />

        {search && (
          <button
            className="clear-search"
            onClick={() => {
              setSearch("");
              setCurrentPage(1);
            }}
            title="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {/* Customer table */}
      <table className="customer">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Status</th>
            <th>Date Added</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredCustomers.length > 0 ? (
            currentCustomers.map((customer) => (
              <tr key={customer.id}>
                <td>
                  <div className="customer-info">
                    <strong>{customer.name}</strong>
                    <span>{customer.email}</span>
                  </div>
                </td>

                <td>{customer.phone}</td>

                <td>{customer.company}</td>

                <td>
                  <span
                    className={`status-badge ${
                      customer.status === "Active" ? "active" : "inactive"
                    }`}
                  >
                    {customer.status}
                  </span>
                </td>

                <td>{formatDate(customer.dateAdded)}</td>

                <td>
                  <div className="action-buttons">
                    <button
                      className="view-btn"
                      title="View Customer"
                      onClick={() => onViewCustomer?.(customer)}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>

                    <button
                      className="edit-btn"
                      title="Edit Customer"
                      onClick={() => onEditCustomer(customer)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>

                    <button
                      className="delete-btn"
                      title="Delete Customer"
                      onClick={() => onDeleteCustomer(customer.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="empty-message">
                No customers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? "active-page" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomerTable;
