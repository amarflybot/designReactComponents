import React from "react";
import {AppProps} from "next/app";
import '../styles/global.css'
import 'react-notifications-component/dist/theme.css'

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) =>
    <Component {...pageProps}/>


export default App;
