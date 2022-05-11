import css from '../view/StartView.module.css'
import {findAllByDisplayValue} from "@testing-library/react";

function StartView() {

    return (
        <div className={css.mainGridContainer}>
            <div className={css.item}>
                <h1 className={css.text}>BookFace</h1>
                <h3 className={css.textOne}>Connect and find friends all over the world.</h3>
            </div>

            <div className={css.itemOne}>
                <section>
                    <input type="text" placeholder='Username/e-mail'/>
                    <br/>
                    <input type="text" placeholder='Password'/>
                    <br/>
                    <button>Log in</button>
                    <hr/>
                    <button className={css.buttonCreateNewAccount}>Create new account</button>
                </section>
            </div>
        </div>
    )
}

export default StartView