import React from 'react';
import './utils/styles/global.css';
import Alive from './components/Alive'
import Header from "./components/header/Header";
import Routing from "./utils/routing/Routing";
import NavigationBar from "./components/navigationBar/NavigationBar";

function App() {
    return (
        <>
            <Header/>
            <Routing>
                <NavigationBar/>
            </Routing>
            <Alive/>
        </>
    );
}

export default App;
