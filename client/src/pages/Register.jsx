import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios" 

export const Register = () => {

  const [ inputs, setInputs ] = useState({
    username : "",
    emai: "",
    password: "",
  })

const [ error, setError ] = useState (null)

const navigate = useNavigate();


  const handleChange = (e)=> {
    setInputs ( prev => ({...prev, [e.target.name] : e.target.value }))
  }


  const handleSubmit = async (e)=> {
    e.preventDefault();
 
    try {

      // console.log(inputs)

      await axios.post("/auth/register", inputs)

      navigate("/login")
      
    } catch (err) {

      setError(err.response.data)
    }


  }

  

  return (
    <div className='auth' >

      <h1>Register</h1>

      <form onSubmit={handleSubmit}>

          <input required type='text' placeholder='Username' name='username' onChange={handleChange} />
          <input required type='email' placeholder='Emial' name='email' onChange={handleChange} />
          <input required type='password' placeholder='Password' name='password' onChange={handleChange} />
          <button onClick={handleSubmit}>Register</button>
             { error &&  <p>{error}</p>}
          <span>Dont have an account ? <Link to="/login" > Login </Link>  </span>


      </form>



    </div>
  )
}