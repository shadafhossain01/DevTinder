import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { BaseUrl } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../store/slices/userSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const [signupData, setSignupData] = useState({
    fullname: "",
    email: "",
    password: "",
    about: "",
    age: "",
    gender: "male",
    imageUrl: "",
  });

  const DEFAULT_AVATAR =
    "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg";

  const handleInput = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const userData = {
      ...signupData,
      imageUrl: signupData.imageUrl.trim() === "" ? DEFAULT_AVATAR: signupData.imageUrl,
    };
    
    try {
      const res = await axios.post(BaseUrl + "/singup", userData, {withCredentials: true});
       dispatch(addUser(res.data.data));
       toast.success(res.data.message);
       navigate("/");
    } catch (error) {
     setError(error.response.data.message);
      setInterval(() => setError(""), 5000);
    }
  };

  return (
    <div className="flex justify-center flex-col py-10 bg-base-300 px-15 w-[30%] m-auto my-10">

      <form method="POST" className="rounded-lg" onSubmit={handleSignup}>
        <h4 className="text-center font-semibold text-2xl  mb-4">
          Create Account on DevTinder
        </h4>

        <div className="py-3 ">
          <label className="text-xl font-medium italic">Fullname :</label>
          <input
            type="text"
            name="fullname"
            value={signupData.fullname}
            onChange={handleInput}
            placeholder="Enter your Fullname"
            className="input input-md mt-3 text-base placeholder:text-base outline-0 w-full"
          />
        </div>

        <div className="py-3 ">
          <label className="text-xl font-medium italic">Email :</label>
          <input
            type="email"
            name="email"
            value={signupData.email}
            onChange={handleInput}
            placeholder="Enter your Email"
            className="input input-md mt-3 text-base placeholder:text-base outline-0 w-full"
          />
        </div>

        <div className="py-3 ">
          <label className="text-xl font-medium italic">Password :</label>
          <input
            type="password"
            name="password"
            value={signupData.password}
            onChange={handleInput}
            placeholder="Enter your Password"
            className="input input-md mt-3 text-base placeholder:text-base outline-0 w-full"
          />
        </div>

        <div className="py-3 ">
          <label className="text-xl font-medium italic">Image URL :</label>
          <input
            type="text"
            name="imageUrl"
            value={signupData.imageUrl}
            onChange={handleInput}
            placeholder="Enter your Image URL"
            className="input input-md mt-3 text-base placeholder:text-base outline-0 w-full"
          />
        </div>

        <div className="py-3 ">
          <label className="text-xl font-medium italic">Age :</label>
          <input
            type="number"
            name="age"
            value={signupData.age}
            onChange={handleInput}
            placeholder="Enter your Age"
            className="input input-md mt-3 text-base placeholder:text-base outline-0 w-full"
          />
        </div>

        <div className="py-3 ">
          <label className="text-xl font-medium italic pr-2">Gender :</label>
          <select
            name="gender"
            value={signupData.gender}
            onChange={handleInput}
          >
            <option value="male" className="text-black">
              Male
            </option>
            <option value="female" className="text-black">
              Female
            </option>
          </select>
        </div>

        {error && <p className="text-red-500 italic text-base py-2">{error}</p>}

        <button className="btn btn-primary w-full mt-4">Signup</button>
      </form>
      
      <h4 className="mt-8">
        Already have an Account?
        <Link className="text-primary" to={"/login"}>
          {" "}
          Login
        </Link>
      </h4>
    </div>
  );
};

export default Signup;
