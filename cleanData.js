const data = [
    { id: 1, name: "  Alice  ", email: "ALICE@example.com", age: 25 },
    { id: 2, name: "BOB", email: "bob@example.com", age: null },
    { id: 3, name: "Alice", email: "alice@example.com", age: 25 }, // Doublon
    { id: 4, name: "charlie", email: "charlie@domain", age: 30 },  // Email invalide
];

// Fonction pour nettoyer les données
function cleanData(rawData) {
    const cleanedData = [];
    const seenEmails = new Set(); // Pour éviter les doublons

    rawData.forEach(item => {
        let name = item.name.trim().toLowerCase();
        name = name.charAt(0).toUpperCase() + name.slice(1); // Capitaliser la 1ère lettre

        let email = item.email.trim().toLowerCase();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.warn(`❌ Email invalide détecté : ${email}`);
            return;
        }

        if (seenEmails.has(email)) {
            console.warn(`⚠️ Doublon ignoré : ${email}`);
            return;
        }
        seenEmails.add(email);

        if (item.age === null || item.age <= 0) {
            console.warn(`⚠️ Âge incorrect pour ${name}, valeur ignorée.`);
            item.age = "Non spécifié";
        }

        cleanedData.push({ ...item, name, email });
    });

    return cleanedData;
}

// Exécution du nettoyage
const cleanedData = cleanData(data);
console.log("✅ Données nettoyées :", cleanedData);
