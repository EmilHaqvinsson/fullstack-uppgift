import { useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';
import RoutingPath from "../../utils/routing/RoutingPath";
import css from '../navigationBar/NavigationBar.module.css'
import { AuthContext } from '../../utils/context/AuthContext'

function NavigationBar() {
    let isLoggedIn = useContext(AuthContext)
    if (isLoggedIn) {
        return (
            <nav className={css.nav}>
                <ul className={css.ul}>
                    <li className={css.li}><Link to={RoutingPath.user}>Home</Link></li>
                    <li className={css.li}><Link to={RoutingPath.message}>Message</Link></li>
                    <li className={css.li}><Link to={RoutingPath.login}>Log Out</Link></li>
                </ul>
            </nav>
            )
        } else {

            return (
                <nav className={css.nav}>
                    <ul className={css.ul}>
                    <li className={css.li}><Link to={RoutingPath.login}>Login</Link></li>
                    </ul>
                </nav>
            )
        }
    }

export default NavigationBar