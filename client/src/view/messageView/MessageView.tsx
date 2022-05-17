import {useState, useEffect} from 'react'
import MessageService from '../../utils/api/service/MessageService'
import {ReadMessage} from '../../utils/interface/IMessage'
import Card from '../../components/card/Card'
import css from '../messageView/MessageView.module.css'


function MessageView() {
    const [message, setMessage] = useState<Array<ReadMessage>>([])
    const [text, setText] = useState('')
    const [author, setAuthor] = useState('')
    const [autoGet, setAutoGet] = useState(false)
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
        }, 15000);
        return () => {
            // clean up
            clearInterval(intervalCall);
        };
    });


    return (
        <>
            <h2>All message</h2>
            {autoGet && <span className={css.autoGetON}>AUTOGET IS REAL</span>}
            <section className={css.sectionContainer}>
                <label htmlFor="description">
    <textarea id="description" cols={70} rows={10}
              onChange={event => setText(event.target.value)}></textarea></label>
                <div>Username: <input id={'author'} onChange={e => setAuthor(e.target.value)}/></div>
            </section>
            <section>
                <button className={css.buttonPost} onClick={postMessage}>Post</button>
                <button onClick={getAllMessage}
                        {...autoGet === true ?
                            `className={${css.autoGetON}}` : `className={${css.autoGetOFF}}`}>Get All
                </button>
            </section>

            <label htmlFor={'autoget'}>AUTOGET</label>
            <input type={"checkbox"} onChange={() => {
                setAutoGet(!autoGet)
            }} name={'autoget'} value={String(autoGet)}/>


            <div>
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