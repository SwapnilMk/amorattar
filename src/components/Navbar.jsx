import { Link } from "react-router-dom";

const Navbar =()=>{
    return(
        <div>
            <ul className="flex text-3xl text-center gap-x-5">
                <li> <Link to="/">Home</Link> </li>
                <li> <Link to="/product">products</Link> </li>
                <li> <Link to="/addproduct">Add products</Link> </li>
                <li> <a href="/api/products">Api</a> </li>
            </ul>
        </div>
    )
}

export default Navbar;