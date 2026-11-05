import React from 'react'

const Header = ({onAddClick}) => {
  return (
    <>
    <div>
       <header className="header">

      <div>
    
        <h1>Dashboard</h1>
        <p>Welcome to your customer management system</p>
      </div>

      <button
  className="add-btn"
  onClick={onAddClick}
>
  + Add Customer
</button>

    </header>
    </div>
    </>
  )
}

export default Header
