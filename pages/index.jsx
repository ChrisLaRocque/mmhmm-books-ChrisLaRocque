import Head from 'next/head'
import React, {useState, useEffect} from 'react'
import { Bookshelf } from '../components/Bookshelf/Bookshelf'


export default function Home() {
  const [books, setBooks] = useState(null)
  
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
    })
  }

  // Load the list of books on render
  useEffect(() => {
    fetchBooks()
  }, []);

  return (
    <>
      <Head>
        <title>Chris LaRocque mmhmm take home</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <div>
        <Bookshelf books={books} setBooks={setBooks}/> 
      </div>
    </>
  )
}
