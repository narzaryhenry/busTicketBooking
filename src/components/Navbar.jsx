import { FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="shadow-md sticky top-0 bg-white z-50">
      <nav className="flex justify-between items-center py-6 max-w-7xl mx-auto px-4">
        <a href="/" className="text-2xl font-bold">
          XXYYZZZ
        </a>
        <div className="flex items-center space-x-4">
          <FaUser className="text-2xl" />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
