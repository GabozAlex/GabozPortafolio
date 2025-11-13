import enlace from "../enlace-sesiones/enlaces"
import './header.css'

function header() {
    return (
        <header>
            <nav>
                {enlace({texto: "Inicio"})}
                {enlace({texto: "Sobre Mi"})}
                {enlace({texto: "Educación"})}
                {enlace({texto: "Habilidades"})}
                {enlace({texto: "Proyectos"})}
                {enlace({texto: "Redes Sociales"})}
            </nav>
        </header>
    )
}

export default header