/**
 * Service to handle data fetching for Taller Isidro Statistics
 * Retrieves records from Airtable via n8n integration.
 */

// Placeholder for the n8n webhook URL mentioned in the initial prompt
const N8N_DATA_URL = 'https://tallerisidro-n8n.6shxj1.easypanel.host/webhook/9b616f6d-415c-4c4b-871b-542ace0b5c22';

export const dataService = {
    /**
     * Fetch all budget records for statistics
     * @returns {Promise<Array>} List of records
     */
    async getStatisticsData() {
        try {
            const response = await fetch(N8N_DATA_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch statistics data');
            }
            const rawData = await response.json();

            // Map Airtable fields to our app's internal format
            const normalizedData = (Array.isArray(rawData) ? rawData : []).map(row => ({
                id: row.id,
                patente: row.Patente || 'N/A',
                cliente: row["Nombre y  Apellido"] || 'S/D',
                marca: '', // Marca doesn't seem to be a top-level field in the current sample
                modelo: '',
                seguro: (row.Aseguradora && row.Aseguradora.length > 0) ? row.Aseguradora[0] : 'Particular',
                estado: row["Estado del Proceso"] || 'Pendiente',
                precioBase: (row["Precio Base (from Ingreso a)"] && row["Precio Base (from Ingreso a)"].length > 0) ? row["Precio Base (from Ingreso a)"][0] : 0,
                fechaInspeccion: row.createdTime ? row.createdTime.split('T')[0] : '',
                tipo: (row["Servicio (from Ingreso a)"] && row["Servicio (from Ingreso a)"].length > 0) ? row["Servicio (from Ingreso a)"][0] : 'Varios'
            }));

            return normalizedData;
        } catch (error) {
            console.error('Data Service Error:', error);
            // Return null to signify a connection error in the UI
            return null;
        }
    }
};
