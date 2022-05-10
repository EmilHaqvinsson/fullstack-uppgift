import css from '../view/StartView.module.css'
import IUser from 
import {findAllByDisplayValue} from "@testing-library/react";
import React, { useState } from 'react'

type Props = { 
  saveTodo: (e: React.FormEvent, formData: IUser | any) => void 
}

const AddTodo: React.FC<Props> = ({ saveTodo }) => {
    const [formData, setFormData] = useState<IUser | {}>()

    const registerUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const body = req.body as unknown as Pick<IUser, 'fullName' | 'eMail' | 'pass'>
    
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            const User: IUser = new user({
                fullName: body.fullName,
                eMail: body.eMail,
                pass: body.pass
            }) 
    
            const newUser: IUser = await User.save()
            const allUsers: IUser[] = await User.find()
    
            res.body = ({ message: 'User registered!', user: newUser, users: allUsers })
        } catch (error) {
            throw error
        }
    }

    const handleChangedFullName = (e: any) => {
        setUserFullName(e.target.value)
    }

    return (
        <div className={css.mainGridContainer}>
            <div className={css.item}>
                <h1 className={css.text}>BookFace</h1>
                <h3 className={css.textOne}>Create a new account</h3>
            </div>

            <div className={css.itemOne}>
                <form>
                    <input type="text" placeholder='Full Name' onChange={(e) => handleChangedFullName(e) } value ={userFullName}/>
                    <br/>
                    <input type="text" placeholder='e-mail' onChange={(e) => handleChangedFullName }/>
                    <br/>
                    <input type="text" placeholder='Password' onChange={(e) => handleChangedFullName }/>
                    <hr/>
                    <input type={"submit"} className={css.buttonCreateNewAccount}/>Create new account
                </form>
            </div>
        </div>
    )
}

export default RegisterView