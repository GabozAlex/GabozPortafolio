import { useState, useEffect } from 'react';
import TarjetaProyecto from '../tarjetaproyectos/tarjetaproyectos'; // Asegúrate de que esta ruta sea correcta
import './Proyectos.css'; 

// Define la interfaz (estructura de datos) para un proyecto
interface Proyecto {
  id: string;
  name: string;
  url: string;
  framework: string;
  updated: string;
  language: string; // Add the missing property
  last_updated: string; // Add the missing property
}

export default function Proyectos() {
  // Estado para almacenar los proyectos obtenidos de la API
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  // Estado para manejar el mensaje de carga
  const [cargando, setCargando] = useState(true);
  // Estado para manejar errores de la API
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // La llamada se hace al endpoint local creado en la carpeta 'api/'
    fetch('/api/projects') 
      .then(response => {
        if (!response.ok) {
          // Si la respuesta no es 200 OK, lanza un error
          throw new Error('Fallo en la respuesta de la API de Vercel.');
        }
        return response.json();
      })
      .then((data: Proyecto[]) => {
        setProyectos(data); // Almacena el array de proyectos
      })
      .catch(err => {
        console.error("Error al obtener proyectos:",err);
        setError("No se pudieron cargar los proyectos. Inténtalo de nuevo más tarde.");
      })
      .finally(() => {
        setCargando(false); // Finaliza el estado de carga
      });
  }, []); // El array vacío asegura que se ejecute solo al montar el componente

  // --- Funciones de Renderizado ---
  
  const renderizarContenido = () => {
    if (cargando) {
      return <p className="mensaje-estado">Cargando proyectos desde Vercel...</p>;
    }
    
    if (error) {
      return <p className="mensaje-estado error">{error}</p>;
    }

    if (proyectos.length === 0) {
      return <p className="mensaje-estado">No se encontraron proyectos desplegados en Vercel para mostrar.</p>;
    }

    return (
      // El className="proyectos-grid" se define en Proyectos.css
      <div className="proyectos-grid"> 
        {proyectos.map(proyecto => (
          <TarjetaProyecto key={proyecto.id} proyecto={proyecto} /> 
        ))}
      </div>
    );
  };
  
  return (
    <section className="Proyectos" id="proyectos">
      <h2>Proyectos</h2>
      <p>Una muestra de mis trabajos más recientes, obtenidos automáticamente desde mis despliegues en Vercel. Total: {proyectos.length} proyectos.</p>
      
      {renderizarContenido()}
    </section>
  );
}