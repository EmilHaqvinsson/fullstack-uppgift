import {BrowserRouter, BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import RoutingPath from "./RoutingPath";
import StartView from '../../view/StartView';
import UserView from '../../view/UserView'
import MessageView from "../../view/messageView/MessageView";
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
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Routing