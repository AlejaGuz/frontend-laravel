import Link from "next/link";
import Router from "next/router";

export async function getStaticProps(context){
    const id = context.params.bookId;
    //const response = await fetch('http://127.0.0.1:8000/api/books/'+id)
    //para no quemar la url en el código, se usa variables de entorno así:
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/`+id)
    const data = await response.json();

    console.log(data);

    return {
        props: {
            book: data // estos son los libros que van a llegar del Api
        }
    }
}

export async function getStaticPaths() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`)
    const data = await response.json();

    return {
        paths: data.map(book =>(
            {params:{bookId:String(book.id)}}
            )),
        fallback: false
    }
}

const BookShow = ({book}) => {

    async function handleDelete(e) {
        e.preventDefault()

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${book.id}`,{
            method:'POST',
            headers:{
                accept:'application/json',
                'content-type':'application/json'
            },
            body: JSON.stringify({
                _method: 'DELETE'
            })
        })

        if(response.ok){
            return Router.push('/libros')
        }
    }

    return (
           <div>
               <h1>{book.title}</h1>
               <Link href={`/libros/${book.id}/edit`}>Edit Book</Link> 
               <br/>
               <form onSubmit={handleDelete}>
                <button style={{display:'inline'}}>Eliminar</button>
               </form>
               <Link href='/libros'>Book List</Link> 
           </div>
       )
     
}
     
export default BookShow