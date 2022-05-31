import './utils/styles/global.css';
// import Alive from './components/Alive'
// import Header from "./components/header/Header";
import Routing from "./utils/routing/Routing";
import NavigationBar from "./components/navigationBar/NavigationBar";
import React, { useEffect, useState } from 'react'
import { UserContext } from '../src/utils/context/UserProvider'

function App() {
	const [authenticatedUser, setAuthenticatedUser] = useState<string>('')

	const checkIfUserIsAuthenticatedInBrowser = () => {
		const username = localStorage.getItem('username')
		if (typeof username === 'string') {
			setAuthenticatedUser(username)
		}
	}
	
	useEffect(() => {
		checkIfUserIsAuthenticatedInBrowser()
	}, [])
	
	return (
		<UserContext.Provider value={{ authenticatedUser, setAuthenticatedUser}}>
			<Routing>
				<NavigationBar/>
			</Routing>
		</UserContext.Provider>
	)
}

export default App
