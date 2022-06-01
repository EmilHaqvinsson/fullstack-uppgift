import css from '../view/UserView.module.css'
import smurffen from '../utils/image/smurffen.jpg'

function UserView() {
    return (
        <>
            <div className={css.section}>
                <section>
                    <img className={css.imageUser} src={smurffen} alt="user"/>
                    <p>
                        <input type="text" placeholder="Name"/>
                        <input type="text" placeholder="LastName"/>
                        <br/>
                        <input type="text" placeholder="E-mail"/>
                        <input type="text" placeholder="Work"/>
                    </p>


                </section>
            </div>
        </>
    )
}

export default UserView