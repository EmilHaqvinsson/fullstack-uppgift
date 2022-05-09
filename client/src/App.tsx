import React from 'react';
import './utils/styles/global.css';
import Alive from './components/Alive'
import Header from "./components/header/Header";

function App() {
    return (
        <>
            <Header/>
            <h1>FullStack projekt</h1>
            <h3>By: Emil, Aram, Michaela</h3>
            <Alive/>
        </>

    );
}

export default App;
