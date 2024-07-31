import React, { useState } from "react";
import { Container } from "react-bootstrap";
import "./auth.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/dataSlice";
function Login() {
  const [userName,setUserName] =useState();
  const [password,setPassword] =useState();
  const [err,setErr] =useState(undefined);

  const dispatch =useDispatch()
  const navigate =useNavigate()

const LoginBtn = () =>{
  if(!userName || !password){
    setErr("Username and Password doesn\'t match")
  }else{
    const payload ={
      username: userName,
      password:password
    }
    dispatch(login(payload))
    .then((res)=>{
      if(res?.payload?.token){
        localStorage.setItem('accessToken',JSON.stringify(res?.payload?.token))
        // localStorage.setItem('user',JSON.stringify(res?.payload?.user))
        navigate('/')
        window.location.reload()
      }
    })  
    
  }

}
const checkInput = () =>{
  setErr(undefined)
}



  return (
    <div className="bannerlogin">
      <Container className="py-5">
        <div className="form-container shadow-sm p-4 rounded">
          <div className="row">
            {err !== undefined && <p className="alert alert-danger">{err}</p>}
            <div className="mb-3 col-md-12">
              <div className="form-label kanit-light">
                Username
                <input onClick={checkInput} className="form-control" onChange={(e)=>setUserName(e.target.value)} name="userName" />
              </div>
            </div>
            <div className="mb-3">
              <div className="form-label col-md-12 kanit-light">
                Password
                <input type="password" onClick={checkInput} className="form-control" onChange={(e)=>setPassword(e.target.value)} name="password" />
              </div>
            </div>
            <div className="mb-3">
              <div className="form-label col-md-12 kanit-light">
                <input className="btn btn-dark rounded-1 w-100" name="password" type="submit" value={"Login"}  onClick={LoginBtn} />
              </div>
            </div>
              <p className="text-center mb-0"><Link to="/signup">Signup</Link> Create new account.</p>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Login;
