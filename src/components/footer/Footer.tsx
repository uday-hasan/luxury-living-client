import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaYoutubeSquare,
} from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
const Footer = () => {
  return (
    <footer className="bg-cBlue text-cWhite grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  justify-center items-center p-16 mt-8">
      <div className="flex-[1] flex items-center gap-2">
        <p>
          <IoLocationOutline />
        </p>
        <div>
          <p>H#000 (8th floor), Road 2B</p>
          <p>New DOHS, Mohakhali</p>
        </div>
      </div>
      <div className="flex-[1]">
        <h2 className="text-xl font-bold">Company</h2>
        <ul className="font-light italic">
          <li>About</li>
          <li>Projects</li>
          <li>Our Team</li>
          <li>Terms Conditions</li>
          <li>Submit Listing</li>
        </ul>
      </div>
      <div className="flex-[1]">
        <h2 className="text-xl font-bold">Quick Links</h2>
        <ul className="font-light italic">
          <li>Quick Links</li>
          <li>Sales</li>
          <li>About</li>
          <li>Our Blog</li>
        </ul>
      </div>
      <div className="flex-[1] flex flex-col gap-3">
        <h2 className="text-xl font-bold">About US</h2>
        <p className="text-base font-light ">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam, id
          exercitationem. Corrupti eos obcaecati deleniti.
        </p>
        <div className="flex gap-3">
          <p>
            <FaFacebookSquare />
          </p>
          <p>
            <FaInstagramSquare />
          </p>
          <p>
            <FaYoutubeSquare />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
