import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import logo from "../assets/donateNow.png";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { IoIosLogOut } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiLogin, CiLogout } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

function NavBar() {
  const commonItems = [
    { path: "/allCampaigns", label: "All Campaigns" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
    { path: "/newCampaign", label: "Add Campaign" },
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = localStorage.getItem("add-new-campaign-token");
  const handleClick = () => {
    if (token) {
      navigate("/newCampaign");
    } else {
      navigate("/userSignup");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md px-2 md:px-8 md:py-4 flex justify-between items-center text-base">
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

      <ul className="hidden  lg:flex sm:gap-1 lg:gap-20 text-base font-semibold">
        <li>
          <NavLink
            to="/allCampaigns"
            className={({ isActive }) =>
              `transition px-3 py-1 rounded-md ${
                isActive ? "text-[#01BFBD]" : "text-black hover:text-[#01BFBD]"
              }`
            }
          >
            All Campaigns
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `transition px-3 py-1 rounded-md ${
                isActive ? "text-[#01BFBD]" : "text-black hover:text-[#01BFBD]"
              }`
            }
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `transition px-3 py-1 rounded-md ${
                isActive ? "text-[#01BFBD]" : "text-black hover:text-[#01BFBD]"
              }`
            }
          >
            Contact
          </NavLink>
        </li>

        <li>
          <button
            onClick={handleClick}
            className="transition px-3 py-1 rounded-md text-black hover:text-[#01BFBD]"
          >
            Add Campaign
          </button>
        </li>
      </ul>

      {/* Right Section: Auth Buttons & Hamburger */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Menu */}
        <div className="lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 transition">
                <GiHamburgerMenu size={22} className="text-gray-700" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-64 bg-white border border-gray-200 shadow-lg rounded-lg p-2 mr-[-55px]"
              align="end"
            >
              <DropdownMenuGroup className="space-y-1">
                <Avatar className="cursor-pointer border-2 border-[#01BFBD] hover:ring-2 hover:ring-[#01BFBD] transition">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>

                {isAuthenticated ? (
                  <>
                    <DropdownMenuItem
                      onClick={() => navigate("/profile")}
                      className="flex items-center px-3 py-2 rounded-md hover:bg-[#f0fafa] cursor-pointer"
                    >
                      👤 Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate("/myCampaigns")}
                      className="px-3 py-2 rounded-md hover:bg-[#f0fafa] cursor-pointer"
                    >
                      🎯 My Campaigns
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate("/myDonations")}
                      className="px-3 py-2 rounded-md hover:bg-[#f0fafa] cursor-pointer"
                    >
                      💸 My Donations
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

                {commonItems.map(({ path, label }) => (
                  <DropdownMenuItem
                    key={path}
                    onClick={() => navigate(path)}
                    className="px-3 py-2 rounded-md hover:bg-[#f0fafa] cursor-pointer"
                  >
                    {label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>

              <DropdownMenuSeparator className="my-2 border-t border-gray-200" />

              {isAuthenticated && (
                <DropdownMenuItem
                  onClick={() => {
                    dispatch(logout());
                    setTimeout(() => {
                      navigate("/userLogin");
                    }, 100);
                  }}
                  className="flex items-center px-3 py-2 rounded-md hover:bg-[#ffeaea] cursor-pointer text-red-600"
                >
                  <CiLogout className="mr-2 text-lg" />
                  Logout
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <button
                className="px-4 py-1 bg-[#01BFBD] text-white rounded-full hover:bg-[#019fa5] transition"
                onClick={() => navigate("/myCampaigns")}
              >
                My Campaigns
              </button>
              <button
                className="px-4 py-1 border border-[#01BFBD] text-[#01BFBD] rounded-full hover:bg-[#f0fdfd] transition"
                onClick={() => {
                  dispatch(logout());
                  setTimeout(() => {
                    navigate("/userLogin");
                  }, 100);
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="px-4 py-1 bg-[#01BFBD] text-white rounded-full hover:bg-sky-700 transition"
                onClick={() => navigate("/userSignup")}
              >
                Sign Up
              </button>
              <button
                className="px-4 py-1 border rounded-full hover:bg-gray-100 transition"
                onClick={() => navigate("/userLogin")}
              >
                Login
              </button>
            </>
          )}

          {/* Desktop Avatar Dropdown */}
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
                    onClick={() => {
                      dispatch(logout());
                      setTimeout(() => {
                        navigate("/userLogin");
                      }, 100);
                    }}
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
      </div>
    </nav>
  );
}

export default NavBar;
