import React from "react"
import { Link, useNavigate } from "react-router-dom"
import "./index.css"

const Header = () => {
  const navigate = useNavigate()
  const onLogout = () => {
    localStorage.removeItem("jwt_token")
    navigate("/login")
  }
  return (
    <header className="tt-header">
      <div className="tt-wrap container">
        <Link to="/" className="tt-logo logo-caveat">Travel Trip</Link>
        <nav className="tt-nav">
          <Link to="/">Home</Link>
          <Link to="/my-trips">My Trips</Link>
          <button className="btn btn-ghost" onClick={onLogout}>Logout</button>
        </nav>
      </div>
    </header>
  )
}
export default Header
