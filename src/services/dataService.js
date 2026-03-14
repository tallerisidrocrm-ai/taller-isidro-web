/**
 * Service to handle data fetching for Taller Isidro Statistics
 * Retrieves records from Airtable via n8n integration.
 */

// Webhook de n8n para datos (FORZADO relativo para pasar por nuestro proxy Nginx)
const N8N_DATA_URL = '/webhook/9b616f6d-415c-4c4b-871b-542ace0b5c22';

export const dataService = {
    /**
     * Fetch all budget records for statistics
     * @returns {Promise<Array>} List of records
     */
    async getStatisticsData() {
        try {
            const apiKey = import.meta.env.VITE_API_KEY || 'tis-k8x7m2p4q9w1n6v3j5';
            const headers = { 'Content-Type': 'application/json' };
            
            if (apiKey) {
                // Mismo usuario/pass que el chat
                const authHeader = btoa(`tallerisidro:${apiKey}`);
                headers['Authorization'] = `Basic ${authHeader}`;
            }

            const response = await fetch(N8N_DATA_URL, { headers });
            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error Response:', response.status, errorText);
                throw new Error(`Failed to fetch: ${response.status}`);
            }
            const rawData = await response.json();

            // Map Airtable fields to our app's internal format
            // n8n returns an array of objects: [{json: {...}}, {json: {...}}]
            const normalizedData = (Array.isArray(rawData) ? rawData : []).map(item => {
                const row = item.json || item; // Fallback if n8n doesn't wrap (rare in prod webhook)
                return {
                    id: item.id || row.id,
                    patente: row.Patente || 'N/A',
                    cliente: row["Nombre y  Apellido"] || 'S/D',
                    marca: row.Marca || '',
                    modelo: row.Modelo || '',
                    seguro: (row.Aseguradora && row.Aseguradora.length > 0) ? row.Aseguradora[0] : 'Particular',
                    estado: row["Estado del Proceso"] || 'Pendiente',
                    precioBase: (row["Precio Base (from Ingreso a)"] && row["Precio Base (from Ingreso a)"].length > 0) ? row["Precio Base (from Ingreso a)"][0] : 0,
                    fechaInspeccion: row.createdTime ? row.createdTime.split('T')[0] : '',
                    tipo: (row["Servicio (from Ingreso a)"] && row["Servicio (from Ingreso a)"].length > 0) ? row["Servicio (from Ingreso a)"][0] : 'Varios',
                    telefono: row.Telefono || '',
                    notas: row["Notas Para presupuestar"] || '',
                    siniestro: row["Numero de Siniestro"] || '',
                    fotos: row["Imageesn del Vehiculo"] || [],
                    descripcion: (row["Description (from Ingreso a)"] && row["Description (from Ingreso a)"].length > 0) ? row["Description (from Ingreso a)"][0] : ''
                };
            });

            return normalizedData;
        } catch (error) {
            console.error('Data Service Error:', error);
            // Return null to signify a connection error in the UI
            return null;
        }
    }
};
