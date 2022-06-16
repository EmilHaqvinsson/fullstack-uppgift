import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RoutingPath from '../../utils/routing/RoutingPath'
import { useUserContext } from '../../utils/context/UserProvider'
import css from './Profile.module.css'
import UService from '../../utils/api/service/UService'

const Profile = () => {
	const navigate = useNavigate()
	const {authenticatedUser, setAuthenticatedUser} = useUserContext()
	const [userId, setUserId] = useState<string>('')
	// const imgUrl = 'https://thispersondoesnotexist.com/image'
	
	const findUser = () => {
        if (userId) {
        const theUser = UService.getById(userId)
        theUser.then((result) => {
            console.log('The logged in users username is ' + result.data.username)
            localStorage.setItem('username', result.data.username)
            return
        }).catch((err) => {
            console.log(err)
        });
        }
    }

	const getUsername = () => {
		const theUsername = localStorage.getItem('username')
		return theUsername
	} 

	findUser()

	const logout = () => {
		localStorage.removeItem('auth')
		localStorage.removeItem('userId')
		setAuthenticatedUser('')
		navigate(RoutingPath.home)
	}
	
	return (
		<div className={css.profileWrapper}>
			{ getUsername() }
			<button onClick={ () => logout() }>Log out</button>
		</div>
	)
}

export default Profile