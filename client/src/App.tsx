import './utils/styles/global.css';
import Alive from './components/Alive'
import Header from "./components/header/Header";
import Routing from "./utils/routing/Routing";
import NavigationBar from "./components/navigationBar/NavigationBar";
import React, { createContext, useContext, useState } from 'react'
import { CreateOrUpdateUser, LoginU } from '../src/utils/interface/Users'

function isLoggedIn() {
    const hasToken = sessionStorage.getItem('AUTH');
    console.log(hasToken);
    isAuth = createOrUpdateUser()
}

// const LoggedIn = useContext(LoggedIn)
function App() {
    const [user, setUser] = useState("Jesse Hall");

    
    
    const UserContext = createContext(user)
    
    return (
    <><Header />
        <UserContext.Provider value={user}>
            <h1>{`Hello ${user}!`}</h1>
            </UserContext.Provider>
                <Routing>
            <NavigationBar />
        </Routing>
        <Alive /></>
            );
}

export default App;
