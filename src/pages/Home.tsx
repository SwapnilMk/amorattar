import MainLayout from "../layouts/MainLayout"
import ProductList from "@/src/features/product/components/ProductList"

const Home = () => {
  return (
    <MainLayout>
    <div><ProductList/></div>
    </MainLayout>
  )
}

export default Home