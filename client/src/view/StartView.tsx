import css from '../view/StartView.module.css'
import {findAllByDisplayValue} from "@testing-library/react";
import {useState} from 'react'
import close from '../utils/image/close.png'

    type Props = { 
        saveUser: (e: React.FormEvent, formData: | any) => void 
      }
      
    export const RegisterView: React.FC<Props> = ({ saveUser }) => {
        const [formData, setFormData] = useState< | {}>()
      
        const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
          setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value,
          })
        }
    console.log(formData)

    return (
        <form className='Form' onSubmit={(e) => saveUser(e, formData)}>
          <div>
            <div>
              <label htmlFor='userName'>Name</label>
              <input onChange={ handleForm } type='text' id='userName' />
            </div>
            <div>
              <label htmlFor='eMail'>Description</label>
              <input onChange={ handleForm } type='email' id='eMail' />
            </div>
            <div>
            <label htmlFor='password'>Description</label>
              <input onChange={ handleForm } type='password' id='pass' />
            </div>
          </div>
          <button disabled={formData === undefined ? true: false} >Register User</button>
        </form>
      )
    }

    export default function StartView() {
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