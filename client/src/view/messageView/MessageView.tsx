import { useState, useEffect, SetStateAction, useContext } from 'react'
import MessageService from '../..//utils/api/service/MessageService'
import { ReadMessage } from '../../utils/interface/IMessage'
import Card from '../../components/card/Card'
import css from './MessageView.module.css'
import { AuthContext } from '../../utils/context/AuthContext'



function MessageView() {
    const loggedIn = useContext(AuthContext)
    const [message, setMessage] = useState<Array<ReadMessage>>([])
    const [text, setText] = useState('')
    const [author, setAuthor] = useState('')
    const [autoGet, setAutoGet] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [isUpdated, setIsUpdated] = useState(false)
    const [oldMessage, setOldMessage] = useState(message)
    const postMessage = () => {
        const newMessage = {
            "message": text,
            "author": author
        }
        MessageService.createMessage(newMessage)
            .then(response => {
                    setText(response.data)
                    console.log(response.data)
                }
            )
            .catch(error => {
                console.log(error)
            })
        setAuthor('')
        setText('')
    }

    const countdown: number = 30000

    function handleChange(e: { target: { value: SetStateAction<string> } }) {
        setText(e.target.value)
    }

    useEffect(() => {
        console.log(`The timeout between checks for new messages is: ${countdown / 1000}s. Starting..`)
        const intervalCall = setInterval(() => {
            autoGet && getAllMessage()
        }, countdown);
        const getAllMessage = () => {
            setIsLoading(true)
            console.log('isLoading is true')
            
            MessageService.getAllMessages()
                .then(response => {
                    setMessage(response.data)
                    message === oldMessage ? setIsUpdated(false) : setIsUpdated(true)
                    console.log(`the Old: ${oldMessage}\n\nthe New: ${message}`)
                    console.log('isLoading is false')
                    console.log(message)
                    console.log(isLoading, isUpdated)
                    console.log(`pausing so we can see the change of state.`)
                    setTimeout(() => {
                        console.log(`Done pausing.`)
                        setIsLoading(false)
                    }, 1000)
                    
                })
        }
        return () => {
            // clean up
            clearInterval(intervalCall)
            setOldMessage(message)
        };
    }, [autoGet, isLoading, isUpdated, message, oldMessage]);


    return (
        <>
            <section className={css.sectionContainer}>
                <h2 data-testid='messageText' className={css.h1Text}>Lämna en smurfs</h2>
                <div className={css.usernameInput}>Namn:
                    <input className={css.input} id={'author'} onChange={e => setAuthor(e.target.value)} placeholder={String(loggedIn.fullName)}/>

                </div>
                <br/>
                <label htmlFor="description">
                    <textarea data-testid='textArea' className={css.labelTextArea}
                              id="description" cols={45} rows={7}
                              onChange={event => handleChange(event)}>message..</textarea></label>
            </section>
            <section className={css.sectionButton}>
                <button data-testid='buttonText' className={css.buttonPost} onClick={postMessage}>Skicka</button>
                <label data-testid='labelText' htmlFor={'autoget'}>AUTOGET</label>
                <input type={"checkbox"} checked={autoGet} onChange={() => {
                    setAutoGet(!autoGet)
                }} name={'autoget'} value={String(autoGet)}/>
                <div className={css.statusOfMessages}>
                    {isLoading ? `Looking for new messages on the server..` : `List of messages is up to date.`}
                </div>
            </section>

            <div className={css.messageWrap}>
                {message.map(msg => (
                    <Card key={String(msg.createdAt)} 
                        message={msg.message}
                        author={msg.author}
                        created={msg.createdAt}
                        updated={msg.updatedAt}/>
                ))}
            </div>
        </>
    )
}

export default MessageView