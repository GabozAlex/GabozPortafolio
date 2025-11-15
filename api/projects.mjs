// api/vercel-projects.js

// 🚨 Obtén tu ID de usuario/equipo de Vercel
const VERCEL_TEAM_ID = process.env.Il21xjv9Zo47dgUhHK0Be50w || 'tu_id_de_equipo_o_usuario';

// El VERCEL_TOKEN es la variable de entorno que establecimos
const VERCEL_TOKEN = process.env.DIooSpS1VgQcLqjDbda7CYmC;

// ID de los proyectos que no quieres mostrar (ej: el código del portafolio)
const PROJECTS_TO_EXCLUDE = ['']; 

interface ApiResponse {
    error?: string;
    projects?: {
        id: string;
        name: string;
        url: string;
        updated: string;
        framework: string;
    }[];
}

export default async (_req: any, res: { status: (arg0: number) => { (): any; new(): any; json: (arg0: ApiResponse) => void; }; setHeader: (arg0: string, arg1: string) => void; }) => {
    if (!VERCEL_TOKEN) {
        return res.status(500).json({ error: "VERCEL_TOKEN no está configurado." });
    }

    try {
        // 1. Consulta la API de Vercel para obtener la lista de proyectos
        // NOTA: Usa el parámetro teamId si estás en un equipo
        const url = `https://api.vercel.com/v9/projects${VERCEL_TEAM_ID ? `?teamId=${VERCEL_TEAM_ID}` : ''}`;
        
        const response = await fetch(url, {
            headers: {
                // Usamos el token para autenticarnos
                Authorization: `Bearer ${VERCEL_TOKEN}`, 
            },
        });

        if (!response.ok) {
            // Muestra el error de la API si la respuesta no fue OK
            const errorData = await response.json();
            if (typeof errorData === 'object' && errorData !== null && 'error' in errorData && typeof (errorData as any).error.message === 'string') {
                throw new Error(`Error de Vercel API (${response.status}): ${(errorData as any).error.message}`);
            } else {
                throw new Error(`Error de Vercel API (${response.status}): Respuesta desconocida.`);
            }
        }

        interface VercelProject {
            id: string;
            name: string;
            link: { domain: string | null };
            updatedAt: string;
            framework: string;
        }

        interface VercelResponse {
            projects: VercelProject[];
        }

        const data = (await response.json()) as VercelResponse;

        // 2. Filtra y mapea solo los datos de los proyectos que tienen un dominio asignado
        const projects = data.projects
            .filter(project => 
                project.link && 
                project.link.domain && // Asegura que tiene un dominio para mostrar
                !PROJECTS_TO_EXCLUDE.includes(project.id)
            )
            .map(project => ({
                id: project.id,
                name: project.name.replace(/-/g, ' '), // Formato legible
                url: `https://${project.link.domain}`, // URL principal del proyecto
                updated: new Date(project.updatedAt).toLocaleDateString('es-ES'),
                framework: project.framework, // Te da información sobre la tecnología base
            }));

        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
        res.status(200).json({ projects });

    } catch (error) {
        console.error("Error al consultar Vercel:", error);
        res.status(500).json({ error: 'Fallo al obtener los proyectos de Vercel.' });
    }
};