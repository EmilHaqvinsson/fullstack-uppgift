import {useState, useEffect} from 'react'
import MessageService from '../utils/api/service/MessageService'
import {ReadMessage} from '../utils/interface/IMessage'
import Card from '../components/card/Card'
import css from './MessageView.module.css'


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
            setAuthor('INPUT AUTHOR')
            setText('MAKE NEW MESSAGE')
    }
    const getAllMessage = () => {
        MessageService.getAllMessages()
            .then(response=> {
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
        <><>
            <h2>MessageView</h2>
            {autoGet && <span className={css.autoGetON}>AUTOGET IS REAL</span>}
            <div className={css.inputAreaWrap}>
                <label htmlFor="description">
                    <textarea id="description" cols={30} rows={10}
                        onChange={event => setText(event.target.value)}></textarea></label>
                <div>by: <input id={'author'} onChange={e => setAuthor(e.target.value)} /> </div>
                <button onClick={postMessage}>Post</button>
                <label htmlFor={'autoget'}>AUTOGET</label>
                <input type={"checkbox"} onChange={() => { setAutoGet(!autoGet) } } name={'autoget'} checked={(autoGet)} />
                <button
                    onClick={getAllMessage}
                    {...autoGet === true ?
                        `className={${css.autoGetON}}` : `className={${css.autoGetOFF}}`}>Get All</button>
            </div>
            <div className={css.messageWrap}>
                {message.map(msg => (
                    <Card message={msg.message}
                        author={msg.author}
                        created={msg.createdAt}
                        updated={msg.updatedAt} />
                ))}
            </div></>
        </>
    )
}

export default MessageView