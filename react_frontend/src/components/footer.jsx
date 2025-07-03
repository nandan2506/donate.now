function Footer() {
  return (
    <footer className="bg-[#01BFBD] text-white py-20">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold">DonateNow</h3>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} DonateNow. All rights reserved.
          </p>
        </div>

        {/* Middle Section (Optional Social Links) */}
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-200 transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gray-200 transition">
            Terms
          </a>
          <a href="#" className="hover:text-gray-200 transition">
            Help
          </a>
        </div>

        {/* Right Section */}
        <div className="text-sm text-center md:text-right">
          Made with <span className="text-red-500">♥</span> by{" "}
          <span className="font-semibold">Nandan</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
