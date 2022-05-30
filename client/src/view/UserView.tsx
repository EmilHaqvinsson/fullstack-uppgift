import css from '../view/UserView.module.css'
import ARAM from '../utils/image/ARAM.jpg'

function UserView() {
    return (
        <>
            <div className={css.section}>
                <section>
                    <img className={css.imageUser} src={ARAM} alt="user"/>
                    <p>
                        <input type="text" placeholder="FirstName"/>
                    </p>
                    <p>
                        <input type="text" placeholder="LastName"/>
                    </p>

                </section>
            </div>
        </>
    )
}

export default UserView


{/*                <section className={css.section}>
                    <div className={css.userDiv}>
                        <h2>Welcome.. (Lägg in användare som är inloggad?)</h2>
                        <div className={css.inputDiv}>
                            <div className={css.myDIV}>
                                <div className={css.item3}>
                                    <img className={css.imageUser} src={ARAM} alt="user"/>
                                    <input type="text" placeholder="FirstName"/>
                                    <input type="text" placeholder="LastName"/>
                                    <input type="text"/>
                                    <input type="text"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>*/
}