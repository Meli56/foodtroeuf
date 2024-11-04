// seedData.js
const axios = require('axios');

// URL de base de l'API
const API_URL = 'http://localhost:8000'; // Assure-toi que l'URL est correcte

// Données de test
const sampleMenuItems = [
  {
    name: 'Burger Classique',
    description: 'Un burger délicieux avec viande fraîche, salade et tomate.',
    price: 8.99,
    category: 'Burgers',
  },
  {
    name: 'Pizza Margherita',
    description: 'Une pizza classique avec sauce tomate, mozzarella, et basilic.',
    price: 12.5,
    category: 'Pizzas',
  },
  {
    name: 'Salade César',
    description: 'Salade César avec poulet, laitue, croûtons, et sauce César.',
    price: 7.99,
    category: 'Salades',
  },
  {
    name: 'Frites Maison',
    description: 'Frites faites maison croustillantes et dorées.',
    price: 3.5,
    category: 'Accompagnements',
  },
];

async function seedMenuItems() {
  try {
    console.log('Ajout des éléments de menu à l’API...');
    
    // Ajoute chaque élément de menu à l’API
    for (const item of sampleMenuItems) {
      const response = await axios.post(`${API_URL}/menus`, item);
      console.log(`Ajouté: ${response.data.name}`);
    }

    console.log('Données de menu ajoutées avec succès !');
  } catch (error) {
    console.error('Erreur lors de l’ajout des données :', error.message);
  }
}

// Exécute le script de seed
seedMenuItems();
