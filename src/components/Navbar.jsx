import { Link } from "react-router-dom";

const Navbar =()=>{
    return(
        <div>
            <ul className="flex gap-x-5 text-center text-3xl">
                <li> <Link to="/">Home</Link> </li>
                <li> <Link to="/product">products</Link> </li>
                <li> <Link to="/addproduct">Add products</Link> </li>
                <li> <a href="http://localhost:8080/products">Api</a> </li>
            </ul>
        </div>
    )
}

export default Navbar;