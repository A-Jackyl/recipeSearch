displayRandomMealCards(6); // Display 6 random meal cards

function fetchMealDetails(mealId) {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.meals) {
                const meal = data.meals[0];
                const mealName = meal.strMeal;
                const mealInstructions = meal.strInstructions;
                const mealIngredients = [];
                const mealImage = meal.strMealThumb;

                for (let i = 1; i <= 20; i++) {
                    const ingredient = meal[`strIngredient${i}`];
                    const measure = meal[`strMeasure${i}`];
                    if (ingredient) {
                        mealIngredients.push(`${measure} ${ingredient}`);
                    } else {
                        break;
                    }
                }
                document.getElementById('recipeImage').src = mealImage;
                document.getElementById('recipeName').textContent = mealName;
                document.getElementById('ingredientsList').innerHTML = '<h3>Ingredienser:</h3>' + mealIngredients.map(ingredient => `<li>${ingredient}</li>`).join('');
                document.getElementById('recipeList').innerHTML = '<h3 class="listTitle">Instruktioner:</h3>' + mealInstructions;

                document.getElementById('fullRecipe').style.display = 'flex';
            } else {
                console.error('Meal details not found.');
            }
        })
        .catch(error => {
            console.error('Error fetching meal details:', error);
        });
}

function displayRandomMealCards(num) {
    const mealCardsContainer = document.getElementById('mealCards');
    mealCardsContainer.innerHTML = ''; // Clear previous cards

    for (let i = 0; i < num; i++) {
        fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
            .then(response => response.json())
            .then(data => {
                const meal = data.meals[0];
                const mealName = meal.strMeal;
                const mealImage = meal.strMealThumb;
                const mealId = meal.idMeal;

                const mealCard = document.createElement('div');
                mealCard.classList.add('recipeCard');
                mealCard.innerHTML = `
                    <img src="${mealImage}" alt="opskrift_billede">
                    <h3>${mealName}</h3>
                    <div class="recipeCardBottom">
                        <img src="assets/svg/star.svg" alt="star">
                        <div class="clickRecipe">
                            Se opskrift
                            <img src="assets/svg/arrow.svg" alt="arrow">
                        </div>
                    </div>`;
                mealCard.addEventListener('click', () => {
                    mealCardsContainer.style.display = 'none';
                    fetchMealDetails(mealId);
                });

                mealCardsContainer.appendChild(mealCard);
            })
            .catch(error => console.error('Error fetching meal:', error));
    }
}

function searchMeal() {
    const searchInput = document.getElementById('searchInput').value.trim();
    if (searchInput === '') {
        document.getElementById('searchedRecipeArray').innerHTML = '';
        displayRandomMealCards(6); // Display random meal cards when search input is cleared
        return;
    }

    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const mealResults = document.getElementById('searchedRecipeArray');
            mealResults.innerHTML = ''; // Clear previous results
            mealResults.style.display = 'grid';
            if (data.meals) {
                data.meals.forEach(meal => {
                    const mealName = meal.strMeal;
                    const mealImage = meal.strMealThumb;
                    const mealId = meal.idMeal;

                    const mealElement = document.createElement('div');
                    mealElement.classList.add('recipeCard');
                    mealElement.innerHTML = `
                    <img src="${mealImage}" alt="opskrift_billede">
                    <h3>${mealName}</h3>
                    <div class="recipeCardBottom">
                        <img src="assets/svg/star.svg" alt="star">
                        <div class="clickRecipe">
                            Se opskrift
                            <img src="assets/svg/arrow.svg" alt="arrow">
                        </div>
                    </div>`;
                    mealElement.addEventListener('click', () => {
                        mealResults.style.display = 'none';
                        fetchMealDetails(mealId);
                    });

                    mealResults.appendChild(mealElement);
                });
            } else {
                mealResults.innerHTML = 'Din søgning fandt ingen opskrift :(';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function clearMealCards() {
    document.getElementById('mealCards').innerHTML = '';
}

document.getElementById('searchInput').addEventListener('input', () => {
    clearMealCards();
    searchMeal();
});

var refreshButton = document.getElementById('recipeGoBack');

refreshButton.addEventListener('click', function () {
    document.getElementById('searchedRecipeArray').style.display = 'grid';
    document.getElementById('fullRecipe').style.display = 'none';
});
