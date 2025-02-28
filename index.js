const axios = require('axios');

const TELEGRAM_BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';  // Remplace par ton token
const API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`;

async function getTelegramUpdates() {
    try {
        const response = await axios.get(API_URL);
        console.log("Données reçues :", response.data);
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error.response ? error.response.data : error.message);
    }
}

// Exécuter la fonction pour récupérer les données
getTelegramUpdates();
