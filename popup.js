//@ts-check

import { hungryBump, pizzaSlices, slicesPerAdult, slicesPerKid } from "./consts.js";

/**
 * Description
 * @param {number} adults
 * @param {number} kids
 * @param {number} slicesPerPizza=10
 * @param {boolean} hungry=false
 * @returns {object}
 */
function calculatePizzasNeeded(adults, kids, slicesPerPizza = 10, hungry = false) {

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
function pizzaTypeBreakdown(totalPizzas, vego = 0) {

    const vegetarianPizzasNeeded = Math.ceil((vego * slicesPerAdult) / pizzaSlices);

    const plain = Math.ceil(totalPizzas * 0.50) || 0;
    const popular = Math.ceil(totalPizzas * 0.30) || 0;
    // const vegetarianStock = Math.max(0, (totalPizzas - plain - popular));
    const vegetarianStock = Math.max(vegetarianPizzasNeeded, totalPizzas - plain - popular);

    if (vegetarianStock > (totalPizzas * 0.20)) {
        return {
            plain: totalPizzas - popular - vegetarianStock,
            popular: popular,
            vegetarian: vegetarianStock
        };
    }


    return {
        plain: plain,
        popular: popular,
        vegetarian: vegetarianStock
    };
}
function getFormData() {
    const form = document.getElementById('pizzaForm');

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

function updatePizzaDisplay() {
    const { adults, kids, vegos, hungry } = getFormData();
    console.info(adults, kids, hungry);

    const pizzaCountText = document.querySelector('#pizzaCountText');
    const pizzaTypesBreakdown = document.querySelector('#pizzaTypesBreakdown');

    const pizzasNeeded = calculatePizzasNeeded(adults, kids, pizzaSlices, hungry)

    const resultString = `You'll want ${pizzasNeeded} large pizzas.`
    if (pizzaCountText) {
        pizzaCountText.textContent = resultString;
    }
    const { plain, popular, vegetarian } = pizzaTypeBreakdown(pizzasNeeded, vegos);

    if (pizzaTypesBreakdown) {
        pizzaTypesBreakdown.innerHTML = "";
        pizzaTypesBreakdown.innerHTML += `<li class="pizzaBreakdown"> ${plain} Plain pizzas</li>`;
        pizzaTypesBreakdown.innerHTML += `<li class="pizzaBreakdown"> ${popular} Popular pizzas</li>`;
        pizzaTypesBreakdown.innerHTML += `<li class="pizzaBreakdown"> ${vegetarian} Vego pizzas</li>`;

    }
}

async function getTab() {
    let queryOptions = { active: true, currentWindow: true };
    let tabs = await chrome.tabs.query(queryOptions);
    return tabs[0].url;
}

document.getElementById('adults').addEventListener('change', updatePizzaDisplay);
document.getElementById('vegos').addEventListener('change', updatePizzaDisplay);
document.getElementById('kids').addEventListener('change', updatePizzaDisplay);
document.getElementById('hungry').addEventListener('change', updatePizzaDisplay);

const tab = await getTab()
const pizzaLogo = document.querySelector('#pizzaLogo');
if (pizzaLogo) {
    pizzaLogo.innerHTML = "";
    if (tab.includes("dominos")) {
        pizzaLogo.innerHTML = `<img src="images/CMYK_Blue_Type_Tile_Only.png"></img>`;    
    }
}

document.getElementById('doSomething').addEventListener('click', async function async() {
    // alert('Button was clicked!');
    updatePizzaDisplay()



    console.log("now what? TODO: check the current website", tab)
    // TODO: Make an array matcher here instead










});
