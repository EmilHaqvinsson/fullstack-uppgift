import css from '../view/UserView.module.css'
import smurffen from '../utils/image/smurffen.jpg'
import { useUserContext } from '../utils/context/UserProvider'
import UService from '../utils/api/service/UService'
import { useState } from 'react'

function UserView() {
    const authenticatedUser = useUserContext()
    const user = localStorage.getItem('username')
    const [userData, setUserData] = useState()
    console.log('value of "authenticatedUser": ' + user?.valueOf)

    // const [isEdit, setIsEdit] = useState(true)
    
    function findUser() {
        const theUser = UService.getByName(String(user))
        return theUser
    }

    // console.log('THIS IS FINDUSER: ' + findUser())

    // const [ fullName, setFullName ] = useState(findUser)
    const [ username, setUsername ] = useState(user)

    return (
        <>
            <div className={css.section}>
                <section>
                    <img className={css.imageUser} src={smurffen} alt="user"/>
                    <p>
                        <input type="text" placeholder="FirstName"/>
                        <input type="text" placeholder="LastName"/>
                        <br/>
                        <input type="text" placeholder="E-mail" value={username ? username : undefined} disabled={true}/>
                        <input type="text" placeholder="Work"/>
                    </p>
                </section>
            </div>
        </>
    )
}

export default UserView