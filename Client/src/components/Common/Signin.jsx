import { SignIn } from '@clerk/clerk-react'
import React from 'react'

function Signin() {
  return (
    <div className='d-flex justify-content-center align-items-center ' style={{ minHeight: "80vh" }}>
      <SignIn/>
    </div>
  )
}

export default Signin
