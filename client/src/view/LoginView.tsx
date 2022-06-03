import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RoutingPath from '../utils/routing/RoutingPath'
import UserService from '../utils/api/service/UService'
import { useUserContext } from '../utils/context/UserProvider'
import { LoginU } from '../utils/interface/Users'

export const SignInView = () => {
	const [username, setUsername] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [loginText, setLoginText] = useState<string>('')
	const {authenticatedUser, setAuthenticatedUser} = useUserContext()
	
	const navigate = useNavigate()
	
	const verifyUser = () => {
        const payload: LoginU = {
            username: username,
            password: password
        }
        console.log('This is the first thing that happens in verifyUser: ' + payload.username)
		
		UserService.verifyUser(payload)
			.then(function(response: { data: { message: boolean } }) {
				login(response.data.message)
			})
			.catch(function (error: any) {
				console.log(error)
			})
	}

	function isLoggedIn() {
		if (authenticatedUser) {
			navigate(RoutingPath.user)
		} else {
			navigate(RoutingPath.login)
		}
	}
	
	function login(apiResponse: boolean) {
		if (apiResponse) {
			setAuthenticatedUser(username)
			localStorage.setItem('username', username)
			navigate(RoutingPath.user)
		} else {
			setLoginText('Wrong username or password')
		}
	}
	
	return (
		<div>
			<h1>Logga in</h1>
			<div>
				<span>Username: </span>
				<input type='text' onChange={ event => setUsername(event.target.value) }/>
				<span>Password: </span>
				<input type='password' onChange={ event => setPassword(event.target.value) }/>
			</div>
			<h3>{ loginText }</h3>
			{!authenticatedUser && <button onClick={ () => verifyUser() } children={ 'Log In' }/>}
			{authenticatedUser && <button onClick={ () => alert(authenticatedUser) } children={ 'Show user' }/>}
			
		</div>
	)
}
