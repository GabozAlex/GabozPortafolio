import header from './header/header'
import hero from './hero/hero'
import sobreMi from  './sobre-mi/sobre-mi'
import educacion from './educacion/educacion'
import habilidades from './habilidades/habilidades'
import proyectos from './proyectos/proyectos'
import redesSociales from './redes-sociales/redesSociales'
import footer from './footer/footer'
import './App.css'

function App() {
  return (
    <>
      {header()}
      <main>
        {hero()}
        {sobreMi()}
        {educacion()}
        {habilidades()}
        {proyectos()}
        {redesSociales()}
      </main>
      {footer()}
    </>
  )
}

export default App
