import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";
import React from "react";

const Layout = ({children}) => (
    <div className='mx-4 my-3'>
        <Header/>
        <Menu/>
        {children}
        <Footer/>
    </div>
)

export default Layout;
