import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./index.css"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPwd, setShowPwd] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError("")
    const userDetails = { username, password }
    try{
      const res = await fetch("https://apis.ccbp.in/login", {
        method: "POST",
        body: JSON.stringify(userDetails),
      })
      const data = await res.json()
      if(res.ok){
        localStorage.setItem("jwt_token", data.jwt_token)
        navigate("/", { replace: true })
      }else{
        setError(data.error_msg || "Invalid credentials")
      }
    }catch(e){
      setError(`Something went wrong. Please try again${e}`)
    }
  }

  return (
    <div className="login-page">
      <form className="login-card card" onSubmit={onSubmit}>
        <h1 className="logo-caveat login-title">Travel Trip</h1>

        <label className="label" htmlFor="username">Username</label>
        <input
          id="username"
          className="input"
          type="text"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          placeholder="rahul"
        />

        <label className="label" htmlFor="password">Password</label>
        <div className="pwd-box">
          <input
            id="password"
            className="input pwd-input"
            type={showPwd ? "text" : "password"}
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="rahul@2021"
          />
          <button
            type="button"
            className="eye-btn"
            data-testid="show-password"
            onClick={()=>setShowPwd(p => !p)}
            aria-label="toggle password"
            title="Show/Hide Password"
          >
            {showPwd ? "🙈" : "👁️"}
          </button>
        </div>

        {error && <p className="error-text">{error}</p>}

        <button type="submit" className="btn btn-primary btn-block">Login</button>
      </form>
    </div>
  )
}
export default Login
