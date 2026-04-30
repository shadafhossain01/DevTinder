import { Outlet, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "./utils/constant";
import { addUser } from "./store/slices/userSlice";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

function App() {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      if (user) return;
      const res = await axios.get(BaseUrl + "/profile", {withCredentials: true});
      dispatch(addUser(res.data.data));
    } catch {
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) return null;

  return (
    <>
      <Navbar />
      <Toaster />
      <div className="min-h-[70vh] container mx-auto mt-26.25">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
