
let meals = JSON.parse(localStorage.getItem("meals")) || [];

function saveMeals() {
  localStorage.setItem("meals", JSON.stringify(meals));
}

document.getElementById("generateBtn").onclick = generateMeals;
document.getElementById("addMealBtn").onclick = () => toggleModal(true);
document.getElementById("closeModalBtn").onclick = () => toggleModal(false);
document.getElementById("addIngredientBtn").onclick = addIngredientField;
document.getElementById("saveMealBtn").onclick = saveNewMeal;

function toggleModal(show) {
  document.getElementById("modal").classList.toggle("hidden", !show);
  if (show) resetModal();
}

function resetModal() {
  document.getElementById("mealNameInput").value = "";
  document.getElementById("ingredientsContainer").innerHTML = "";
}

function addIngredientField() {
  const div = document.createElement("div");
  div.innerHTML = `
    <input class="ing-item" placeholder="Item" />
    <input class="ing-qty" placeholder="Qty" type="number" />
    <input class="ing-unit" placeholder="Unit" />
  `;
  document.getElementById("ingredientsContainer").appendChild(div);
}

function saveNewMeal() {
  const name = document.getElementById("mealNameInput").value;
  const items = [...document.querySelectorAll('.ing-item')];
  const qtys = [...document.querySelectorAll('.ing-qty')];
  const units = [...document.querySelectorAll('.ing-unit')];

  const ingredients = items.map((x, i) => ({
    item: x.value,
    qty: Number(qtys[i].value || 0),
    unit: units[i].value
  }));

  meals.push({ name, ingredients });
  saveMeals();
  toggleModal(false);
}

function generateMeals() {
  const selected = [];
  const used = new Set();

  while (selected.length < 7 && selected.length < meals.length) {
    const random = Math.floor(Math.random() * meals.length);
    if (!used.has(random)) {
      used.add(random);
      selected.push(meals[random]);
    }
  }

  renderMeals(selected);
  generateShoppingList(selected);
}

function renderMeals(list) {
  const container = document.getElementById("mealList");
  container.innerHTML = "";

  list.forEach(meal => {
    const div = document.createElement("div");
    div.className = "meal-item";
    div.textContent = meal.name;
    container.appendChild(div);
  });
}

function generateShoppingList(meals) {
  const list = {};

  meals.forEach(meal => {
    meal.ingredients.forEach(ing => {
      const key = ing.item.toLowerCase();
      if (!list[key]) list[key] = { item: ing.item, qty: ing.qty, unit: ing.unit };
      else list[key].qty += ing.qty;
    });
  });

  renderShoppingList(Object.values(list));
}

function renderShoppingList(items) {
  const ul = document.getElementById("shoppingList");
  ul.innerHTML = "";

  items.forEach(i => {
    const li = document.createElement("li");
    li.textContent = `${i.item}: ${i.qty} ${i.unit}`;
    ul.appendChild(li);
  });
}
