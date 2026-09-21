

// Données pour les graphiques
export const lineData = [
  { month: "Jan", articles: 4 },
  { month: "Feb", articles: 6 },
  { month: "Mar", articles: 3 },
  { month: "Apr", articles: 8 },
  { month: "May", articles: 5 },
];

export const barData = [
  { category: "Tech", count: 6 },
  { category: "Design", count: 4 },
  { category: "Actu", count: 3 },
];

export const COLORS = ["#facc15", "#f472b6", "#60a5fa"];

// ✅ Exemple de données venant du backend corrigées
export const articles = [
  {
    id: 1,
    title: "Article 1",
    created_at: new Date().toISOString(),
    category: "Tech",
  },
  {
    id: 2,
    title: "Article 2",
    created_at: new Date().toISOString(),
    category: "Design",
  },
  {
    id: 3,
    title: "Article 3",
    created_at: new Date().toISOString(),
    category: "Actu",
  },
  {
    id: 4,
    title: "Article 4",
    created_at: new Date().toISOString(),
    category: "Business",
  },
  {
    id: 5,
    title: "Article 5",
    created_at: new Date().toISOString(),
    category: "Tech",
  },
  {
    id: 6,
    title: "Article 6",
    created_at: new Date().toISOString(),
    category: "Design",
  },
];

// ✅ Fonction utilitaire pour générer des articles factices
export function generateArticles(count: number) {
  const categories = ["Tech", "Design", "Actu", "Business"];
  const result = [];

  for (let i = 1; i <= count; i++) {
    result.push({
      id: i,
      title: `Article ${i}`,
      created_at: new Date(
        Date.now() - Math.floor(Math.random() * 10000000000)
      ).toISOString(), // date aléatoire dans le passé
      category: categories[Math.floor(Math.random() * categories.length)],
    });
  }

  return result;
}

// Exemple d’utilisation
const fakeArticles = generateArticles(20);
console.log(fakeArticles);
