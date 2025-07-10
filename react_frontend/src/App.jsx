import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import MyCampaigns from "./pages/myCampaign";
import NewCampaign from "./pages/newCampaign";
import Profile from "./pages/profile";
import UpdateCampaign from "./pages/updateCampaign";
import UpdateProfile from "./pages/updateProfile";
import UserLogin from "./pages/userLogin";
import UserSignup from "./pages/userSignUp";
import Contact from "./pages/contact";
import About from "./pages/about";
import DonatePage from "./pages/donate";
import Campaigns from "./pages/campaigns";
import CampaignsDetails from "./pages/campaignDetails";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { applyInitialTheme } from "./features/auth/themeSlice";
import MyDonations from "./pages/myDonations";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyCampaignDetails from "./pages/myCampDetails";
import ForgetPassword from "./pages/forgetPassword";
import VerifyOtp from "./pages/verifyOtp";
import SetNewPassword from "./pages/SetNewPassword";
import NotFound from "./pages/notFound";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(applyInitialTheme()); // this sets the theme when app starts
  }, [dispatch]);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/allCampaigns" element={<Campaigns />} />
        <Route path="/campaign/:campId" element={<CampaignsDetails />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/myCampaigns" element={<MyCampaigns />} />
        <Route path="/myCampDetails/:campId" element={<MyCampaignDetails />} />
        <Route path="/myDonations" element={<MyDonations />} />
        <Route path="/newCampaign" element={<NewCampaign />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/updateCampaign" element={<UpdateCampaign />} />
        <Route path="/updateProfile/:userId" element={<UpdateProfile />} />
        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/userSignup" element={<UserSignup />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/setNewPassword" element={<SetNewPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

export default App;