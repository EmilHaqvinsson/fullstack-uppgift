import './utils/styles/global.css';
import Alive from './components/Alive'
import Header from "./components/header/Header";
import Routing from "./utils/routing/Routing";
import NavigationBar from "./components/navigationBar/NavigationBar";
import React, { createContext, useContext, useState } from 'react'
import { CreateOrUpdateUser, LoginU } from './utils/interface/Users'

function isLoggedIn() {
    const hasToken = sessionStorage.getItem('AUTH');
    console.log(hasToken);
    return hasToken
}

const LoggedIn = createContext({isLoggedIn})
function App() {
    
    return (
    <>
    <Header />
            <Routing>
                { LoggedIn && <NavigationBar /> }
            </Routing>
        <Alive />
        </>
    );
}

export default App;
