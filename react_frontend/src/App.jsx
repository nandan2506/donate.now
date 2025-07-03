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

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(applyInitialTheme()); // this sets the theme when app starts
  }, [dispatch])
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
        <Route path="/myDonations" element={<MyDonations />} />
        <Route path="/newCampaign" element={<NewCampaign />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/updateCampaign" element={<UpdateCampaign />} />
        <Route path="/updateProfile/:userId" element={<UpdateProfile />} />
        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/userSignup" element={<UserSignup />} />
      </Routes>
    </div>
  );
}

export default App;
