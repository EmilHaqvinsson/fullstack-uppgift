import css from '../view/UserView.module.css'
import ARAM from '../utils/image/ARAM.jpg'

function UserView(): JSX.Element {
    return (
        <>
            <div className={css.myDIV}>
                <div className={css.item1}>1</div>
                {/*<div className={css.item2}>2</div>*/}
                <div className={css.item3}>3</div>
                <div className={css.item4}>4</div>
                <div className={css.item5}>5</div>
                <div className={css.item6}>6</div>
            </div>

            <section className={css.section}>
                <div className={css.emty}></div>
                <div className={css.userDiv}>
                    <h2 data-testid='textH2'>Welcome.. {}</h2>
                    <img className={css.imageUser} src={ARAM} alt="user"/>
                    <div className={css.inputDiv}>
                        <input data-testid='inputFullName'
                               type="text" placeholder="FirstName"/>
                        <input data-testid='inputLastName'
                               type="text" placeholder="LastName"/>
                        <input data-testid='inputEmpty'
                               type="text"/>
                        <input data-testid='inputEmptyTwo'
                               type="text"/>
                    </div>

                </div>

                <div className={css.empty}></div>
            </section>
        </>
    )
}

export default UserView