const API_URL = "http://localhost:3001/api";

export const getCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/categories`);
    if (!response.ok) throw new Error("Erreur lors de la récupération des catégories");
    return await response.json();
  } catch (error) {
    console.error("Erreur API :", error);
    return [];
  }
};
export const getArtisansByCategorie = async (id) => {
  try {
    const response = await fetch(`${API_URL}/artisans/categorie/${id}`);
    if (!response.ok) throw new Error("Erreur lors de la récupération des artisans");
    return await response.json();
  } catch (error) {
    console.error("Erreur API :", error);
    return [];
  }
};
export const getArtisanById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/artisan/${id}`);
    if (!response.ok) throw new Error("Erreur lors de la récupération de l’artisan");
    return await response.json();
  } catch (error) {
    console.error("Erreur API :", error);
    return null;
  }
};
