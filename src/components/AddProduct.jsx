import React, { useState } from 'react'; // Import statement corrected
import axios from 'axios'; // Import statement added

const AddProduct = () => {
    const [product, setProduct] = useState({});

    const handleChange = (e) => {
        setProduct(prevProduct => ({
            ...prevProduct,
            [e.target.name]: e.target.value
        }));
        console.log(product);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/products', product);
            console.log(res.data);
        } catch (error) {
            console.error('Error while submitting product:', error);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="id">id:</label>
                <br />
                <input type="number" onChange={handleChange} name="id" id="id" />
                <br />
                <label htmlFor="name">Name:</label>
                <br />
                <input type="text" onChange={handleChange} name="name" id="name" />
                <br />
                <label htmlFor="description">Description:</label>
                <br />
                <input type="text" onChange={handleChange} name="description" id="description" />
                <br />
                <label htmlFor="price">Price:</label>
                <br />
                <input type="number" onChange={handleChange} name="price" id="price" />
                <br />
                <button type="submit">Submit</button> {/* Added type attribute */}
            </form>
        </>
    );
};

export default AddProduct;
