import Footer from "@/components/footer";
import NavBar from "@/components/NavBar";

function About() {
  return (
    <>
      <NavBar />
      <section className="bg-gradient-to-br from-[#f0fafa] to-[#e0ffff] min-h-screen py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#01BFBD] mb-6">
            About DonateNow
          </h1>
          <p className="text-gray-700 text-lg md:text-xl mb-8">
            DonateNow is a trusted platform that helps people raise funds for
            medical emergencies, social causes, education, and personal needs.
            We connect generous contributors with meaningful stories.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-[#01BFBD] mb-3">
              💡 Our Mission
            </h3>
            <p className="text-gray-600">
              We aim to empower individuals and organizations by giving them a
              voice and the tools to raise funds online quickly and
              transparently — no platform fees, no hidden conditions.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-[#01BFBD] mb-3">
              🌍 Our Impact
            </h3>
            <p className="text-gray-600">
              With over 3.2 lakh+ fundraisers and 72 lakh+ contributors, we have
              helped raise funds for critical treatments, surgeries, and
              community development — making real change possible.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-[#01BFBD] mb-3">
              🤝 How It Works
            </h3>
            <p className="text-gray-600">
              You start a fundraiser, share it with your network, and receive
              support instantly. 100% of what you raise goes to your cause —
              with a seamless donation and withdrawal process.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-[#01BFBD] mb-3">
              🚀 Why Choose Us
            </h3>
            <p className="text-gray-600">
              User-friendly platform, no platform fee, powerful outreach, and
              secure donations — we're here to make fundraising easy and
              impactful.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default About;
