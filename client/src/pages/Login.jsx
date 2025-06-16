import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext';

const Login = () => {

  const [curState, setCurState] = useState("Sign up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const {login} = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (curState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }
    login(curState === "Sign up" ? "signup" : "login", {fullName, email, password, bio})
  }

  return (
    <div className='min-h-screen bg-cover flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>

      {/* left   */}
      {/* <img src={assets.logo_big} alt="" className="w-[min(2vw,150px)]" /> */}
      <img src={assets.logo_big} alt="" className="w-[min(30vw,250px)]" />
      {/* right */}

      <form onSubmit={handleSubmit} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg' action="">
        <h2 className='font-medium text-2xl flex justify-between items-center'>
          {curState}
          {isDataSubmitted && (
            <img onClick={() => setIsDataSubmitted(false)} src={assets.arrow_icon} alt="" className='w-5 cursor-pointer' />
          )}
        </h2>
        {curState === "Sign up" && !isDataSubmitted &&
          (<input type="text"
            className='p-2 border border-gray-500 rounded-md focus:outline-none'
            placeholder='Full Name'
            required
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
          />)
        }
        {
          !isDataSubmitted &&
          (
            <>
              <input type="email"
                className='p-2 border border-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                placeholder='Email Address'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input type="password"
                className='p-2 border border-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                placeholder='Password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </>
          )
        }
        {
          curState === "Sign up" && isDataSubmitted && (
            <textarea
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              rows={4} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Provide a shout bio...' required></textarea>
          )
        }

        <div className='flex items-center gap-2 text-sm text-gray-500'>
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        <button type='submit' className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer'>
          {curState === "Sign up" ? "Create Account" : "Login Now"}
        </button>

        <div className='flex flex-col gap-2'>
          {curState === "Sign up" ? (
            <p className='text-sm text-gray-600'>Already have an account
              <span onClick={() => { setCurState("Login"); setIsDataSubmitted(false) }} className='font-medium text-violet-500 cursor-pointer'> Login here</span>
            </p>
          ) : (
            <p className='text-sm text-gray-600'>Create an account
              <span onClick={() => { setCurState("Sign up"); setIsDataSubmitted(false) }} className='font-medium text-violet-500 cursor-pointer'> Click here</span>
            </p>
          )}
        </div>

      </form>

    </div>
  )
}

export default Login
