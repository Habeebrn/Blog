import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContexProvider'

export const Login = () => {
  const [ inputs, setInputs ] = useState({
    username : "",
    password: "",
  })

const [ error, setError ] = useState (null)

const navigate = useNavigate();

const { login } = useContext(AuthContext) 

// console.log(login, "its login")

// const { currentUser } = useContext(AuthContext)

// console.log(currentUser)


  const handleChange = (e)=> {
    setInputs ( prev => ({...prev, [e.target.name] : e.target.value }))
  }


  const handleSubmit = async (e)=> {
    e.preventDefault();
 
    try {

      await login(inputs)

      navigate("/")
      
    } catch (err) {

      setError(err.response.data)
    }


  }
  return (
    <div className='auth' >

      <h1>Login</h1>

      <form>

          <input type='text' placeholder='Username' name='username' onChange={handleChange} />
          <input type='password' placeholder='Password' name='password' onChange={handleChange} />
          <button onClick={handleSubmit} >Login</button>
              { error && <p> {error} </p>}
          <Link to="/register" >  <span>Dont have an account ? </span></Link>


      </form>



    </div>
  )
}
