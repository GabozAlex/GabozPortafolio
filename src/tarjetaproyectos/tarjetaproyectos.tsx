
import './tarjetaproyecto.css';

interface ProyectoData {
  titulo: string;
  descripcion: string;
  tecnologias: string[];
  link_demo: string;
  link_github: string;
  imagen_url: string;
}

// El componente recibe un objeto de propiedades (props), en este caso, 'data'
function TarjetaProyecto({ data }: { data: ProyectoData }) {
  // Desestructuramos el objeto 'data' para usar las variables directamente
  const { 
    titulo, 
    descripcion, 
    tecnologias, 
    link_demo, 
    link_github, 
    imagen_url 
  } = data;

  return (
    <article className="tarjeta-proyecto">
      <img src={imagen_url} alt={`Captura del proyecto ${titulo}`} className="proyecto-imagen"/>
      
      <h3>{titulo}</h3>
      <details className="proyecto-detalles">
        
        {/* El Summary es el texto/área clickable */}
        <summary className="detalle-summary">
          <span className="summary-text">Ver / Ocultar Descripción</span>
        </summary>
        
        {/* Esto es lo que aparece al hacer clic en Summary */}
        <div className="detalle-contenido">
            <p>{descripcion}</p>
        </div>
        
      </details>
      
      {/* Mapeamos el array de tecnologías para crear los 'spans' */}
      <div className="tecnologias">
        {tecnologias.map((tech, index) => (
          <span key={index} className="tech-tag">{tech}</span>
        ))}
      </div>
      
      <div className="links">
        <a href={link_demo} target="_blank" rel="noopener noreferrer" className="btn-demo">Ver Demo</a>
        <a href={link_github} target="_blank" rel="noopener noreferrer" className="btn-github">Ver Código</a>
      </div>
    </article>
  );
}

export default TarjetaProyecto;