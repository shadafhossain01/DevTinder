import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BaseUrl } from "../utils/constant";
import { addConnection, removeConnection } from "../store/slices/requestSlice";

const Requests = () => {
    const request=useSelector(state=>state.request)
    const dispatch=useDispatch()

    const getAllRequest=async()=>{
        const res= await axios.get(BaseUrl + "/user/requests/received",{withCredentials:true});
        dispatch(addConnection(res.data.data));
    }

    const handleRequest=async(status,id)=>{
       await axios.post( BaseUrl + `/request/review/${status}/${id}`, {},{withCredentials:true});
        dispatch(removeConnection(id))
    }
    
     useEffect(() => {
        getAllRequest();
    }, []);

    if(request.length==0){
            return (
              <h2 className="text-center font-semibold text-[24px]">
                No Request Found
              </h2>
            );
    }

  return (
    <div className="mt-10 pb-20">
      <h2 className="text-center font-semibold text-[24px] mb-10">
        My <span className="text-primary">Requests</span>
      </h2>

      {request.map((connection) => {
        const { fullname, gender, age, imageUrl, skills, _id } =connection;
        return (
          <div key={_id} className="mt-5 bg-base-300 w-[50%] mx-auto px-10 py-6 rounded-xl">
            <div className="flex items-center gap-x-10">
              <div className="w-[15%]">
                <img src={imageUrl} className="w-25 h-25 rounded-full object-cover object-top" />
              </div>
              <div className="w-[65%]">
                <h2 className="text-2xl mb-2 font-medium">{fullname}</h2>
                {age && gender && (
                  <h6 className="text-[#ddd] text-lg">
                    {age} , {gender}
                  </h6>
                )}
                {skills?.length > 0 && (
                  <p className=" mt-2">
                    Skills : {"   "}
                    {skills.join(", ")}
                  </p>
                )}
              </div>
              <div className="w-[20%]">
                <button
                  className="btn btn-primary"
                  onClick={() => handleRequest("accepted", _id)}
                >
                  Accept
                </button>
                <button
                  className="btn bg-red-500 mt-5 px-4.75"
                  onClick={() => handleRequest("rejected", _id)}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
