import css from '../view/UserView.module.css'
import smurffen from '../utils/image/smurffen.jpg'
import { useUserContext } from '../utils/context/UserProvider'
import UService from '../utils/api/service/UService'
import { useState } from 'react'


function UserView() {
    const authenticatedUser = useUserContext()
    const user = authenticatedUser.authenticatedUser
    const [userData, setUserData] = useState({})

    console.log('value of "authenticatedUser": ' + authenticatedUser.authenticatedUser)

    const [isEdit, setIsEdit] = useState(true)
    
    // function findUser() {
    //     const theUser = UService.getByName(String(user))
    //     return theUser
    // }

    // const [ fullName, setFullName ] = useState(findUser)
    

    return (
        <>
            <div className={css.section}>
                <section>
                    <img className={css.imageUser} src={smurffen} alt="user"/>
                    <p>
                        <input type="text" placeholder="FirstName"/>                                                                                                
                        <input type="text" placeholder="LastName"/>
                        <br/>
                        <input type="text" placeholder="E-mail" value={user ? user : undefined} disabled={isEdit}/>
                        <input type="text" placeholder="Work"/>
                    </p>
                </section>
            </div>
        </>
    )
}

export default UserView