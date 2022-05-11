import {Link} from 'react-router-dom';
import RoutingPath from "../../utils/routing/RoutingPath";

function NavigationBar() {
    return (
        <nav>
            <ul>
                <li><Link to={RoutingPath.home}>Home</Link></li>
                <li><Link to={RoutingPath.user}>User</Link></li>
                <li><Link to={RoutingPath.message}>Message</Link></li>
            </ul>
        </nav>
    )
}

export default NavigationBar