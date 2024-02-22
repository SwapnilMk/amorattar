import axios from "axios";
import { useEffect, useState } from "react";
import Products from "./Product";

const ProductList = () => {
    const [product, setProduct] = useState([]);

    const getProducts = async () => {
        const res = await axios.get("http://localhost:8080/products");
        const data = res.data;
        setProduct(data);
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="grid grid-cols-3 container m-auto">
            <Products product={product} />
        </div>
    )
};

export default ProductList;
