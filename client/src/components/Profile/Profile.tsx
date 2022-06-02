import React from 'react'
import { useNavigate } from 'react-router-dom'
import RoutingPath from '../../utils/routing/RoutingPath'
import { useUserContext } from '../../utils/context/UserProvider'

const Profile = () => {
	const navigate = useNavigate()
	const {authenticatedUser, setAuthenticatedUser} = useUserContext()
	const imgUrl = 'https://thispersondoesnotexist.com/image'
	
	const logout = () => {
		localStorage.removeItem('username')
		setAuthenticatedUser('')
		navigate(RoutingPath.home)
	}
	
	return (
		<div className='profileWrapper'>
			<img src={ imgUrl }/>
			<span>{ authenticatedUser }</span>
			
			<div className='profileDropdown'>
				<span onClick={ () => navigate(RoutingPath.home) }>Settings</span>
				<span onClick={ () => navigate(RoutingPath.home) }>Profile</span>
				<hr/>
				<span onClick={ () => logout() }>Logout</span>
			</div>
		</div>
	)
}

export default Profile