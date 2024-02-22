import axios from "axios"

const Products = ({product}) => {
  

  const handleDelete= async(e)=>{
    const id = e.target.id;
  const res = await axios.delete(`http://localhost:8080/products/${id}`)
  console.log(res.data)
  }


    return (
        <>
        {product.map((value, index)=>(
            <div
            key={index}
            className="w-auto border-black border-2 m-4 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
          >
            <img
              src={value.images[0]}
              alt="Product"
              className="h-80 w-auto object-cover rounded-t-xl flex content-center align-middle justify-center"
            />
            <div className="px-4 py-3 w-auto">
              <span className="text-gray-400 mr-3 uppercase text-lg">
                {value.title}
              </span>
              <p className="text-lg font-bold text-black truncate block capitalize">
                {value.description}
              </p>
              <div className="flex items-center">
                <p className="text-lg font-semibold text-black cursor-auto my-3">
                  ${value.price}
                </p>

                <div className="ml-auto">
                  <button id={value.id} className="border-rose-600 border-[1px] text-xs p-2 rounded-2xl hover:bg-rose-600 hover:text-white" onClick={handleDelete}>delete Product</button>
                </div>
              </div>
            </div>
          </div>
            
            )) 
        }
        </>
    )
}


export default Products;
