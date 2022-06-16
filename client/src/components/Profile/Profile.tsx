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
		localStorage.removeItem('auth')
		localStorage.removeItem('userId')
		setAuthenticatedUser('')
		navigate(RoutingPath.home)
	}
	
	return (
		<div className={css.profileWrapper}>
			 { authenticatedUser }
			<button onClick={ () => logout() }>Log out</button>
		</div>
	)
}

export default Profile