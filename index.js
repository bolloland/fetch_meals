// ## First challenge:

// 1. create a search from that allows a user to input a query term
// 2. give the search form an id that will be used to select the element
// 3. when the form is submitted, fetch the meals given the query term
// 4. Append the results as list items to the meals container div. Each `li` should be clickable
BASE_URL = "https://www.themealdb.com/api/json/v1/1/"

const mealsList = document.getElementById('meals')
const mealsDetails = document.getElementById('meals-details')
const searchForm = document.getElementById('search-form')
const searchQuery = document.getElementById('query')


const fetchMeals = (event) => {
event.preventDefault()
mealsList.innerHTML = ""
let query = event.target[0].value
fetch(`${BASE_URL}search.php?s=${query}`)
.then(resp => resp.json())
.then(data => data.meals.map(meal => renderMeal(meal)))
searchForm.reset() 
} 
searchForm.addEventListener('submit', fetchMeals) 

const renderMeal = (meal) => {
    mealsList.innerHTML += `<li>${meal.strMeal} 
    <button id = "recipe" value = ${meal.idMeal}>Details</button></li>`
    const recipeButtons = document.querySelectorAll("#recipe")
    recipeButtons.forEach(recipe => recipe.addEventListener('click', fetchOneMeal)) 
}

const fetchOneMeal = (e) => {
    e.preventDefault()
    mealsList.innerHTML = ""
    let mealId = e.target.value
    fetch(`${BASE_URL}lookup.php?i=${mealId}`)
    .then(resp => resp.json())
    .then(data => renderDetails(data.meals[0]))
}

const renderDetails = (d) => {
    
    mealsDetails.innerHTML = `<h4>${d.strMeal}</h4></br>
    <img src="${d.strMealThumb}"></br>
    <a href="${d.strYoutube}">YouTube Link for ${d.strMeal}</a>`
}

// www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
// www.themealdb.com/api/json/v1/1/lookup.php?i=52772

// ## Second Challenge 

// 1. Create a div called 'meals-details'
// 2. When a list item is clicked, fetch the meal with the id 
// 3. Update the meals-details div with the details of the meal that was clicked