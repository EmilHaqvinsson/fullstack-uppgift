import UserService from "../utils/api/service/userService"
import React, { useState } from "react"
import { CreateOrUpdateUser } from "../utils/interface/Users"

const CreateUser = () => {
	const [text, setText] = useState<string>('')
	const [fullName, setFullName] = useState<string>('Ada')
	const [eMail, setEmail] = useState<string>('')
	const [pass] = useState<string>('')
	
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
			Name: <input type='text'
						    id='name'
						    value={ fullName }
						    onChange={ event => setFullName( event.target.value ) }/>
			<br/>
			
			Age: <input type='text'
						id='eMail'
						value={ eMail }
						onChange={ event => setEmail( event.target.value ) }/>
			<br/>
			
			Gender: <input type='password'
						   id='pass'
						   value={ pass }
						   onChange={ event => setGender( event.target.value ) }/>
			<br/>
			
			<button onClick={ createUser }>Create User</button>
			<button onClick={ () => setText('') }>Clear</button>
			<p>{ text }</p>
		</div>
	)
}

export default CreateUser
function setGender(value: string): void {
  throw new Error("Function not implemented.")
}

