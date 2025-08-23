import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./index.css"

const MyTrips = () => {
  const [trips, setTrips] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("trips") || "[]")
    setTrips(saved)
  }, [])

  const onCancelTrip = (id) => {
    const updated = trips.filter(trip => trip.id !== id)
    setTrips(updated)
    localStorage.setItem("trips", JSON.stringify(updated))
  }

  if (trips.length === 0) {
    return (
      <div className="center container">
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no trips"
            className="empty-img"
          />
          <h3>No upcoming trips</h3>
          <p className="caption">Book a new trip to get started.</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/")}
          >
            Book New Trip
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container page">
      <h2 className="page-title">My Trips</h2>
      <div className="grid">
        {trips.map(trip => (
          <article key={trip.id} className="card trip-card">
            <h3>{trip.startLocation} → {trip.endLocation}</h3>
            <p className="caption">By {trip.name}</p>
            <div className="trip-line">
              <span>Dates</span>
              <strong>{trip.startDate} → {trip.endDate}</strong>
            </div>
            <div className="trip-line">
              <span>Guests</span>
              <strong>A:{trip.adults} C:{trip.children} I:{trip.infants}</strong>
            </div>
            <div className="trip-line">
              <span>Assistance</span>
              <strong>{trip.needAssist ? trip.assistType : "No"}</strong>
            </div>

            {/* Cancel Trip button */}
            <div className="actions">
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onCancelTrip(trip.id)}
              >
                Cancel Trip
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default MyTrips
