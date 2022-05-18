import css from '../view/UserView.module.css'
import user from '../utils/image/user.png'

function UserView() {
    return (
        <>
            <section className={css.section}>
                <div className={css.emty}></div>
                <div className={css.userDiv}>
                    <h2>Welcome.. (Lägg in användare som är inloggad?)</h2>
                    <img className={css.imageUser} src={user} alt="user"/>
                    <div className={css.inputDiv}>
                        <input type="text" placeholder="FirstName"/>
                        <input type="text" placeholder="LastName"/>
                        <input type="text"/>
                        <input type="text"/>
                    </div>

                </div>

                <div className={css.empty}></div>
            </section>
        </>
    )
}

export default UserView