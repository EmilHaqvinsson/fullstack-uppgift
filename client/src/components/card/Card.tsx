import { FC } from 'react'
import css from './Card.module.css'
interface Props {
    message: string
}

const Card:FC<Props>=({message}) => {
    return (
        <div className={css.cardDiv}>
            {message}
        </div>
    )
}

export default Card