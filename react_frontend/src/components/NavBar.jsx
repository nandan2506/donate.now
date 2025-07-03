import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import logo from "../assets/donateNow.png";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { IoIosLogOut } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiLogin, CiLogout } from "react-icons/ci";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md px-8 py-4 flex justify-between items-center text-base">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img
          src={logo}
          alt="DonateNow Logo"
          className="h-16 w-16 object-contain"
        />
        <span className="text-xl font-bold text-[#01BFBD] hidden sm:inline">
          DonateNow
        </span>
      </Link>

      {/* Desktop Links */}
      <ul className="hidden md:flex gap-20 text-base font-semibold">
        <li>
          <Link to="/allCampaigns" className="hover:text-[#01BFBD] transition">
            All Campaigns
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-[#01BFBD] transition">
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-[#01BFBD] transition">
            Contact
          </Link>
        </li>
        <li>
          <Link to="/newCampaign" className="hover:text-[#01BFBD] transition">
            Add Campaign
          </Link>
        </li>
      </ul>

      {/* Right Section: Auth Buttons & Hamburger */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="md:hidden p-2 rounded-md border border-gray-300 hover:bg-gray-100 transition">
              <GiHamburgerMenu size={22} className="text-gray-700" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-64 bg-white border border-gray-200 shadow-lg rounded-lg p-2"
            align="end"
          >
            <DropdownMenuGroup className="space-y-1">
              <DropdownMenuItem
                onClick={() => navigate("/allCampaigns")}
                className="px-3 py-2 rounded-md hover:bg-[#f0fafa] cursor-pointer"
              >
                All Campaigns
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate("/about")}
                className="px-3 py-2 rounded-md hover:bg-[#f0fafa] cursor-pointer"
              >
                About
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate("/contact")}
                className="px-3 py-2 rounded-md hover:bg-[#f0fafa] cursor-pointer"
              >
                Contact
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate("/newCampaign")}
                className="px-3 py-2 rounded-md hover:bg-[#f0fafa] cursor-pointer"
              >
                Add Campaign
              </DropdownMenuItem>

              {isAuthenticated && (
                <>
                  <DropdownMenuItem
                    onClick={() => navigate("/myCampaigns")}
                    className="px-3 py-2 rounded-md hover:bg-[#f0fafa] cursor-pointer"
                  >
                    My Campaigns
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate("/myDonations")}
                    className="px-3 py-2 rounded-md hover:bg-[#f0fafa] cursor-pointer"
                  >
                    My Donations
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="my-2 border-t border-gray-200" />

            {!isAuthenticated ? (
              <DropdownMenuItem
                onClick={() => navigate("/userLogin")}
                className="flex items-center px-3 py-2 rounded-md hover:bg-[#e6f7f8] cursor-pointer text-[#01BFBD]"
              >
                <CiLogin className="mr-2 text-lg" />
                Login
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                onClick={() => dispatch(logout())}
                className="flex items-center px-3 py-2 rounded-md hover:bg-[#ffeaea] cursor-pointer text-red-600"
              >
                <CiLogout className="mr-2 text-lg" />
                Logout
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Auth Buttons (desktop) */}
        {isAuthenticated ? (
          <>
            <button
              className="hidden md:inline px-4 py-1 bg-[#01BFBD] text-white rounded-full hover:bg-[#019fa5] transition"
              onClick={() => navigate("/myCampaigns")}
            >
              My Campaigns
            </button>
            <button
              className="hidden md:inline px-4 py-1 border border-[#01BFBD] text-[#01BFBD] rounded-full hover:bg-[#f0fdfd] transition"
              onClick={() => dispatch(logout())}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              className="hidden md:inline px-4 py-1 bg-[#01BFBD] text-white rounded-full hover:bg-sky-700 transition"
              onClick={() => navigate("/userSignup")}
            >
              Sign Up
            </button>
            <button
              className="hidden md:inline px-4 py-1 border rounded-full hover:bg-gray-100 transition"
              onClick={() => navigate("/userLogin")}
            >
              Login
            </button>
          </>
        )}

        {/* Avatar Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer border-2 border-[#01BFBD] hover:ring-2 hover:ring-[#01BFBD] transition">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-60 bg-white rounded-lg shadow-lg border border-gray-200 p-2"
            align="end"
          >
            {isAuthenticated ? (
              <>
                <DropdownMenuGroup className="space-y-1">
                  <DropdownMenuItem
                    onClick={() => navigate("/profile")}
                    className="flex items-center px-3 py-2 rounded-md hover:bg-[#f0fafa] cursor-pointer"
                  >
                    👤 Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate("/myCampaigns")}
                    className="flex items-center px-3 py-2 rounded-md hover:bg-[#f0fafa] cursor-pointer"
                  >
                    🎯 My Campaigns
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate("/myDonations")}
                    className="flex items-center px-3 py-2 rounded-md hover:bg-[#f0fafa] cursor-pointer"
                  >
                    💸 My Donations
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="my-2 border-t border-gray-200" />

                <DropdownMenuItem
                  onClick={() => dispatch(logout())}
                  className="flex items-center text-red-600 px-3 py-2 rounded-md hover:bg-red-50 cursor-pointer"
                >
                  <IoIosLogOut className="mr-2" />
                  Logout
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem
                onClick={() => navigate("/userLogin")}
                className="flex items-center text-[#01BFBD] px-3 py-2 rounded-md hover:bg-[#e6f7f8] cursor-pointer"
              >
                <CiLogin className="mr-2" />
                Login
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

export default NavBar;
