import UserService from "../utils/api/service/userService"
import React, { useState } from "react"
import { CreateOrUpdateUser } from "../utils/interface/Users"

const CreateUser = () => {
	const [text, setText] = useState<string>('')
	const [fullName, setfullName] = useState<string>('')
	const [eMail, setEmail] = useState<string>('')
	const [pass, setPass] = useState<string>('')
	
	const createUser = () => {
		const payload: CreateOrUpdateUser = {
			fullName: String(fullName),
			eMail: String(eMail),
			pass: String(pass)
		}
		console.log(pass)
		UserService.createUser(payload)
			.then(response => {
				setText(response.statusText)
				console.log(response.data)
			})
			.catch(error => {
				console.log(error)
				setText('Something went wrong!')
			})
	}
	
	return (
    <div>
			<h1>Create user</h1>
			fullName <input type='text'
						    id='fullName'
						    value={ fullName }
						    onChange={ event => setfullName( event.target.value ) }/>
			<br/>
			
			eMail: <input type='text'
						id='eMail'
						value={ eMail }
						onChange={ event => setEmail( event.target.value ) }/>
			<br/>
			
			pass: <input type='password'
						   id='pass'
						   value={ pass }
						   onChange={ event => setPass( event.target.value ) }/>
			<br/>
			
			<button onClick={ createUser }>Create User</button>
			<button onClick={ () => setText('') }>Clear</button>
			<p>{ text }</p>
		</div>
	)
}

export default CreateUser