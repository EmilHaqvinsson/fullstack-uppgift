import css from '../view/StartView.module.css'
import {findAllByDisplayValue} from "@testing-library/react";
import {useState} from 'react'
import close from '../utils/image/close.png'
import smurf from '../utils/image/smurf.png'

function StartView() {
    const [modal, setModal] = useState(false)

const toggleModal = () => {
    setModal(!modal);
}

    return (
        <div className={css.mainGridContainer}>
            <section className={css.section}>
                <input className={css.input} type="text" placeholder='Username/e-mail'/>
                <br/>
                <article>
                    <input className={css.input} type="text" placeholder='Password'/>
                </article>
                <br/>
                <button>Log in</button>
                <hr/>
                <button onClick={toggleModal} className={css.buttonCreateNewAccount}>Create new account</button>
                {modal && (
                    <div className={css.popup}>
                        <div className={css.overlay}>
                            <div className={css.popupWindow}>
                                <img src={close} alt="close" className={css.close} onClick={toggleModal}/>
                                <h2>Sign up</h2>
                                <input className={css.input} type="text" placeholder="Firstname"/>
                                <input className={css.input} type="text" placeholder="E-mail"/>
                                <input className={css.input} type="text" placeholder="Username"/>
                                <input className={css.input} type="password" placeholder="Password"/>
                                <br/>
                                <br/>
                                <button className={css.buttonPopupWindow} onClick={toggleModal}>Sign up</button>
                            </div>
                        </div>
                    </div>
                )}
            </section>
            <section>
                <img className={css.imageSmurf} src={smurf} alt="smurf"/>
            </section>
        </div>
    )
}

export default StartView