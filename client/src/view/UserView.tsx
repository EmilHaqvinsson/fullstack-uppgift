import css from '../view/UserView.module.css'
import smurffen from '../utils/image/smurffen.jpg'
import { useUserContext } from '../utils/context/UserProvider'
import UService from '../utils/api/service/UService'
import { useEffect, useState } from 'react'


function UserView() {
    const authenticatedUser = useUserContext()
    const user = authenticatedUser.authenticatedUser
    const userId = localStorage.getItem('userId')
    const [userFirstName, setUserFirstName] = useState<string>('')
    const [userLastName, setUserLastName] = useState<string>('')
    const [userEmail, setUserEmail] = useState<string>('')
    const [userWork, setUserWork] = useState<string>('')

    console.log('value of "authenticatedUser": ' + authenticatedUser.authenticatedUser)

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
    

    // const [ fullName, setFullName ] = useState(findUser)
    
    useEffect(() => {
      findUser()
    }, [findUser])
    
    return (
        <>
        {findUser()}
            <div className={css.section}>
                <section>
                    <img className={css.imageUser} src={smurffen} alt="user"/>
                    <p>
                        <input type="text" placeholder="FirstName" value={userFirstName} disabled={isEdit}/>                                                                                                
                        <input type="text" placeholder="LastName" value={userLastName} disabled={isEdit}/>
                        <br/>
                        <input type="text" placeholder="E-mail" value={userEmail} disabled={isEdit}/>
                        <input type="text" placeholder="Work" value={userWork} disabled={isEdit}/>
                    </p>
                </section>
            </div>
        </>
    )
}

export default UserView