import css from '../view/StartView.module.css'
import {findAllByDisplayValue} from "@testing-library/react";
import {useState} from 'react'
import close from '../utils/image/close.png'

function StartView() {
    const [modal, setModal] = useState(false)

    const toggleModal = () => {
        setModal(!modal);
    }

    return (
        <div className={css.mainGridContainer}>
            <div className={css.item}>
                <h1 className={css.text}>BookFace</h1>
                <h3 className={css.textOne}>Connect and find friends all over the world.</h3>
            </div>

            <div className={css.itemOne}>
                <section>
                    <input type="text" placeholder='Username/e-mail'/>
                    <br/>
                    <input type="text" placeholder='Password'/>
                    <br/>
                    <button>Log in</button>
                    <hr/>
                    <button onClick={toggleModal} className={css.buttonCreateNewAccount}>Create new account</button>
                    {modal && (
                        <div className={css.popup}>
                            <div className={css.overlay}>
                                <div className={css.popupWindow}>
                                    <img src={close} alt="close" className={css.close} onClick={toggleModal}/>
                                    <h1>Sign up</h1>
                                    <input className={css.inputPopupWindow} type="text" placeholder="Firstname"/>
                                    <input className={css.inputPopupWindow} type="text" placeholder="E-mail"/>
                                    <input className={css.inputPopupWindow} type="text" placeholder="Username"/>
                                    <input className={css.inputPopupWindow} type="password" placeholder="Password"/>

                                    // fixat bilden

                                    <br/>
                                    <br/>
                                    <button className={css.buttonPopupWindow}>Sign up</button>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}

export default StartView