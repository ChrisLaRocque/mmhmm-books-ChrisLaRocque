import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styles from './GoogleBookSearch.module.scss'

export function GoogleBookSearch({setBooks}){
    // const [query, setQuery] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const [results, setResults] = useState([])
    // Add book to list
    function postBook(bookInfo){

      fetch('https://us-central1-all-turtles-interview.cloudfunctions.net/books', {
        method: 'post', 
        headers: new Headers({
          'Authorization': 'chrislarocque', 
          'Content-Type': 'application/json'
        }), 
        body: JSON.stringify(bookInfo)
      })
        .then((res) => res.json()).then((data)=> {
          setBooks(data)
        })
    }
    // fetch books based on query
    function searchBooks(query){
        setIsSearching(true)
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`, {
        method: 'get', 
        })
        .then((res) => res.json())
        .then((data) => {
            console.log('searchBooks data', data)
            const {items} = data
            // Map items to the fields we care about
            const itemsToBookObjs = items.map(({id, volumeInfo})=>{
                const {title, description, authors, imageLinks } = volumeInfo
                const author = authors.join(', ')

                const imageUrl = imageLinks ? imageLinks.smallThumbnail : 'https://picsum.photos/125/200'
                return {
                    title,
                    author,
                    imageUrl,
                    description: description ? `${description.substring(0, 262)}...` : '',
                    googleId: id,
                }
            })
            setIsSearching(false)
            setResults(itemsToBookObjs)
        })
    }
    useEffect(()=>{
        // https://www.googleapis.com/books/v1/volumes?q=flowers
        // searchBooks('tale of two')
    }, [])
    function submitHandler(e){
        e.preventDefault()
        const searchValue = e.target.searchField.value
        if(searchValue){
            searchBooks(searchValue)
        }
    }
    return (
        <div className={styles.searchWrapper}>
            <h3>Search</h3>
            <div className={styles.searchBar}>
                <form onSubmit={e=>submitHandler(e)}>
                    <label htmlFor="searchField">
                        Search books
                    </label>
                    <input
                        type="text"
                        id="searchField"
                        placeholder="Search books"
                        name="searchField" 
                    />
                    <button type="submit">Search</button>
                </form>
            </div>
            <div className='searchResults'>
                {results && results.map(result => {
                    const { title, description, author, imageUrl, googleId } = result
                    return(
                        <div key={googleId} className={styles.result}>
                            <div style={{display: 'flex'}}>
                                <Image src={imageUrl} width={125} height={200}/>
                                <div className={styles.resultText} style={{maxWidth: '66%'}}>
                                    <strong>{title}</strong><br />
                                    <small>{author}</small>
                                    <p>{description}</p>
                                </div>
                            </div>
                            <button type="button" onClick={e=>postBook(result)}>Add to bookshelf</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default GoogleBookSearch