import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const SideBar = ({ activeSection, onSectionChange }) => {

  const menuItems = [
    { name: "Dashboard", icon: "▦" },
    { name: "Customers", icon: "♙" },
    { name: "Active Customers", icon: "✓" },
    { name: "Inactive Customers", icon: "⊗" }
  ]

  return (
    <aside className="sidebar">

      <div className="logo">
        <div className="logo-icon">
          <FontAwesomeIcon icon={faUsers} />
        </div>
        <div className='logo-text'>
          <h2 > <span >OQULIX</span>CRM</h2>

        </div>
      </div>

      <nav>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={activeSection === item.name ? "active" : ""}
              onClick={() => onSectionChange(item.name)}
            >
              <span>{item.icon}</span>
              {item.name}
            </li>
          ))}
        </ul>
      </nav>

    </aside>
  )
}

export default SideBar
