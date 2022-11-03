//a mí no me salió advertencia, pero en caso de que salga con el export
//se haría de la siguiente forma:

/**
 * Se crea una constante y se le asigna el retorno
 * const BookList = () => {
 * 
 * return (
        <div>
            <h1>Libros</h1>
        </div>
    )
 * 
 * }
 * 
 * y en vez del export function, sería:
 * export default BookList
 */

export default function (){
    return (
        <div>
            <h1>Libros</h1>
        </div>
    )
}