import Link from "next/link";
import Router from "next/router";
import { useState } from "react";

export async function getServerSideProps({params}) {
   
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${params.bookId}`)
    const data = await response.json()


    return {
        props: {
            book: data
        }
    }
}

const BookEdit = ({book}) => {

    const [bookName, setBookName] = useState(book.title)
    const [errors, setErrors] = useState([])
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(e){
        e.preventDefault()

        setSubmitting(true)

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${book.id}`,{
            method:'POST',
            headers:{
                accept:'application/json',
                'content-type':'application/json'
            },
            body: JSON.stringify({
                title: bookName,
                _method: 'PATCH'
            })
        })

        if(response.ok){
            //funcionó
            setErrors([])
            setBookName('')
            return Router.push('/libros')
        }

        const data = await response.json()
        setErrors(data.errors)
        setSubmitting(false)

    }
    return (
           <div>
               <h1>Book Edit</h1>
               <p>{JSON.stringify(bookName)}</p>

               <form onSubmit={handleSubmit}>
                <input 
                type="text" 
                onChange={(e)=> setBookName(e.target.value)}
                disabled={submitting}
                value={bookName}></input>
                <button disabled={submitting}>{submitting ? 'Enviando...': 'Enviar'}</button>
                {errors.title && 
                (<span style={{color:'red' , display: 'block'}}>
                    {errors.title}
                </span>)}
               </form>
               <Link href='/libros'>Book List</Link>
           </div>
       )
     
}
     
export default BookEdit