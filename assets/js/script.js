
// MODEL CODE

// fetch api 

// Function to fetch all meals from TheMealDB API
async function fetchAllMeals() {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      return data.meals;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  }
  
  // Example usage: fetching all meals
  fetchAllMeals()
    .then(meals => {
      if (meals) {
        console.log('All meals:', meals);
        // You can do further processing or display of the fetched data here
      } else {
        console.log('No meals found.');
      }
    })
    .catch(error => console.error('Error:', error));
  


// CONTROLLER CODE

// VIEW CODE