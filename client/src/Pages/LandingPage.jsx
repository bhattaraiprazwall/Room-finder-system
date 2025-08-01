import React from 'react';
// import Navbar from '../Components/Navbar';
import Footer from './Footer';
import InfoBanner from './InfoBanner';
import EnhancedQuoteSection from './EnhancedQuoteSection';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar /> */}

    <header
  className="bg-cover bg-center py-32 text-center"
  // style={{
  //   backgroundImage: `url('/assets/banner_image.jpg')`, // Replace with your actual image path
  // }}
>
  <div className="bg-white/70 p-8 rounded-xl inline-block">
    <h1 className="text-4xl font-bold text-blue-700">Find Your Perfect Room</h1>
    <p className="mt-4 text-lg text-gray-600">Search, compare, and rent rooms easily</p>
    <div className="mt-6">
      <a
        href="/Register"
        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
      >
        Get Started
      </a>
    </div>
  </div>
</header>


      <section className="my-12 px-6">
        <InfoBanner />
      </section>

      <section className="my-12 px-6">
        <EnhancedQuoteSection />
      </section>

      <section className="bg-gray-100 p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Are You a Room Owner?</h2>
        <p className="mb-4 text-gray-700">List your room and reach thousands of potential renters.</p>
        <a
          href="/Owner"
          className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Post Your Room
        </a>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
