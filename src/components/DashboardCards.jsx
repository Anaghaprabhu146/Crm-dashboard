import React from "react";

const DashboardCards = ({ customers }) => {
  // 1. Calculate customer statistics
  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active",
  ).length;

  const inactiveCustomers = customers.filter(
    (customer) => customer.status === "Inactive",
  ).length;

  // 2. Calculate active percentage
  const activePercentage =
    totalCustomers > 0
      ? Math.round((activeCustomers / totalCustomers) * 100)
      : 0;

  // 3. Sort customers by date and ID
  const recentCustomers = [...customers]
    .sort((a, b) => {
      const dateDifference = new Date(b.dateAdded) - new Date(a.dateAdded);

      if (dateDifference !== 0) {
        return dateDifference;
      }

      return Number(b.id) - Number(a.id);
    })
    .slice(0, 3);

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));
  };

  // 4. Dashboard cards
  const cards = [
    {
      title: "TOTAL CUSTOMERS",
      value: totalCustomers,
      description: "All registered accounts",
      percentage: "100% recorded",
      icon: "♧",
      color: "teal",
    },
    {
      title: "ACTIVE CUSTOMERS",
      value: activeCustomers,
      description: "Currently engaged",
      percentage: `${activePercentage}% of total`,
      icon: "♙",
      color: "green",
    },
    {
      title: "INACTIVE CUSTOMERS",
      value: inactiveCustomers,
      description: "Dormant or paused",
      percentage: `${100 - activePercentage}% of total`,
      icon: "♙",
      color: "gray",
    },
    {
      title: "ACCOUNT HEALTH",
      value: `${activePercentage}%`,
      description: "Active customer ratio",
      percentage: activePercentage >= 50 ? "Healthy" : "Needs attention",
      icon: "↗",
      color: "purple",
    },
  ];

  return (
    <div className="dashboard-stats">
      {/* Dashboard Cards */}
      <div className="stats-grid">
        {cards.map((card, index) => (
          <div className="stat-card" key={index}>
            <div className="stat-top">
              <div>
                <h3>{card.title}</h3>
                <h2>{card.value}</h2>
              </div>

              <div className={`stat-icon ${card.color}`}>{card.icon}</div>
            </div>

            <div className="stat-bottom">
              <span>{card.description}</span>
              <strong>{card.percentage}</strong>
            </div>
          </div>
        ))}
      </div>

      {/* Customer Status Distribution */}
      <div className="distribution-card">
        <div className="distribution-header">
          <div>
            <h2>Customer Status Distribution</h2>
            <p>Live split between active accounts and inactive profiles</p>
          </div>

          <div className="status-legend">
            <span className="active-label">● Active ({activeCustomers})</span>

            <span className="inactive-label">
              ● Inactive ({inactiveCustomers})
            </span>
          </div>
        </div>

        <div className="progress-bar">
          <div
            className="progress-active"
            style={{ width: `${activePercentage}%` }}
          ></div>
        </div>

        <div className="distribution-footer">
          <span>{activePercentage}% active rate</span>
          <span>{totalCustomers} total customers tracked in LocalStorage</span>
        </div>
      </div>

      {/* Recently Added Customers */}
      {/* Recently Added Customers */}
      <div className="recent-customers">
        <div className="recent-header">
          <div>
            <h2>Recently Added Customers</h2>
            <p>Latest customer registrations</p>
          </div>

          <span className="recent-count">{recentCustomers.length} Recent</span>
        </div>

        <div className="recent-table-container">
          <table className="recent-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Company</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Date Added</th>
              </tr>
            </thead>

            <tbody>
              {recentCustomers.length > 0 ? (
                recentCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td>
                      <div className="customer-info">
                        <strong>{customer.name}</strong>
                        <span>{customer.email}</span>
                      </div>
                    </td>

                    <td>{customer.company}</td>

                    <td>{customer.phone}</td>

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
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="empty-message">
                    No customers added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
