import UserService from "../utils/api/service/userService"
import React, { useState } from "react"
import { CreateOrUpdateUser } from "../utils/interface/Users"

const CreateUser = () => {
	const [text, setText] = useState<string>('')
	const [name, setName] = useState<string>('Ada')
	const [age, setAge] = useState<number>(18)
	const [gender, setGender] = useState<string>('Female')
	
	const createUser = () => {
		const payload: CreateOrUpdateUser = {
			name: name,
			'age': age,
			'gender': gender
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
						 value={ name }
						 onChange={ event => setName( event.target.value ) }/>
			<br/>
			
			Age: <input type='text'
						id='age'
						value={ age }
						onChange={ event => setAge(Number( event.target.value )) }/>
			<br/>
			
			Gender: <input type='text'
						   id='gender'
						   value={ gender }
						   onChange={ event => setGender( event.target.value ) }/>
			<br/>
			
			<button onClick={ createUser }>Create User</button>
			<button onClick={ () => setText('') }>Clear</button>
			<p>{ text }</p>
		</div>
	)
}

export default CreateUser
