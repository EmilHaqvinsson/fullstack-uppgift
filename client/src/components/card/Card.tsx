import { FC } from 'react'
import css from './Card.module.css'

interface Props {
    message: string,
    author: string,
    created: Date,
    updated: Date
}

const Card: FC<Props> = ({ message, author, created, updated }) => {
    return (<>
        <div className={css.cardDiv} key={String(created)}>
            {author ? `${author}` : 'Unknown: '}
            <div className={css.cardMsg}>
                {message}
            </div>
            <div className={css.cardTimeStamps}>
                <span>{String(`${created}`)}</span><span>{!(created === updated) ? String(`| UPDATED AT: ${updated}`) : null}</span>
            </div>
        </div>
    </>
    )
}

export default Card