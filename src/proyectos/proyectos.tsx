import { useState, useEffect } from 'react';
import TarjetaProyecto from '../tarjetaproyectos/tarjetaproyectos'; // Asegúrate de que esta ruta sea correcta
import './proyectos.css'; 

export default function Proyectos() {
  return (
    <section className="Proyectos" id="proyectos">
      <h2>Proyectos</h2>
      <p>Una muestra de mis trabajos más recientes, obtenidos automáticamente desde mis despliegues en Vercel. Total: proyectos.</p>
    </section>
  );
}