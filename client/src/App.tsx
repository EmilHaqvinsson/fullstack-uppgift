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
    return hasToken
}

// const LoggedIn = useContext(LoggedIn)
function App() {
    const [user, setUser] = useState(isLoggedIn);

    
    
    const UserContext = createContext(user)
    const loggedIn = useContext(UserContext)
    return (
    <><Header /><UserContext.Provider value={user}>
            <h1>
                {`You're: ${loggedIn}!`}
            </h1>
            <Routing>
                <NavigationBar />
            </Routing>
        </UserContext.Provider><Alive /></>
    );
}

export default App;
