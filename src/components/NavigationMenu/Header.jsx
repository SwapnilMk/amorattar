import MobileNav from "./MobileNav";
import Navbar from "./Navbar";


const Header = () => {
  return (
    <header>
      <div className="nav-area">
     

        {/* for large screens */}
        <Navbar />

        {/* for small screens */}
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
