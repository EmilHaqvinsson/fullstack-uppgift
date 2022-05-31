import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RoutingPath from '../utils/routing/RoutingPath'
import UserService from '../utils/api/service/UService'
import { useUserContext } from '../utils/context/UserProvider'
import { LoginU } from '../utils/interface/Users'
import UService from '../utils/api/service/UService'

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
        console.log('This is the first thing that happens in verifyUser: ' + payload)
		
		UserService.verifyUser(payload)
			.then(function(response: { data: { message: boolean } }) {
				login(response.data.message)
			})
			.catch(function (error: any) {
				console.log(error)
			})
	}
	
	const login = (apiResponse: boolean) => {
		if (apiResponse) {
			setAuthenticatedUser(username)
			localStorage.setItem('username', username)
            const usersInfo = UService.getByName(username)
            localStorage.setItem('userID', String(usersInfo))
			navigate(RoutingPath.home)
		} else {
			setLoginText('Wrong username or password')
		}
	}
	
	return (
		<div>
			<h1>Sign In</h1>
			<div>
				<span>Username: </span>
				<input type='text' onChange={ event => setUsername(event.target.value) }/>
				<span>Password: </span>
				<input type='password' onChange={ event => setPassword(event.target.value) }/>
			</div>
			<h3>{ loginText }</h3>
			<button onClick={ () => verifyUser() } children={ 'Log In' }/>
			<button onClick={ () => alert(authenticatedUser) } children={ 'Show user' }/>
		</div>
	)
}
