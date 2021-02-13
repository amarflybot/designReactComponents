import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";
import React, {useContext} from "react";
import ReactNotification from 'react-notifications-component'
import {ThemeContext, THEMELIST, ThemeProvider} from "../../context/ThemeContext";

const LayoutComponent = ({children}) => {

    const {theme} = useContext(ThemeContext);

    const classNameValue = theme === THEMELIST.LIGHT ? 'overflow-auto bg-white' : 'overflow-auto bg-gray-500'

    return (
        <div className={classNameValue}>
            <ReactNotification />
            <div className='mx-4 my-3'>
                <Header/>
                <Menu/>
                {children}
                <Footer/>
            </div>
        </div>
    )
}

const Layout = ({children}) => (
    <ThemeProvider startingTheme={THEMELIST.DARK}>
        <LayoutComponent>{children}</LayoutComponent>
    </ThemeProvider>
)

export default Layout;
