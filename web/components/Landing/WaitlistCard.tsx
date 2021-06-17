import React from 'react'
import styles from '~/styles/index.module.scss'

const WaitlistCard = () => {
    return (
        <div className={styles.waitlistCard}>
            <h3>{'What are you waiting for?'.toUpperCase()}</h3>
            <h1>Sign Up For The Waitlist!</h1>
            <div className={styles.waitlistCard__textbox}>
                <img src="/icons/at.svg" alt="" />
                <input type="email" placeholder={'email'.toUpperCase()} />
                <button className={styles.waitlistCard__submit}>Submit</button>
            </div>
            <span className={styles.waitlistCard__subText}>
                We promise to never spam you.
            </span>
        </div>
    )
}

export default WaitlistCard