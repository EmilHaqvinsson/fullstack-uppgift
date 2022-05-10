import React from 'react';
import './utils/styles/global.css';
import Alive from './components/Alive'
import Header from "./components/header/Header";
import Routing from "./utils/routing/Routing";
import NavigationBar from "./components/navigationBar/NavigationBar";
import StartView from "./view/StartView";

function App() {
    return (
        <>
            <Header/>
            <Alive/>
            <StartView/>
            {/*<Routing>*/}
            {/*    <NavigationBar/>*/}
            {/*</Routing>*/}
        </>

    );
}

export default App;
