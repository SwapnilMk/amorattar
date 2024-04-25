import React, { ReactNode } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer';
import { ThemeProvider } from '../theme/theme-provider';

interface MainLayoutProps {
  children: ReactNode;
}


const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (


    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <div>{children}</div>
        <Footer />
      </ThemeProvider>
    </>
  )
}

export default MainLayout
