import {BrowserRouter, BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import RoutingPath from "./RoutingPath";
import StartView from '../../view/StartView';
import RegisterView from '../../view/RegisterView';
import UserView from '../../view/UserView'
import MessageView from "../../view/MessageView";
import {ReactNode} from 'react'

const Routing = (props: { children?: ReactNode }) => {
    return (
        <>
            <BrowserRouter>
                {props.children}
                <Routes>
                    <Route path={RoutingPath.home} element={<StartView/>}/>
                    <Route path={RoutingPath.user} element={<UserView/>}/>
                    <Route path={RoutingPath.message} element={<MessageView/>}/>
                    <Route path={RoutingPath.register} element={<RegisterView/>}/>
                </Routes>
            </BrowserRouter>
            <StartView/>
        </>
    )
}

export default Routing