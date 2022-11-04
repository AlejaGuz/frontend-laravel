import Link from "next/link";

//Las siguientes líneas son para llamar al API del backend
export async function getStaticProps(){
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`)
    const data = await response.json();

    console.log(data);

    return {
        props: {
            books: data // estos son los libros que van a llegar del Api
        }
    }
}

const BookList = (/*esta es la variable de arriba de props*/{ books })=>{
    return (
        <div>
            {/*esta línea es como para imprimir 
            la estructura de la variable que le pasemos como parámetro
            para este caso el arreglo de libros 
            <pre>{JSON.stringify(books)}</pre> */ }

            <h1>Books</h1>
            <ul>
                {books.map(book =>(
                    <li key={`book-${book.id}`}>
                        <Link href={`/libros/${book.id}`}>
                        {book.title}
                        </Link>
                    </li>
                         ))}
            </ul>
            <Link href='/libros/create'>Create Book</Link> 
            <br/>
        </div>
    )
}

export default BookList