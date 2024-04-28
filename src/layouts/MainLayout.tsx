import React, { ReactNode } from 'react'
import Navbar from '../features/Navbar'
import Footer from '../features/Footer';


interface MainLayoutProps {
  children: ReactNode;
}


const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (


    <>
     
        <Navbar />
        <div>{children}</div>
        <Footer />
 
    </>
  )
}

export default MainLayout
