import { useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';
import RoutingPath from "../../utils/routing/RoutingPath";
import { useUserContext } from '../../utils/context/UserProvider'
import css from '../navigationBar/NavigationBar.module.css'
import Profile from '../Auth/Profile';

function NavigationBar() {
    const {authenticatedUser} = useUserContext()
	
	const displayUserIfAuthenticated = () => {
		return (authenticatedUser)
			? <li><Profile/></li>
			: <li><Link to={ RoutingPath.login }>Sign In</Link></li>
	}
        return (
            <nav className={css.nav}>
                <ul className={css.ul}>
                    <li className={css.li}><Link to={RoutingPath.user}>Home</Link></li>
                    <li className={css.li}><Link to={RoutingPath.message}>Message</Link></li>
                    <li className={css.li}><Link to={RoutingPath.login}>Log Out</Link></li>

                    { displayUserIfAuthenticated() }
                </ul>
            </nav>
            )
        }

export default NavigationBar
