import css from '../view/UserView.module.css'
import user from '../utils/image/user.png'

function UserView() {
    return (
        <>
            <section className={css.section}>
                <div className={css.emty}></div>
                <div className={css.userDiv}>
                    <h1>Welcome.. (Lägg in användare som är inloggad?)</h1>
                    <img className={css.imageUser} src={user} alt="user"/>
                    <br/>
                    <input type="text" placeholder="FirstName"/>
                    <input type="text" placeholder="LastName"/>
                </div>

                <div className={css.emty}></div>
            </section>
        </>
    )
}

export default UserView