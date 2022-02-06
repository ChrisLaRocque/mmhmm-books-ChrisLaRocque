import Head from 'next/head'
// import Image from 'next/image'
import React, {useState, useEffect} from 'react'
import { Bookshelf } from '../components/Bookshelf/Bookshelf'

import styles from '../styles/Home.module.scss'

const errors = {
  'delete': 'Whoops, something went wrong deleting that book.',
  'post': 'Whoops, we couldn&apos;t add that book for some reason. Please try again.'
}

export default function Home() {
  const [books, setBooks] = useState(null)

  // This level of specificity could probably be refined
  const [isLoading, setLoading] = useState(false)
  
  // fetch all books
  function fetchBooks(){
    setLoading(true)
    fetch('https://us-central1-all-turtles-interview.cloudfunctions.net/books', {
      method: 'get', 
      headers: new Headers({
        'Authorization': 'chrislarocque', 
    }), })
    .then((res) => res.json())
    .then((data) => {
      setBooks(data)
      setLoading(false)
    })
  }

  // Load the list of books on render
  useEffect(() => {
    fetchBooks()
  }, []);

  // if (isLoading) return <p>Loading...</p>
  return (
    <>
      <Head>
        <title>Chris LaRocque mmhmm take home</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <div className={styles.pageWrapper}>
        <Bookshelf books={books} setBooks={setBooks}/> 
      </div>
    </>
  )
}
