import proyectosData from '../assets/data/proyectos.json';

import TarjetaProyecto from '../tarjetaproyectos/tarjetaproyectos';

import './proyectos.css'; 

export default function Proyectos() {
  return (
    <section className="Proyectos" id="proyectos">
      <h2>Proyectos</h2>
      <p>Una muestra de mis trabajos más recientes, obtenidos automáticamente desde mis despliegues en Vercel. Total: proyectos.</p>
      <div className='contenedor-proyectos'>
        {proyectosData.map((proyecto) => (
          <TarjetaProyecto key={proyecto.id} data={proyecto} />
        ))}
      </div>
    </section>
  );
}