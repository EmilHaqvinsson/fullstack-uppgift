import { useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';
import RoutingPath from "../../utils/routing/RoutingPath";
import { useUserContext } from '../../utils/context/UserProvider'
import css from '../navigationBar/NavigationBar.module.css'
import Profile from '../Profile/Profile'

function NavigationBar() {
    const {authenticatedUser} = useUserContext()

    // const showNavigation = () => {
    //     const nav = document.getElementById('navbar')
    //     if (authenticatedUser) {
    //         console.log(nav?.classList)
    //     }
    // }
	
	const displayUserIfAuthenticated = () => {
		return (authenticatedUser)
			? <p>
            
            <li className={css.li}>
                <Link to={RoutingPath.user}>Home</Link>
                </li>
            <li className={css.li}>
                <Link to={RoutingPath.message}>Messages</Link></li>
                <li  className={css.liLast}><Profile /></li>
            </p>
			: <li><Link to={ RoutingPath.login }>Sign In</Link></li>
	}
        return (
            <nav id='navbar' className={css.nav}>
                <ul className={css.ul}>
                    { displayUserIfAuthenticated() }
                </ul>
            </nav>
            )
        }

export default NavigationBar
