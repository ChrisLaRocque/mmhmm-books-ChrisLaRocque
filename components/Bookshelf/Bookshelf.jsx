import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import styles from './Bookshelf.module.scss'
import { BookForm } from './BookForm/BookForm'
import { Modal } from '../Modal/Modal'
import { Spinner } from '../Spinner/Spinner'


export function Bookshelf(){
    const [books, setBooks] = useState(null)
    const [loadingBooks, setLoadingBooks] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [isDeleting, setDeleting] = useState(false)

  
    // fetch all books
    function fetchBooks(){
        fetch('https://us-central1-all-turtles-interview.cloudfunctions.net/books', {
        method: 'get', 
        headers: new Headers({
            'Authorization': 'chrislarocque', 
        }), })
        .then((res) => res.json())
        .then((data) => {
            setBooks(data)
            setLoadingBooks(false)
        })
    }

    // Close form modal w/escape key
    if(typeof document !== 'undefined'){
        document.addEventListener('keydown', (e)=>{
            if(e.key === 'Escape'){
                setShowForm(false)
            }
        });
    }

    // Delete book
    function deleteBook(bookId){
        setDeleting(bookId)
        fetch(`https://us-central1-all-turtles-interview.cloudfunctions.net/books/${bookId}`, {
            method: 'delete', 
            headers: new Headers({
                'Authorization': 'chrislarocque', 
            }), 
        }).then((res) => {
            setDeleting(false)
            return res.json()
        }).then((data) => {
            setBooks(data)
        })
    }
    
    // Load the list of books on render
    useEffect(() => {
        fetchBooks()
    }, []);
    return (
        <section className={styles.bookShelf}>
            <div className={`${styles.headerRow} row`}>
                <h1>Bookshelf</h1>
                <button type="button" className='btn-green' onClick={e=>setShowForm(true)}>Add book</button>
            </div>
            <div className={`${styles.booksRow} row`}>
                {/* {books && <div>{`${books.length} books`}</div>} */}
                {loadingBooks ? <div>Loading your bookshelf...</div> :(
                    <>
                    {books && books.map(book =>{
                        const deletingThis = isDeleting === book.id
                        return (
                            <div className={`${styles.book} ${deletingThis ? styles.inactive : ''}`} key={book.id}>
                                <Image width={125} height={200} src={book.imageUrl} alt={`Book cover for ${book.title}`} className={styles.bookImage} />
                                <div className={styles.bookTextContainer}>
                                    <strong>{book.title}</strong>
                                    <small>{book.author}</small>
                                    <p>{book.description}</p>
                                </div>
                                <button type="button" onClick={e=>deleteBook(book.id)} disabled={isDeleting}>
                                    {deletingThis ? <Spinner /> : <Image src='/trash.svg' alt='Delete book' width={21} height={21} />}
                                </button>
                            </div>
                        )
                    })}
                    {(!books || !books.length) && <div>No books on your list. Start by <a href="#" onClick={e=>setShowForm(true)} style={{textDecoration: 'underline'}}>adding some</a></div>}</>
                )}
            </div>
            <Modal trigger={showForm} setter={setShowForm}>
                <BookForm setBooks={setBooks}  />
            </Modal>
        </section>
    )
}

export default Bookshelf