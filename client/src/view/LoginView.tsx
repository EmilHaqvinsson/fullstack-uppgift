import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RoutingPath from '../utils/routing/RoutingPath'
import UserService from '../utils/api/service/UService'
import { useUserContext } from '../utils/context/UserProvider'
import { LoginU } from '../utils/interface/Users'
import css from './LoginView.module.css'

export const SignInView = () => {
	const [username, setUsername] = useState<string>('')
	const [userId, setUserId] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [loginText, setLoginText] = useState<string>('')
	const [userData, setUserData] = useState<object>({userId:'', authenticated: false})
	const {authenticatedUser, setAuthenticatedUser} = useUserContext()
	
	const navigate = useNavigate()
	
	const verifyUser = () => {
        const payload: LoginU = {
            username: username,
            password: password
        }

		UserService.verifyUser(payload)
			.then(function(response: { data: { message: boolean, userId: string } }) {
				login(username)
				console.log('Your password matches? ' + response.data.message)
				console.log('The ID of the user that\'s logging in is: ' + response.data.userId)
				setUserId(response.data.userId)
				const userInfo = {userId: response.data.userId, authenticated: response.data.message}
				setUserData(userInfo)
				console.log('The line before this one SHOULD HAVE SAVED THAT SHIT INTO THE OBJECT userInfo... This is that object:')
				console.log(userInfo.userId)
				localStorage.setItem("auth", String(response.data.message))
				localStorage.setItem("userId", response.data.userId)
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
	
	function login(apiResponse: any) {
		if (apiResponse) {
			setAuthenticatedUser(apiResponse)
			// const savedUser = localStorage.getItem("auth")
			// console.log(savedUser ? JSON.parse(savedUser) : undefined )
			navigate(RoutingPath.user)
		} else {
			setLoginText('Wrong username or password')
		}
	}
	
	return (
		<div>
			<h1>Logga in</h1>
			<div className={css.mainGridContainer}>
            <section className={css.section}>
                <input
                       className={css.input}
                    type="text"
                    placeholder='fullname/e-mail'
                    name='user'
                    onChange={event => setUsername(event.target.value)} />
                <br />
                <article>
                    <input className={css.input}
                        type="text"
                        placeholder='Password'
                        name='password:'
                        onChange={event => setPassword(event.target.value)}
                        required={true} />
                </article>
                <br />
                <button className={css.button} onClick={() => verifyUser()}>Log in</button>
				</section>
				</div>
			{/* <div>
				<span>Username: </span>
				<input type='text' onChange={ event => setUsername(event.target.value) }/>
				<span>Password: </span>
				<input type='password' onChange={ event => setPassword(event.target.value) }/>
			</div> */}
			<h3>{ loginText }</h3>
			{!authenticatedUser && <button onClick={ () => verifyUser() } children={ 'Log In' }/>}
			{/* {authenticatedUser && <button onClick={ () => alert(authenticatedUser) } children={ 'Show user' }/>} */}
			
		</div>
	)
}
