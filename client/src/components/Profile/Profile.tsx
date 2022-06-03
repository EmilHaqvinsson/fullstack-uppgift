import React from 'react'
import { useNavigate } from 'react-router-dom'
import RoutingPath from '../../utils/routing/RoutingPath'
import { useUserContext } from '../../utils/context/UserProvider'
import css from './Profile.module.css'

const Profile = () => {
	const navigate = useNavigate()
	const {authenticatedUser, setAuthenticatedUser} = useUserContext()
	// const imgUrl = 'https://thispersondoesnotexist.com/image'
	
	const logout = () => {
		localStorage.removeItem('username')
		setAuthenticatedUser('')
		navigate(RoutingPath.home)
	}
	
	return (
		<div className={css.profileWrapper}>
			{/* <img src={ imgUrl } className={css.profilePic}/> */}
			<p>{ authenticatedUser }</p>
			
			<div className={css.profileDropdown}>
				<span onClick={ () => navigate(RoutingPath.home)} className={css.disabledLink}>Settings</span><br/>
				<span onClick={ () => navigate(RoutingPath.home)} className={css.disabledLink}>Profile</span><br/>
				<span onClick={ () => logout() }>Logout</span>
			</div>
		</div>
	)
}

export default Profile