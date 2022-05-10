import css from './Header.module.css'

function Header () {
    return (
        <div className={css.headerContainer}>
            <h1 className={css.text}>Bookface</h1>
        </div>
    )
}

export default Header