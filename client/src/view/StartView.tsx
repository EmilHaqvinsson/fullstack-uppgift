import css from '../view/StartView.module.css'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { findAllByDisplayValue } from "@testing-library/react";
import { SetStateAction, useState } from 'react'
import close from '../utils/image/close.png'
import smurf from '../utils/image/smurf.png'
import { CreateOrUpdateUser } from '../utils/interface/Users';
import { LoginU } from '../utils/interface/Users'
import UserService from '../utils/api/service/userService';
import RoutingPath from '../utils/routing/RoutingPath';
import { useNavigate } from 'react-router-dom';
// import bcrypt from 'bcrypt';

function StartView() {
    const [modal, setModal] = useState(false)
    const [fullName, setFullName] = useState<string>('')
    const [eMail, setEMail] = useState<string>('')
    const [isAuth, setIsAuth] = useState(false)
    const [password, setPassword] = useState<string>('')
    const [text, setText] = useState<string>('')

    const toggleModal = () => {
        setModal(!modal);
    }

    const navigate = useNavigate()
    // const saltRounds: number = 10
    async function userLogin() {
        const payload: LoginU = {
            email: eMail,
            pass: password,
            authenticated: isAuth
        };

        UserService.userLogin(payload)
            .then((
                response: { data: object }) => {
                sessionStorage.setItem('AUTH', JSON.stringify(response.data))
                setText(JSON.stringify(response.data))
                console.log(response.data)
                console.log((text))
                navigate(RoutingPath.message)
            })
            .catch((error: any) => {
                console.error(error)
                setText(error)
            }
            )
    }

    // const mapObject = ({ text }: { text: object; }) => {
    //     Object.keys(text).map(function(key, index) {
    //         console.log(text[key])
    //     })
    // }

    const createUser = () => {
        const payload: CreateOrUpdateUser = {
            fullName: fullName,
            eMail: eMail,
            pass: password
        }

        UserService.createUser(payload)
            .then(response => {
                setText(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
    let solved;
    return (
        <div className={css.mainGridContainer}>
            <section className={css.section}>
                <input className={css.input}
                    type="text"
                    placeholder='fullName/e-mail'
                    name='user'
                    onChange={event => setEMail(event.target.value)} />
                <br />
                <article>
                    <input className={css.input}
                        type="text"
                        placeholder='Password'
                        name='pass'
                        onChange={event => setPassword(event.target.value)}
                        required={true} />
                </article>
                <br />
                <button className={css.button} onClick={userLogin}>Log in</button>

                <p>{text && `${JSON.stringify(text)}`}</p>

                <button onClick={toggleModal} className={css.buttonCreateNewAccount}>Create new account</button>

                {modal && (
                    <div className={css.popup}>
                        <div className={css.overlay}>
                            <div className={css.popupWindow}>
                                <img src={close} alt="close" className={css.close} onClick={toggleModal} />
                                <h2>Sign up</h2>
                                <input className={css.input}
                                    type="text"
                                    placeholder="fullName"
                                    onChange={event => setFullName(event.target.value)} />
                                <input className={css.input}
                                    type="text"
                                    placeholder="eMail"
                                    onChange={event => setEMail(event.target.value)} />
                                <input className={css.input}
                                    type="password"
                                    placeholder="password"
                                    onChange={event => setPassword(event.target.value)} />
                                <br />
                                <p>
                                    {text ? solved = JSON.stringify(text) : solved = 'Nothing found.'}
                                    {solved}
                                </p>
                                <br />
                                <button className={css.buttonPopupWindow} onClick={createUser}>Sign up</button>
                            </div>
                        </div>
                    </div>
                )}
            </section>
            <section>
                <img className={css.imageSmurf} src={smurf} alt="smurf" />
            </section>
        </div>
    )
}
export default StartView

