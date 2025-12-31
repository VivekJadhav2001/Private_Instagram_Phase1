import React, { useEffect, useState } from 'react'
import Button from './Button.jsx'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch} from 'react-redux'
import { signUpUser } from '../features/authSlice.js'

function SignUpForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signup = async (e) => {
        e.preventDefault();
        try {
            await dispatch(
                signUpUser({
                    name: username,
                    email,
                    password,
                })
            ).unwrap();

            navigate("/login");
        } catch (err) {
            // error already in redux state
        }
    };





    return (
        <form className='flex flex-col gap-2' onSubmit={signup}>
            <input
                type="email"
                id="email"
                placeholder='Enter your email'
                className='p-1.5 h-[6vh] w-[19vw] bg-[#121212] border-white border rounded'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {/* <InputBox type={"email"}/> */}
            <input
                type="password"
                id="password"
                placeholder='Password'
                className='p-1.5 h-[6vh] w-[19vw] bg-[#121212] border-white border rounded'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="text"
                id="Fullname"
                placeholder='Full Name'
                className='p-1.5 h-[6vh] w-[19vw] bg-[#121212] border-white border rounded'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />

            {/* currently username is not required as backend is not designed for it */}
            {/* <input
                type="text"
                id="Username"
                placeholder='Username'
                className='p-1.5 h-[6vh] w-[19vw] bg-[#121212] border-white border rounded'
                required
            /> */}



            <p className="line-clamp-3 text-center tracking-tighter ">People who use our service may have uploaded your contact information to Instagram. <Link ><span className='text-[#3441AF]'>Learn more</span></Link></p>
            <p className="line-clamp-3 text-center tracking-tighter">By signing up, you agree to our Terms,<Link ><span className='text-[#3441AF]'>Privacy Policy </span></Link>and<Link ><span className='text-[#3441AF]'> Cookies Policy.</span></Link>
            </p>


            {/* SIGNUP BUTON */}

            <Button text={"Sign Up"} type={"submit"} />
        </form>
    )
}

export default SignUpForm