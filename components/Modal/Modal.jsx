import React, {useState} from 'react'
import styles from './Modal.module.scss'
import Image from 'next/image'

export function Modal({children, trigger, setter}){
    return (
        <div id="myModal" className={styles.modal} style={{display: `${trigger ? 'block':'none'}`}}>
            <div className={styles.modalContent}>

                <span className={styles.close} onClick={e=>setter(false)}>
                    <Image src='/X.svg' alt='Delete book' width={21} height={21} />
                </span>

                {children}
            </div>
        </div>
    )
}