import React, { useState } from 'react'
import loginImage from "../assets/Images/loginImage.png"
import Button from '../components/Button.jsx'
import { MdOutlineFacebook } from "react-icons/md";
import Footer from '../components/Footer.jsx';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/authSlice.js';




function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  async function signIn(e) {
    e.preventDefault()

    try {
      await dispatch(loginUser({ email, password })).unwrap()
      navigate("/")
    } catch (error) {
      console.log(error,"Login not successful")
    }
  }


  return (
    <div className='bg-black text-white h-screen w-screen relative'>
      <div className=" flex gap-5 items-center justify-center pt-20">

        <img src={loginImage} alt="instagram-loginPage" className="" />


        <div className="loginInputs w-[19vw] flex justify-center items-center flex-col gap-1.5">

          <h2 className='text-4xl mb-9'>Instagram</h2>


          <form className='flex flex-col gap-2' onSubmit={signIn}>
            <input
              type="email"
              id=""
              placeholder='Enter your email'
              className='p-1.5 h-[6vh] w-[19vw] bg-[#121212] border-white border rounded'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {/* <InputBox type={"email"}/> */}
            <input
              type="password"
              id=""
              placeholder='Password'
              className='p-1.5 h-[6vh] w-[19vw] bg-[#121212] border-white border rounded'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button text={"Log in"} type="submit" />
          </form>


          <div className="Or flex gap-2 w-full items-center justify-center ">
            <div className="w-[7vw] bg-white h-px"></div>
            <span>OR</span>
            <div className="w-[7vw] bg-white h-px"></div>
          </div>

          <button className=" mt-6 cursor-pointer">
            <div className="flex mb-2 justify-center items-center gap-1.5 text-[#0095F6]">
              <MdOutlineFacebook size={25} className='' />
              <span className='font-semibold'>Log in with Facebook</span>
            </div>
          </button>

          <span className='font-semibold hover:underline'><a href=''>Forgotten your password?</a></span>

          <div className="h-[8vh] w-full p-3 flex items-center justify-center">
            <span>Don't have an account?</span>
            <Link to="/signup" className='text-[#708DFF] font-semibold m-1'>Sign up</Link>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Login