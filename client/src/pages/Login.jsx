import React, { useState } from "react"; 
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BaseUrl } from "../utils/constant";
import { addUser } from "../store/slices/userSlice";
import { Link, useNavigate } from "react-router";

const Login = () => {

    const dispatch = useDispatch();
    const navigate=useNavigate()
    const [error,setError]=useState()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const handleSubmit=async(e)=>{
        e.preventDefault()
       try {
        const res= await axios.post(BaseUrl+"/login",{email,password},{withCredentials:true})
        dispatch(addUser(res.data.data))
        toast.success(res.data.message);
        setEmail("")
        setPassword("")
        navigate("/")
       } catch (error) {
         setError(error.response.data.message);
         setInterval(()=>setError(""),4000)
       }
    }

  return (
    <div className="flex justify-center flex-col py-[40px] bg-base-300 px-15 w-[30%] m-auto mt-[40px]">
      <form method="POST" className="rounded-lg" onSubmit={handleSubmit}>
        <h4 className="text-center font-semibold text-2xl  mb-4">
          Log in to DevTinder
        </h4>
        <div className="py-3 ">
          <label className="text-xl font-medium italic">Email :</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
            className="input input-md mt-3 text-base placeholder:text-base outline-0 w-full"
          />
        </div>
        <div className="py-3 ">
          <label className="text-xl font-medium italic">Password :</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
            className="input input-md mt-3 text-base placeholder:text-base outline-0 w-full"
          />
        </div>
        {error && <p className="text-red-500 italic text-base py-2">{error}</p>}
        <button className="btn btn-primary w-full mt-4">Login</button>
      </form>
      <h4 className="mt-8">
        Don't have any Account?
        <Link className="text-primary" to={"/signup"}>
          {" "}
          Signup
        </Link>
      </h4>
    </div>
  );
};

export default Login;
