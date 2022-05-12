import UserService from "../utils/api/service/userService"
import React, { useState } from "react"
import { CreateOrUpdateUser } from "../utils/interface/Users"

const CreateUser = () => {
	const [text, setText] = useState<string>('')
	const [fullName, setFullName] = useState<string>('')
	const [eMail, setEmail] = useState<string>('')
	const [pass, setPass] = useState<string>('')
	
	const createUser = () => {
		const payload: CreateOrUpdateUser = {
			'fullName': fullName,
			'eMail': eMail,
			'pass': pass
		}
		UserService.createUser(payload)
			.then(response => {
				setText(response.statusText)
				console.log(response.data)
			})
			.catch(error => {
				console.error(error)
			})
	}
	
	return (
    <div>
			<h1>Create user</h1>
			userName <input type='text'
						    id='name'
						    value={ fullName }
						    onChange={ event => setFullName( event.target.value ) }/>
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