import Link from "next/link";

export async function getStaticProps(context){
    const id = context.params.bookId;
    const response = await fetch('http://127.0.0.1:8000/api/books/'+id)
    const data = await response.json();

    console.log(data);

    return {
        props: {
            book: data // estos son los libros que van a llegar del Api
        }
    }
}

export async function getStaticPaths() {
    const response = await fetch('http://127.0.0.1:8000/api/books')
    const data = await response.json();

    return {
        paths: data.map(book =>(
            {params:{bookId:String(book.id)}}
            )),
        fallback: false
    }
}

const BookShow = ({book}) => {
    return (
           <div>
               <h1>{book.title}</h1>
               <Link href='/libros/1/edit'>Edit Book</Link> 
               <br/>
               <Link href='/libros'>Book List</Link> 
           </div>
       )
     
}
     
export default BookShow