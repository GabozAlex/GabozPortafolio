import enlaces from "../enlace-sesiones/enlaces"

export default function nav() {
    return (
        <footer>
            <p>© 2024 Gaboz. Todos los derechos reservados.</p>
            <nav>
                {enlaces({texto: "Privacidad"})}
                {enlaces({texto: "Términos de Servicio"})}
            </nav>
        </footer>
    )
}