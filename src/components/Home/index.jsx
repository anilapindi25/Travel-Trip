import React from "react"
import { useNavigate } from "react-router-dom"
import "./index.css"

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="container page">
      <section className="banner">
        <h1>Travel. Relax. Memories.</h1>
        <p>Plan your next trip with a simple guided flow.</p>
        <button className="btn btn-primary" onClick={()=>navigate("/book-a-new-trip")}>
          Book A New Trip
        </button>
      </section>
    </div>
  )
}
export default Home
