// src/components/TarjetaProyecto.jsx

// Asegúrate de importar cualquier CSS que crees para este componente (ej: TarjetaProyecto.css)

interface Proyecto {
  name: string;
  description?: string;
  language: string;
  last_updated: string;
  url: string;
}

export default function TarjetaProyecto({ proyecto }: { proyecto: Proyecto }) {
    return (
      <div className="tarjeta-proyecto">
        <h3 className="titulo-proyecto">{proyecto.name}</h3>
        <p className="descripcion">{proyecto.description || 'Este proyecto no tiene una descripción.'}</p>
        
        <div className="detalles">
          <span className="lenguaje">{proyecto.language}</span>
          <span className="fecha">Actualizado: {proyecto.last_updated}</span>
        </div>
        
        <a 
          href={proyecto.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn-repo"
        >
          Ver en GitHub
        </a>
      </div>
    );
  }