import React, { useMemo, useState } from "react"
import "./index.css"

const SUCCESS_IMG = "https://assets.ccbp.in/frontend/react-js/travel-trip-steps-successfully-completed-img.png"

const STEP_LIST = [
  { key:"details", displayText:"Your Details" },
  { key:"dates", displayText:"Date Selection" },
  { key:"guests", displayText:"Guests" },
  { key:"assist", displayText:"Travel Assistance" },
  { key:"confirm", displayText:"Confirmation" }
]

const initialForm = {
  name:"",
  startLocation:"",
  endLocation:"",
  startDate:"",
  endDate:"",
  adults:1,
  children:0,
  infants:0,
  needAssist:false,
  assistType:"Wheelchair"
}

function Stepper({ stepIndex }){
  return (
    <div className="stepper">
      {STEP_LIST.map((s, idx)=>{
        const status = idx < stepIndex ? "done" : idx===stepIndex ? "active" : ""
        return (
          <div className={`step ${status}`} key={s.key}>
            {idx < stepIndex ? (
              <img src={SUCCESS_IMG} alt={s.displayText} className="done-img" />
            ) : (
              <span className="dot">{idx+1}</span>
            )}
            <span>{s.displayText}</span>
          </div>
        )
      })}
    </div>
  )
}

export default function BookNewTrip(){
  const [step, setStep] = useState(0) // 0..4
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})

  const onChange = (key, val) => setForm(prev => ({...prev, [key]:val}))

  const validateStep = () => {
    const e = {}
    if(step===0){
      if(!form.name.trim()) e.name = "Enter your name"
      if(!form.startLocation.trim()) e.startLocation = "Enter your start location"
      if(!form.endLocation.trim()) e.endLocation = "Enter your end location"
    }
    if(step===1){
      if(!form.startDate) e.startDate = "Select start date"
      if(!form.endDate) e.endDate = "Select end date"
      if(form.startDate && form.endDate && new Date(form.endDate) < new Date(form.startDate)){
        e.endDate = "The end date cannot be less than the start date"
      }
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onNext = () => { if(validateStep()) setStep(s=>s+1) }
  const onPrev = () => setStep(s=>Math.max(0,s-1))

  const onCancel = () => {
    setForm(initialForm)
    setErrors({})
    setStep(0)
  }

  const onConfirm = () => {
    // persist trip
    const trips = JSON.parse(localStorage.getItem("trips") || "[]")
    trips.push({
      id: Date.now(),
      ...form
    })
    localStorage.setItem("trips", JSON.stringify(trips))
    setStep(5) // success screen
  }

  const summary = useMemo(()=>[
    { label:"Name", value:form.name },
    { label:"From", value:form.startLocation },
    { label:"To", value:form.endLocation },
    { label:"Start Date", value:form.startDate },
    { label:"End Date", value:form.endDate },
    { label:"Adults", value:form.adults },
    { label:"Children", value:form.children },
    { label:"Infants", value:form.infants },
    { label:"Assistance", value: form.needAssist ? form.assistType : "No" }
  ],[form])

  return (
    <div className="container page">
      <h2 className="page-title">Book A New Trip</h2>

      {/* Stepper (hide on success) */}
      {step <= 4 && <Stepper stepIndex={step} />}

      <div className="card">
        {/* STEP 0 — Your Details */}
        {step===0 && (
          <div className="form-grid">
            <div>
              <label className="label" htmlFor="name">Name</label>
              <input id="name" className="input" value={form.name} onChange={e=>onChange("name", e.target.value)} />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </div>

            <div>
              <label className="label" htmlFor="startLoc">Start Location</label>
              <input id="startLoc" className="input" value={form.startLocation} onChange={e=>onChange("startLocation", e.target.value)} />
              {errors.startLocation && <p className="error-text">{errors.startLocation}</p>}
            </div>

            <div>
              <label className="label" htmlFor="endLoc">End Location</label>
              <input id="endLoc" className="input" value={form.endLocation} onChange={e=>onChange("endLocation", e.target.value)} />
              {errors.endLocation && <p className="error-text">{errors.endLocation}</p>}
            </div>

            <div className="actions">
              <button className="btn btn-primary" onClick={onNext}>Next</button>
            </div>
          </div>
        )}

        {/* STEP 1 — Date Selection */}
        {step===1 && (
          <div className="form-grid">
            <div>
              <label className="label" htmlFor="startDate">Start Date</label>
              <input id="startDate" className="input" type="date" value={form.startDate} onChange={e=>onChange("startDate", e.target.value)} />
              {errors.startDate && <p className="error-text">{errors.startDate}</p>}
            </div>
            <div>
              <label className="label" htmlFor="endDate">End Date</label>
              <input id="endDate" className="input" type="date" value={form.endDate} onChange={e=>onChange("endDate", e.target.value)} />
              {errors.endDate && <p className="error-text">{errors.endDate}</p>}
            </div>

            <div className="actions">
              <button className="btn btn-ghost" onClick={onPrev}>Previous</button>
              <button className="btn btn-primary" onClick={onNext}>Next</button>
            </div>
          </div>
        )}

        {/* STEP 2 — Guests */}
        {step===2 && (
          <div className="form-grid">
            <Counter
              label="Adults"
              min={1}
              value={form.adults}
              onChange={v=>onChange("adults", v)}
            />
            <Counter
              label="Children"
              min={0}
              value={form.children}
              onChange={v=>onChange("children", v)}
            />
            <Counter
              label="Infants"
              min={0}
              value={form.infants}
              onChange={v=>onChange("infants", v)}
            />
            <div className="actions">
              <button className="btn btn-ghost" onClick={onPrev}>Previous</button>
              <button className="btn btn-primary" onClick={onNext}>Next</button>
            </div>
          </div>
        )}

        {/* STEP 3 — Travel Assistance */}
        {step===3 && (
          <div className="form-grid">
            <div>
              <label className="label">
                <input
                  type="checkbox"
                  checked={form.needAssist}
                  onChange={e=>onChange("needAssist", e.target.checked)}
                />{" "}
                Travel assistance needed
              </label>
            </div>

            {form.needAssist && (
              <div>
                <label className="label" htmlFor="assistType">Travel Assistance</label>
                <select
                  id="assistType"
                  className="select"
                  value={form.assistType}
                  onChange={(e)=>onChange("assistType", e.target.value)}
                >
                  <option>Wheelchair</option>
                  <option>Priority Boarding</option>
                  <option>Language Support</option>
                  <option>Medical Assistance</option>
                </select>
              </div>
            )}

            <div className="actions">
              <button className="btn btn-ghost" onClick={onPrev}>Previous</button>
              <button className="btn btn-primary" onClick={onNext}>Next</button>
            </div>
          </div>
        )}

        {/* STEP 4 — Confirmation */}
        {step===4 && (
          <div className="confirm-grid">
            <ul className="summary">
              {summary.map(s => (
                <li key={s.label}>
                  <span className="caption">{s.label}</span>
                  <strong>{String(s.value)}</strong>
                </li>
              ))}
            </ul>
            <div className="actions">
              <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>
              <button className="btn btn-primary" onClick={onConfirm}>Confirm</button>
            </div>
          </div>
        )}

        {/* STEP 5 — Success */}
        {step===5 && (
          <div className="success-box">
            <img src={SUCCESS_IMG} alt="success" className="success-img"/>
            <h3>Your trip is confirmed!</h3>
            <p className="caption">You can view it anytime in My Trips.</p>
            <div className="actions">
              <button className="btn btn-primary" onClick={onCancel}>Book New Trip</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* Small reusable counter for Guests step */
function Counter({ label, value, onChange, min=0 }){
  const dec = () => onChange(Math.max(min, value-1))
  const inc = () => onChange(value+1)
  return (
    <div className="counter">
      <span className="label">{label}</span>
      <div className="counter-box">
        <button className="btn btn-ghost" onClick={dec} disabled={value<=min}>-</button>
        <span className="count">{value}</span>
        <button className="btn btn-ghost" onClick={inc}>+</button>
      </div>
      <p className="caption">Min {min}</p>
    </div>
  )
}
