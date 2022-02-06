import React, {useState} from 'react'
import styles from './BookForm.module.scss'

export function BookForm({setBooks}){
    const [isPosting, setPosting] = useState(false)
    const [showSuccess, setShowSuccess] = useState('')

    // Add book to list
    function postBook(bookInfo){
      setPosting(true)
      fetch('https://us-central1-all-turtles-interview.cloudfunctions.net/books', {
        method: 'post', 
        headers: new Headers({
          'Authorization': 'chrislarocque', 
          'Content-Type': 'application/json'
        }), 
        body: JSON.stringify(bookInfo)
      })
        .then((res) => {
          setPosting(false)
          if(res.status === 200){
            setShowSuccess(bookInfo.title)
            setTimeout(() => {setShowSuccess('')}, 5000); // Hide success message after 5 seconds
          }
          return res.json()
        }).then((data)=> {
          setBooks(data)
        })
    }
    function handleSubmit(e){
        e.preventDefault()

        // Add all fields in the form to an object.
        const bookInfo = {}
        for(let i = 0; i < e.target.length; i++){
           if(e.target.name !== 'submit') {
            bookInfo[e.target[i].name] = e.target[i].value
           }
        }

        postBook(bookInfo)
    }

    return (
      <div className={styles.bookForm}>
        <h2>Add a new book</h2>
        <form className={styles.form} onSubmit={e => handleSubmit(e)}>
          <label htmlFor="title">
            Title
          </label>
          <input name="title" id="title" type="text" required />
          <label htmlFor='author'>
            Author
          </label>
          <input name="author" id="author" type="text" required/>
          <label htmlFor='description'> 
            Description
          </label>
          <textarea name="description" id="description" rows="4" cols="12" maxLength="264" required/>
          <label htmlFor='imageUrl'>
            Image URL
          </label>
          <input name="imageUrl" id="imageUrl" type="text" required />
          <button type="submit" name="submit" disabled={isPosting}>{isPosting ? 'Saving' : 'Save'}</button>
          {showSuccess && <span>&nbsp;{`Successfully added ${showSuccess}`}</span>}
        </form>
      </div>
    );
}