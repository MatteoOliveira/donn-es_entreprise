require('dotenv').config();
const axios = require('axios');

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

// Fonction pour récupérer les nouveaux messages
async function getUpdates(offset) {
    try {
        const response = await axios.get(`${API_URL}/getUpdates`, {
            params: { offset, timeout: 30 }
        });

        if (response.data.ok) {
            return response.data.result;
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des messages :", error.message);
    }
    return [];
}

// Fonction pour envoyer un message en réponse
async function sendMessage(chatId, text) {
    try {
        await axios.post(`${API_URL}/sendMessage`, {
            chat_id: chatId,
            text: `🤖 Bot: ${text}`
        });
    } catch (error) {
        console.error("Erreur lors de l'envoi du message :", error.message);
    }
}

// Boucle principale du bot
async function runBot() {
    let lastUpdateId = 0;

    console.log("🤖 Bot démarré...");

    while (true) {
        const updates = await getUpdates(lastUpdateId + 1);

        for (const update of updates) {
            if (update.message) {
                const chatId = update.message.chat.id;
                const userMessage = update.message.text;

                console.log(`📩 Message reçu de ${chatId}: ${userMessage}`);

                // Réponse automatique
                await sendMessage(chatId, `Tu as dit : "${userMessage}"`);
            }

            lastUpdateId = update.update_id;
        }
    }
}

// Lancer le bot
runBot();
