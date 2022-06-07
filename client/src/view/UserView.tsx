import css from '../view/UserView.module.css'
import smurffen from '../utils/image/smurffen.jpg'
import { useUserContext } from '../utils/context/UserProvider'
import UService from '../utils/api/service/UService'
import { useState } from 'react'


function UserView() {
    const authenticatedUser = useUserContext()
    const user = localStorage.getItem('username')
    console.log('value of "authenticatedUser": ' + authenticatedUser)
    // const [isEdit, setIsEdit] = useState(true)
    
    // function findUser() {
    //     const theUser = UService.getByName(String(user))
    //     return theUser
    // // }

    // const [ fullName, setFullName ] = useState(findUser)
    const [ username, setUsername ] = useState()

    return (
        <>
            <div className={css.section}>
                <section>
                    <img className={css.imageUser} src={smurffen} alt="user"/>
                    <p>
                        <input type="text" placeholder="Name" value={username}/>
                        <input type="text" placeholder="LastName"/>
                        <br/>
                        <input type="text" placeholder="E-mail"/>
                        <input type="text" placeholder="Work"/>
                    </p>
                </section>
            </div>
        </>
    )
}

export default UserView