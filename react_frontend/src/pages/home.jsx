import Footer from "@/components/footer";
import NavBar from "@/components/NavBar";
import { useNavigate } from "react-router-dom";
import { FaThumbsUp, FaPeopleGroup } from "react-icons/fa6";
import { FaTools } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { IoLogoWechat } from "react-icons/io5";
import { HiComputerDesktop } from "react-icons/hi2";
import { BiMoneyWithdraw } from "react-icons/bi";
import { BsCurrencyExchange } from "react-icons/bs";
import { useSelector } from "react-redux";

function Home() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      <NavBar />
      <div>
        <section className="w-full">
          <div className="relative w-fit mx-auto h-[600px]">
            {/* Background Image */}
            <img
              className="w-full h-full object-cover"
              src="https://kettocdn.gumlet.io/media/banner/0/71/image/626a109be777492340e46d013c3cad0857a5da3a.png?w=1536&dpr=1.3"
              alt="Fundraiser Background"
            />

            {/* Right-Side Text Overlay */}
            <div className="absolute inset-0 flex md:justify-end items-center px-4 md:px-20">
              <div className="text-white max-w-xl text-right">
                <h2 className="text-[#444] text-2xl sm:text-3xl md:text-4xl font-bold leading-snug mb-6 text-left">
                  Need Funds to Pay For a Medical Emergency or Social Cause?
                </h2>

                <div className="flex flex-wrap gap-6 justify-start mb-6">
                  <div>
                    <strong className="text-xl text-[#01BFBD] sm:text-2xl  block text-start">
                      0%
                    </strong>
                    <p className="text-sm md:text-lg font-bold text-[#999]">
                      PLATFORM FEE*
                    </p>
                  </div>
                  <div>
                    <strong className="text-xl text-[#01BFBD] text-start sm:text-2xl block">
                      72 Lakh+
                    </strong>
                    <p className="text-sm md:text-lg font-bold text-[#999]">
                      CONTRIBUTORS
                    </p>
                  </div>
                  <div>
                    <strong className="text-xl text-[#01BFBD] text-start sm:text-2xl block">
                      3.2 Lakh+
                    </strong>
                    <p className="text-sm md:text-lg font-bold text-[#999]">FUNDRAISERS</p>
                  </div>
                </div>

                <p className="text-lg sm:text-xl text-[#01BFBD] mb-6 text-left">
                  DonateNow's{" "}
                  <strong className="text-[#01BFBD] text-3xl">
                    0% Platform Fees
                  </strong>{" "}
                  ensures maximum funds for you
                </p>

                <div className="flex justify-center md:justify-start" >
                  <button
                  type="button"
                  onClick={() => {
                    isAuthenticated
                      ? navigate("/newCampaign")
                      : navigate("/userSignup");
                  }}
                  className="text-lg sm:text-xl bg-[#01BFBD]   hover:bg-[#019fa5] text-white px-6 py-3 rounded-xl transition"
                >
                  Start a Fundraiser for Free
                </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col justify-center items-center">
          <div className="flex justify-center m-10">
            <div>
              <img
                className="h-[500px] pt-25"
                src="https://ketto.gumlet.io/assets/images/homepage/sac-separator.png?w=100&dpr=1.3"
                alt=""
              />
            </div>

            <div className="flex flex-col items-center justify-center bg-white text-center">
              <h2 className="text-[#01BFBD] font-bold text-4xl mb-10">
                How It Works
              </h2>
              <div className="space-y-20">
                <div>
                  <h3 className="text-[#01BFBD] text-2xl font-medium">
                    Start your fundraiser
                  </h3>
                  <p className="text-gray-600">
                    It'll take only 2 minutes. Just tell us a few details about
                    you and the ones you are raising funds for.
                  </p>
                </div>
                <div className="pt-7">
                  <h3 className="text-[#01BFBD] text-2xl font-medium ">
                    Share your fundraiser
                  </h3>
                  <p className="text-gray-600">
                    All you nedd to do is share the fundraiser with you friends
                    and family. In no time, support will start pouring in.
                  </p>
                  <p className="text-gray-400 text-xs">
                    Share your fundraiser directly from dashboard on social
                    media
                  </p>
                </div>
                <div>
                  <h3 className="text-[#01BFBD] text-2xl font-medium">
                    whihdraw Funds
                  </h3>
                  <p className="text-gray-600">
                    The funds raised can be withdrawn without any hassle
                    directly to your bank account.
                  </p>
                  <p className="text-gray-400 text-xs">
                    It takes only 5 minutes to withdraw funds on donateNow.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={() => {
                isAuthenticated
                  ? navigate("/newCampaign")
                  : navigate("/userSignup");
              }}
              className="text-2xl text-white p-3 rounded-2xl bg-[#01BFBD]"
            >
              Start a Fundraiser for Free
            </button>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-center">
            <div className="flex flex-col md:flex-row items-center justify-evenly shadow-2xl mt-20 md:m-10 gap-20 w-fit pt-10 md:p-20 pb-0">
              <div>
                <img
                  className="h-[700px]"
                  src="https://ketto.gumlet.io/assets/images/homepage/mcd-app-homepage.png?w=576&dpr=1.3"
                  alt=""
                />
              </div>

              <div className="flex flex-col  justify-center items-center p-10">
                <div className="flex flex-col p-10 md:gap-20 md:p-0 justify-center md:items-center">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-600">
                      Manage your fundraisers on the go
                    </h1>
                  </div>

                  <div className="md:grid md:grid-cols-2 gap-30 md:justify-center p-10 md:p-0 items-center">
                    <div className="flex justify-items-start md:flex-col justify-center items-center md:w-20">
                      <img
                        className="md:h-20"
                        src="https://ketto.gumlet.io/assets/images/download/phone.png?w=200&dpr=1.3"
                        alt=""
                      />
                      <span className="md:text-xl text-[#222]">
                        Access a personalized dashboard
                      </span>
                    </div>

                    <div className="flex justify-items-start md:flex-col justify-center items-center md:w-20">
                      <img
                        src="https://ketto.gumlet.io/assets/images/download/withdraw.png?w=200&dpr=1.3"
                        alt=""
                      />
                      <span>Withdraw your funds faster</span>
                    </div>

                    <div className="flex justify-items-start md:flex-col justify-center items-center md:w-20">
                      <img
                        src="https://ketto.gumlet.io/assets/images/download/piggy-bank.png?w=200&dpr=1.3"
                        alt=""
                      />
                      <span>Keep track of all your contributions received</span>
                    </div>

                    <div className="flex justify-items-start md:flex-col justify-center items-center md:w-20">
                      <img
                        src="https://ketto.gumlet.io/assets/images/download/support.png?w=200&dpr=1.3"
                        alt=""
                      />
                      <span>Start fundraisers within seconds</span>
                    </div>
                  </div>
                </div>
                <div className="flex mt-6 pt-6 gap-4 justify-center items-center">
                  <img
                    className="h-10"
                    src="https://ketto.gumlet.io/assets/images/sip/icons/black-google-store.png?w=480&dpr=1.3"
                    alt=""
                  />
                  <img
                    className="h-10"
                    src="	https://ketto.gumlet.io/assets/images/sip/App-Store-black.png?w=480&dpr=1.3"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex flex-col  items-center my-40 ">

            <div className="text-center">
              <h1 className="text-[#444] text-4xl font-bold ">
                Causes you can raise funds for
              </h1>
              <p className="text-[#777] px-10 m-5 font-sans text-xl">
                Be it for a personal need, social cause or a creative idea - you
                can count on us for  the project that you want to raise funds for.
              </p>
            </div>

            <div className="flex justify-center gap-10 flex-wrap md:gap-6 font-sans font-bold">
              <div className="text-white bg-[url(https://ketto.gumlet.io/assets/images/homepage/causes-bg.png)] rounded-2xl justify-center items-center gap-2 flex flex-col w-35 h-35 p-5">
                <i className="fa-solid fa-house-medical text-6xl font-bold"></i>
                <span>MEDICAL</span>
              </div>

              <div className="text-white bg-[url(https://ketto.gumlet.io/assets/images/homepage/causes-bg.png)] rounded-2xl justify-center items-center gap-2  flex flex-col w-35 h-35 p-5">
                <i className="fa-solid fa-monument text-6xl font-bold"></i>
                <span>MEMORIAL</span>
              </div>

              <div className="text-white bg-[url(https://ketto.gumlet.io/assets/images/homepage/causes-bg.png)] rounded-2xl justify-center items-center gap-2  flex flex-col w-35 h-35 p-5">
                <i className="fa-solid fa-baby text-6xl font-bold"></i>
                <span>CHILDREN</span>
              </div>

              <div className="text-white bg-[url(https://ketto.gumlet.io/assets/images/homepage/causes-bg.png)] rounded-2xl justify-center items-center gap-2  flex flex-col w-35 h-35 p-5">
                <i className="fa-solid fa-graduation-cap text-6xl font-bold"></i>
                <span>EDUCATION</span>
              </div>

              <div className="text-white bg-[url(https://ketto.gumlet.io/assets/images/homepage/causes-bg.png)] rounded-2xl justify-center items-center gap-2  flex flex-col w-35 h-35 p-5">
                <i className="fa-solid fa-paw text-6xl font-bold"></i>
                <span>ANIMAL</span>
              </div>

              <div className="text-white bg-[url(https://ketto.gumlet.io/assets/images/homepage/causes-bg.png)] rounded-2xl justify-center items-center gap-2  flex flex-col w-35 h-35 p-5">
                <i className="fa-solid fa-hand-holding-heart text-6xl font-bold"></i>
                <span>OTHERS</span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex flex-col items-center justify-center font-sans gap-4 md:px-10">
            <div>
              <h2 className="text-2xl md:font-bold md:text-4xl font-medium text-gray-700">
                Why DonateNow?
              </h2>
            </div>

            <div className="flex flex-col md:grid md:grid-cols-4 items-center justify-center m-10 md:p-10 gap-10">
              <div className="flex flex-col  items-center  md:justify-center">
                <FaThumbsUp className="text-6xl text-[#01BFBD]" />
                <p className="text-[#444] text-center font-sans">
                  Induxtry's best fundraising success rate
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <FaPeopleGroup className="text-6xl text-[#01BFBD]" />
                <p className="text-[#444] text-center font-sans">
                  Supported By 10,000,000+ Conributors
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <FaTools className="text-6xl text-[#01BFBD]" />
                <p className="text-[#444] text-center font-sans">
                  Easy-To-Manage Tools To Boost Results
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <MdOutlinePayment className="text-6xl text-[#01BFBD]" />
                <p className="text-[#444] text-center font-sans">
                  Receive contributions via all popular payment modes
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <IoLogoWechat className="text-6xl text-center text-[#01BFBD]" />
                <p className="text-[#444] font-sans">Get Expert Support 24/7</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <HiComputerDesktop className="text-6xl text-[#01BFBD]" />
                <p className="text-[#444] text-center font-sans">
                  A Dedicated Smart-Dashboard
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <BiMoneyWithdraw className="text-6xl text-[#01BFBD]" />
                <p className="text-[#444] text-center font-sans">
                  Withdraw Funds Without Hassle
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <BsCurrencyExchange className="text-6xl text-[#01BFBD]" />
                <p className="text-[#444] text-center font-sans">
                  International Payment Support
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Home;
