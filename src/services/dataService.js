/**
 * Service to handle data fetching for Taller Isidro Statistics
 * Retrieves records from Airtable via n8n integration.
 */

// Placeholder for the n8n webhook URL mentioned in the initial prompt
const N8N_DATA_URL = 'https://n8n.tallerisidro.cloud/webhook/estadisticas';

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
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Data Service Error:', error);
            // Return empty array to prevent UI crash, plus some mock data for development if needed
            return [];
        }
    }
};
