// api/vercel-status.js

// Usamos el nombre estándar para tu Token Personal de Vercel.
// Debes configurarlo en las Variables de Entorno (Environment Variables) de Vercel.
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;

// ID de tu equipo o usuario (opcional, si usas una cuenta personal, puede ser 'undefined').
// Si usas un equipo, busca el ID en el Dashboard de Vercel.
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID; 

// URL de la API de Vercel para listar proyectos (se usa 'limit=1' para la verificación rápida)
const getApiUrl = () => {
    let url = 'https://api.vercel.com/v9/projects?limit=1';
    if (VERCEL_TEAM_ID) {
        url = `https://api.vercel.com/v9/projects?teamId=${VERCEL_TEAM_ID}&limit=1`;
    }
    return url;
};

// Función Serverless: Maneja la conexión y el estado.
export default async (req, res) => {
    // 1. Condición: Verificar la existencia del Token
    if (!VERCEL_TOKEN) {
        return res.status(500).json({ 
            status: "❌ ERROR",
            message: "VERCEL_TOKEN no está configurado en el entorno de Vercel.",
            connected: false
        });
    }

    try {
        const response = await fetch(getApiUrl(), {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${VERCEL_TOKEN}`,
            },
        });

        // 2. Condición: Verificar la respuesta de la API (200 OK)
        if (response.ok) {
            // La conexión fue exitosa y la API devolvió datos.
            return res.status(200).json({
                status: "✅ CONEXIÓN EXITOSA",
                message: "La función se conectó a la API de Vercel y se autenticó correctamente.",
                connected: true
            });
        } else {
            // La conexión llegó, pero el Token fue rechazado (401) o hubo otro error (500).
            const errorText = await response.text();
            return res.status(response.status).json({
                status: `❌ ERROR ${response.status}`,
                message: `Fallo de autenticación o permiso. El token fue rechazado.`,
                details: errorText.substring(0, 100), // Muestra los primeros 100 caracteres del error
                connected: false
            });
        }

    } catch (error) {
        // 3. Condición: Error de Red (ej: La URL no existe o timeout)
        console.error("Error de red al contactar Vercel:", error);
        return res.status(500).json({
            status: "❌ ERROR DE RED",
            message: "Fallo al establecer la conexión con el servidor de Vercel.",
            connected: false
        });
    }
};