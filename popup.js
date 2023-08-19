//@ts-check

/**
 * Description
 * @param {number} adults
 * @param {number} kids
 * @param {number} slicesPerPizza=10
 * @param {boolean} hungry=false
 * @returns {object}
 */
function calculatePizzasNeeded(adults, kids, slicesPerPizza = 10, hungry = false) {
    // Average slices consumed
    const slicesPerAdult = 3;
    const slicesPerKid = 1.5;

    const hungryBump = 2;

    const calculatedSlicesPerAdult = hungry ? slicesPerAdult * hungryBump : slicesPerAdult;
    const calculatedSlicesPerKid = hungry ? slicesPerKid * hungryBump : slicesPerKid;

    // Calculate total slices needed
    const totalSlices = (adults * calculatedSlicesPerAdult) + (kids * calculatedSlicesPerKid);
    console.log(`total slices is ${totalSlices}`);
    // Calculate pizzas needed
    const pizzasNeeded = Math.ceil(totalSlices / slicesPerPizza);

    return pizzasNeeded;
}

/**
 * Description
 * @param {number} totalPizzas
 * @returns {object}
 */
function pizzaTypeBreakdown(totalPizzas) {
    const plain = Math.ceil(totalPizzas * 0.50) || 0;
    const popular = Math.ceil(totalPizzas * 0.30) || 0;
    const vegetarian = totalPizzas - plain - popular;

    return {
        plain: plain,
        popular: popular,
        vegetarian: vegetarian
    };
}

// Example usage:
const adults = 15;
const kids = 5;
const largePizzaSlices = 10; // For a large pizza

// console.log(`You'll need ${calculatePizzasNeeded(adults, kids, largePizzaSlices)} large pizzas.`);


function getFormData() {
    let form = document.getElementById('pizzaForm');

    // Retrieving the values from within the form context
    // var adultsValue = parseInt(form.elements['adults'].value, 10);
    // const adultsElement = form.elements.namedItem('adults') as HTMLInputElement | null;
    // const adultsValue = adultsElement ? parseInt(adultsElement.value, 10) : 0;


    var adultsValue = parseInt(form.elements['adults'].value, 10) || 0;
    var vegosValue = parseInt(form.elements['vegos'].value, 10) || 0;
    var kidsValue = parseInt(form.elements['kids'].value, 10) || 0;
    var isHungry = form.elements['hungry'].checked;

    // // Now you can use these values as needed
    // console.log(adultsValue, kidsValue, isHungry);

    const formData = { adults: adultsValue, kids: kidsValue, vegos: vegosValue, hungry: isHungry }
    return formData
}

document.getElementById('doSomething').addEventListener('click', function () {
    // alert('Button was clicked!');
    const { adults, kids, vegos, hungry } = getFormData();
    console.info(adults, kids, hungry);

    const pizzaCountText = document.querySelector('#pizzaCountText');
    const pizzaTypeBreakdown = document.querySelector('#pizzaTypeBreakdown');

    const pizzasNeeded = calculatePizzasNeeded(adults, kids, largePizzaSlices, hungry)

    const resultString = `You'll need ${pizzasNeeded} large pizzas.`
    if (pizzaCountText) {
        pizzaCountText.textContent = resultString;
    }
    const { plain, popular, vegetarian } = pizzaTypeBreakdown(pizzasNeeded);

    if (pizzaTypeBreakdown) {
        pizzaTypeBreakdown.innerHTML += `<li class="pizzaBreakdown">${plain} Plain pizzas</li>`;
        pizzaTypeBreakdown.innerHTML += `<li class="pizzaBreakdown">${popular} Popular pizzas</li>`;
        pizzaTypeBreakdown.innerHTML += `<li class="pizzaBreakdown">${vegetarian} Vego pizzas</li>`;

    }








});
