import { IncomingMessage } from "http"

function MessageView() {
    
        MessageService.createUser(payload)
            .then(response => {
                setText(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <>
            <h2>MessageView</h2>
            <div>
                <label htmlFor="description">Description</label>
                <textarea id="description" cols={30} rows={10}></textarea>
                <button>Skicka</button>
            </div>
        </>
    )
}

export default MessageView