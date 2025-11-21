let meals=[]; const daysOfWeek=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
document.addEventListener("DOMContentLoaded",()=>{loadMeals();
const modal=document.getElementById("mealModal");const addBtn=document.getElementById("addMealBtn");
const closeBtn=document.querySelector(".close");const saveBtn=document.getElementById("saveMealBtn");
addBtn.addEventListener("click",()=>{modal.style.display="block";});
closeBtn.addEventListener("click",()=>{modal.style.display="none";});
window.addEventListener("click",(e)=>{if(e.target==modal)modal.style.display="none";});
saveBtn.addEventListener("click",async()=>{const name=document.getElementById("mealName").value.trim();
const ingredients=document.getElementById("mealIngredients").value.split(",").map(i=>i.trim()).filter(i=>i);
if(!name||ingredients.length===0)return alert("Enter meal name and ingredients!");
await addMeal(name,ingredients); modal.style.display="none";
document.getElementById("mealName").value="";document.getElementById("mealIngredients").value="";});});
async function loadMeals(){const res=await fetch('/.netlify/functions/getMeals');const data=await res.json();
meals=data.map(m=>({id:m.id,name:m.name,ingredients:JSON.parse(m.ingredients)}));}
function generateMealPlan(){const calendarDiv=document.getElementById("mealCalendar");
const shoppingList=document.getElementById("shoppingList");calendarDiv.innerHTML="";shoppingList.innerHTML="";
if(meals.length===0)return;let chosenMeals=[];
for(let i=0;i<7;i++){const meal=meals[Math.floor(Math.random()*meals.length)];chosenMeals.push(meal);
const div=document.createElement("div");div.className="calendar-day";
div.innerHTML=`<strong>${daysOfWeek[i]}</strong><br>${meal.name}`;calendarDiv.appendChild(div);}
let ingredientsMap={};chosenMeals.forEach(meal=>{meal.ingredients.forEach(ing=>{ingredientsMap[ing]=(ingredientsMap[ing]||0)+1;});});
for(const ingredient in ingredientsMap){const li=document.createElement("li");li.textContent=ingredient;
shoppingList.appendChild(li);}}
async function addMeal(name,ingredients){await fetch('/.netlify/functions/addMeal',{method:'POST',
body:JSON.stringify({name,ingredients})});await loadMeals();}