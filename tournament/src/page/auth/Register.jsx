import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Register() {
  return (
    <div>
       <Container className="py-5">
        <div className="form-container shadow-sm p-4 rounded">
          <div className="row">
            <div className="mb-3 col-md-6">
              <lable className="form-label kanit-light">
                First Name
                <input className="form-control" name="firstName" />
              </lable>
            </div>
            <div className="mb-3 col-md-6">
              <lable className="form-label kanit-light">
                Last Name
                <input className="form-control" name="lastName" />
              </lable>
            </div>
            <div className="mb-3 col-md-12">
              <lable className="form-label kanit-light">
                Mobile No.
                <input className="form-control" name="mobile" />
              </lable>
            </div>
            <div className="mb-3 col-md-12">
              <lable className="form-label kanit-light">
                Username
                <input className="form-control" name="userName" />
              </lable>
            </div>
            <div className="mb-3 col-md-12">
              <lable className="form-label kanit-light">
                Password
                <input className="form-control" name="password" />
              </lable>
            </div>
            <div className="mb-3 col-md-12">
              <lable className="form-label kanit-light">
                <input className="btn btn-dark rounded-1 w-100" name="password" type="submit" value={"Signup"} />
              </lable>
            </div>
              <p className="text-center mb-0"><Link to="/login">Login</Link> If you already have an account.</p>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Register