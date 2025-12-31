import React from 'react'
import { MdOutlineFacebook } from 'react-icons/md'
import SignUpForm from '../components/SignUpForm.jsx'
import { Link, useNavigate } from 'react-router-dom'

function SignUp() {

    const navigate = useNavigate()
    
    return (
        <div className='bg-black relative overflow-x-hidden py-4 text-white w-screen  flex flex-col gap-5 justify-center items-center tracking-tighter '>
            <div className='w-[23vw] p-[2vw] border border-gray-400 flex flex-col gap-2.5 justify-center items-center'>
                <div className="w-[19vw] flex flex-col gap-2.5 justify-center items-center">
                    <h2 className='text-4xl mb-3.5'>Instagram</h2>
                    <p className="line-clamp-2 text-center ">Sign up to see photos and videos from your friends.</p>

                    {/* LOGIN WITH FACEBOOK BUTTON */}
                    <button className="py-1 w-[19vw] mt-6 cursor-pointer bg-[#3441AF] text-white rounded-lg text-center">
                        <div className="flex mb-2 justify-center items-center gap-1.5 ]">
                            <MdOutlineFacebook size={25} className='' />
                            <span className='font-semibold'>Log in with Facebook</span>
                        </div>
                    </button>

                    <div className="Or flex gap-2 w-full items-center justify-center ">
                        <div className="w-[7vw] bg-white h-px"></div>
                        <span>OR</span>
                        <div className="w-[7vw] bg-white h-px"></div>
                    </div>

                    {/* SIGNUP FORM */}

                    <SignUpForm/>
                </div>
            </div>

            <div className="w-[23vw] p-[1vw] border border-gray-400 flex flex-col justify-center items-center">
                <p>Have an account?</p>
                <Link to={"/login"}><span className='text-[#4A5DF9] font-semibold'>Log in</span></Link>
            </div>


            {/* <Footer/> */}
        </div>
    )
}

export default SignUp