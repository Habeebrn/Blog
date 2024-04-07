import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext();

export const AuthContexProvider = ( {children} ) => {

    const [ currentUser, setCuttentUser ] = useState(JSON.parse(localStorage.getItem("user") || null ))



   //  console.log("data",currentUser)

    const login = async (inputs) => {
       const res =  await axios.post('/auth/login', inputs);
       setCuttentUser(res.data )

    }

    const logout = async (inputs) => {
        await axios.post('/auth/logout', inputs);
        setCuttentUser( null )
     }

     useEffect (()=> {
        localStorage.setItem("user", JSON.stringify(currentUser));

     },[ currentUser ]);

  return (

    <AuthContext.Provider value={ {currentUser, login, logout} } >
      {children} 
  </AuthContext.Provider>
  )
}

export default AuthContexProvider