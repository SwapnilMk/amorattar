import Home from "./components/Home";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList"
import AddProduct from "./components/AddProduct";
import { Routes, Route } from "react-router-dom"


const App =()=>{
  return(
    <>
    <Navbar />   
     <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/product" element={<ProductList />}/>
      <Route path="/addproduct" element={<AddProduct />}/>
    </Routes>
    </>
    
  )
}

export default App;