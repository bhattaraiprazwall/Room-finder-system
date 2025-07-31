import React from 'react';
import facelogo from '../assets/facelogo.png';
import  WhatsApplogo from '../assets/whatsapplogo.png';
import instalogo from '../assets/instalogo.png';
import  linkdinlogo from '../assets/linkdinlogo.png';


const Footer = () => {
  return (
    <footer className="bg-[#0d1b2a] text-white mt-8 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
        
          <div>
            <h4 className="text-xl font-bold mb-4">Programs</h4>
            <ul>
              <li>Corporate</li>
              <li>One to One</li>
              <li>Consulting</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">Service</h4>
            <ul>
              <li>Training</li>
              <li>Coaching</li>
              <li>Consulting</li>
            </ul>
          </div>

    
          <div>
            <h4 className="text-xl font-bold mb-4">Contact</h4>
            <ul>
              <li>Home</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>

          
          <div>
            <h4 className="text-xl font-bold mb-4">Newsletter</h4>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-2 mb-4 text-black"
            />
            <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
              Subscribe
            </button>
            <div className="mt-4">
            
              <div className="flex space-x-2">
                <a href="#"><img className=' h-9 w-9' src={WhatsApplogo} alt="WhatsApp" /></a>
                <a href="#"><img className='h-9 w-9' src={instalogo} alt="Instagram" /></a>
                <a href="#"><img className='h-9 w-9' src={facelogo} alt="Facebook" /></a>
                <a href="#"><img className='h-9 w-9' src={linkdinlogo} alt="LinkedIn" /></a>
              </div>
              <p className="mt-4">
                Mobile: +919131694200 <br />
                Email: homefinder.com
              </p>
            </div>
          </div>

        </div>

        
        <div className="border-t border-gray-500 mt-8 pt-4 text-center">
          <p>© 2024 homefinder.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
