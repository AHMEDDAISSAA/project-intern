const API_URL = "http://localhost:5000/items";

const form = document.getElementById("itemForm");
const input = document.getElementById("itemName");
const list = document.getElementById("itemList");

// Charger et afficher tous les items
async function loadItems() {
  try {
    const response = await fetch(API_URL);
    const items = await response.json();

    list.innerHTML = ""; // vide la liste avant de la reconstruire

    items.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${item.name}</span>
        <button class="delete-btn" data-id="${item.id}">Supprimer</button>
      `;
      list.appendChild(li);
    });
  } catch (error) {
    console.error("Erreur lors du chargement :", error);
  }
}

// Ajouter un item
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // empêche le rechargement de la page

  const name = input.value.trim();
  if (!name) return;

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });

    input.value = ""; 
    loadItems(); 
  } catch (error) {
    console.error("Erreur lors de l'ajout :", error);
  }
});


list.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const id = e.target.dataset.id;

    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      loadItems();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  }
});


loadItems();