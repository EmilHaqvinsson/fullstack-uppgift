import css from '../view/StartView.module.css'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { findAllByDisplayValue } from "@testing-library/react";
import smurf from '../utils/image/smurf.png'
import { CreateOrUpdateUser } from '../utils/interface/Users';
import UserService from '../utils/api/service/userService';
import { useState } from 'react';

function StartView() {
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [text, setText] = useState<string>('')

    // const toggleModal = () => {
    //     setModal(!modal);
    // }
    const createUser = () => {
        const payload: CreateOrUpdateUser = {
            firstName: firstName, 
            lastName: lastName,
            username: username,
            password: password
        }

        UserService.createUser(payload)
            .then(response => {
                if (response.status === 201) {
                console.log(response.data)
                const newUsername = response.data.username
                const newPass = response.data.password
                setText(`User ${newUsername}, with password ${newPass} created successfully!`)
            } else {
                setText('Could not create new user! Please try again')
            }
        })
            .catch(error => {
                console.log(error)
                setText(error)
            })
        }
    return (
        <div className={css.mainGridContainer}>
            <section className={css.section}>
                <label className={css.label}>Email-adress
                <input
                    className={css.input}
                    type="text"
                    placeholder='e-mail/username'
                    name='user'
                    onChange={event => setUsername(event.target.value)} /></label>
            <br />
            <label className={css.label}>Fullständigt namn
                <input 
                    className={css.input}
                    type="text"
                    placeholder='First name'
                    name='firstName'
                    onChange={event => setFirstName(event.target.value)}
                    required={true} />
                    <input 
                    className={css.input}
                    type="text"
                    placeholder='Lastname'
                    name='lastName'
                    onChange={event => setLastName(event.target.value)}
                    required={true} /></label>
            <br />
            <label className={css.label}>Lösenord 
                <input 
                    className={css.input}
                    type="password"
                    placeholder='Password'
                    name='password'
                    onChange={event => setPassword(event.target.value)}
                    required={true} />
                    </label>
                {/* <button className={css.button} onClick={userLogin}>Log in</button> */}
                {text && `${JSON.stringify(text)}`}
                <button onClick={createUser} className={css.buttonCreateNewAccount}>Create new account</button>
            </section>
        {/* {modal && (
                    console.log('Lol modal')
                )}</> */}
            {/* <section>
                <img className={css.imageSmurf} src={smurf} alt="smurf" />
            </section> */}
        </div>
    )
}
export default StartView

//Aram