import axios from "axios";
import React, { useEffect } from "react";
import { BaseUrl } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../store/slices/connectionSlice";

const Connections = () => {
  const allConnections = useSelector((state) => state.connection);
  const dispatch = useDispatch();

  const getAllMyConnections = async () => {
    if (allConnections && allConnections.length > 0) return;
    const res = await axios.get(BaseUrl + "/user/connections", { withCredentials: true});
    dispatch(addConnection(res.data.data));
  };

  useEffect(() => {
    getAllMyConnections();
  }, []);

  if (allConnections.length === 0) {
    return (
      <h2 className="text-center font-semibold text-[24px]">
        No Connections Found
      </h2>
    );
  }

  return (
    <div className="mt-10 pb-20">
      <h2 className="text-center font-semibold text-[24px] mb-10">
        My <span className="text-primary">Connections</span>
      </h2>
      {allConnections.map((connection) => {
        const { fullname, gender, age, imageUrl, skills, _id, about } = connection;
        return (
          <div
            key={_id}
            className="mt-5 bg-base-300 w-[50%] mx-auto px-10 py-6 rounded-xl"
          >
            <div className="flex items-center gap-x-10">
              <div className="w-[15%]">
                <img src={imageUrl} className="w-25 h-25 object-cover object-top rounded-full" />
              </div>
              <div className="w-[85%]">
                <h2 className="text-2xl mb-1 font-medium">{fullname}</h2>
                {age && gender && (
                  <h6 className="text-[#ddd] text-lg mb-2">
                    {age} , {gender}
                  </h6>
                )}
                {about && (
                  <p className="text-[#ddd] text-justify mt-1">{about}</p>
                )}
                {skills?.length > 0 && <p className="font-medium text-lg">Skills :  {"   "}{skills.join(", ")}</p>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
