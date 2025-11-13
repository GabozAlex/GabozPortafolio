// enlaces.tsx
import './enlaces.css'; // <-- Importa el CSS del enlace

function enlaces(props: {texto: string}) {
    const idSeccion = props.texto.toLowerCase().replace(/\s/g, '-');
    return (
        
        // Aplica la clase CSS
        <a href={`#${idSeccion}`} className="enlace-nav">{props.texto}</a> 
    )
}
export default enlaces