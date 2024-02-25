import axios from "axios"

const Products = ({product}) => {
  

  const handleDelete= async(e)=>{
    const id = e.target.id;
  const res = await axios.delete(`/api/products/${id}`)
  console.log(res.data)
  }


    return (
        <>
        {product.map((value, index)=>(
            <div
            key={index}
            className="w-auto m-4 duration-500 bg-white border-2 border-black shadow-md rounded-xl hover:scale-105 hover:shadow-xl"
          >
            <img
              src={value.images[0]}
              alt="Product"
              className="flex content-center justify-center object-cover w-auto align-middle h-80 rounded-t-xl"
            />
            <div className="w-auto px-4 py-3">
              <span className="mr-3 text-lg text-gray-400 uppercase">
                {value.title}
              </span>
              <p className="block text-lg font-bold text-black capitalize truncate">
                {value.description}
              </p>
              <div className="flex items-center">
                <p className="my-3 text-lg font-semibold text-black cursor-auto">
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
