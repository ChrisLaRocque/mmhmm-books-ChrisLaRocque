import React from 'react'
import Image from 'next/image'
import styles from './Modal.module.scss'

export function Modal({children, trigger, setter}){
    return (
        <div id="myModal" className={styles.modal} style={{display: `${trigger ? 'block':'none'}`}}>
            <div className={styles.modalContent}>
                <button type="button" className={styles.close} onClick={e=>setter(false)}>
                    <Image src='/X.svg' alt='Delete book' width={21} height={21} />
                </button>

                {children}
            </div>
        </div>
    )
}
export default Modal