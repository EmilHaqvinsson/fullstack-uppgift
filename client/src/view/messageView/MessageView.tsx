import {useState, useEffect} from 'react'
import MessageService from '../..//utils/api/service/MessageService'
import {ReadMessage} from '../../utils/interface/IMessage'
import Card from '../../components/card/Card'
import css from './MessageView.module.css'


function MessageView() {
    const [message, setMessage] = useState<Array<ReadMessage>>([])
    const [text, setText] = useState('')
    const [author, setAuthor] = useState('')
    const [autoGet, setAutoGet] = useState(true)
    const [updated, setIsUpdated] = useState(false)

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
    const getAllMessage = () => {
        MessageService.getAllMessages()
            .then(response => {
                setMessage(response.data)
                console.log(message)
            })
    }

    useEffect(() => {
        console.log('Doing the effect')
        const intervalCall = setInterval(() => {
            autoGet && getAllMessage()
        }, 2000);
        return () => {
            // clean up
            clearInterval(intervalCall);
        };
    });


    return (
        <>
            {autoGet && <span className={css.autoGetON}>AUTOGET IS REAL</span>}
            <section className={css.sectionContainer}>
                <h2 className={css.h1Text}>Lämna en smurfs</h2>
                <div className={css.usernameInput}>Namn: <input className={css.input} id={'author'} onChange={e => setAuthor(e.target.value)}/>
                </div>
                <br/>
                <label htmlFor="description">
                    <textarea className={css.labelTextArea}
                              id="description" cols={70} rows={10}
                              onChange={event => setText(event.target.value)}></textarea></label>
            </section>
            <section className={css.sectionButton}>
                <button className={css.buttonPost} onClick={postMessage}>Skicka</button>
                {/*<label htmlFor={'autoget'}>AUTOGET</label>*/}
                {/*<input type={"checkbox"} onChange={() => {*/}
                {/*    setAutoGet(!autoGet)*/}
                {/*}} name={'autoget'} value={String(autoGet)}/>*/}
            </section>

            <div className={css.messageWrap}>
                {message.map(msg => (
                    <Card message={msg.message}
                          author={msg.author}
                          created={msg.createdAt}
                          updated={msg.updatedAt}/>
                ))}
            </div>
        </>
    )
}

export default MessageView