import {Link} from 'react-router-dom';
import RoutingPath from "../../utils/routing/RoutingPath";
import css from '../navigationBar/NavigationBar.module.css'

function NavigationBar() {
    return (
        <nav className={css.nav}>
            <ul className={css.ul}>
                <li className={css.li}><Link to={RoutingPath.home}>Home</Link></li>
                <li className={css.li}><Link to={RoutingPath.user}>User</Link></li>
                <li className={css.li}><Link to={RoutingPath.message}>Message</Link></li>
                <li className={css.li}><Link to={RoutingPath.register}>Register</Link></li>
            </ul>
        </nav>
    )
}

export default NavigationBar