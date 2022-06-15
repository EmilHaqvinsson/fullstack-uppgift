import css from '../view/UserView.module.css'
import smurffen from '../utils/image/smurffen.jpg'
import { useUserContext } from '../utils/context/UserProvider'
import UService from '../utils/api/service/UService'
import { useEffect, useState } from 'react'
import UserService from '../utils/api/service/userService'
import { CreateOrUpdateUser } from '../utils/interface/Users'

function UserView() {
    const authenticatedUser = useUserContext()
    const user = authenticatedUser.authenticatedUser
    const userId = localStorage.getItem('userId')
    const [userFirstName, setUserFirstName] = useState<string>('')
    const [userLastName, setUserLastName] = useState<string>('')
    const [userEmail, setUserEmail] = useState<string>('')
    const [userWork, setUserWork] = useState<string>('')

    console.log('value of "authenticatedUser": ' + user)

    const [isEdit, setIsEdit] = useState(true)
    
    function findUser() {
        if (userId) {
        const theUser = UService.getById(userId)
        theUser.then((result) => {
            console.log('the result of findUser() is: ' + result.data)
            setUserFirstName(result.data.firstName)
            setUserLastName(result.data.lastName)
            setUserEmail(result.data.username)
            setUserWork('ARBETSLÖS')
        }).catch((err) => {
            console.log(err)
        });
        }
    }

    useEffect(() => {
      findUser()
    }, [findUser])

    function saveChanges() {
		const payload: CreateOrUpdateUser = {
            username: userEmail,
            firstName: userFirstName,
            lastName: userLastName,
            password: ''
        }
        
        userId && UserService.updateUserById(userId, payload)
			.then(function (response) {
                const result = response.data
				console.log(result)
			})
			.catch(function (error) {
				console.log(error)
			})
            setIsEdit(!isEdit)
            return
        }
	
    
    return (
        <>
        {findUser()}
            <div className={css.section}>
                <section>
                    <img className={css.imageUser} src={smurffen} alt="user"/>
                    <p>
                        <input 
                            type="text" 
                            placeholder="FirstName" 
                            value={userFirstName} 
                            disabled={isEdit} 
                            onChange={ event => setUserFirstName(event.target.value) 
                        }/> 

                        <input type="text" placeholder="LastName" value={userLastName} disabled={isEdit} onChange={ event => setUserLastName(event.target.value) }/>
                        <br/>
                        <input type="text" placeholder="E-mail" value={userEmail} disabled={isEdit} onChange={ event => setUserEmail(event.target.value) }/>
                        <input type="text" placeholder="Work" value={userWork} disabled={true}/>
                    </p>
                </section>
                <section>
                    {isEdit 
                        ? <button onClick={() => setIsEdit(false)}>ENABLE EDITING</button>
                        : <button onClick={() => saveChanges()}>SAVE CHANGES</button>
                    }
                </section>
            </div>
        </>
    )
}

export default UserView