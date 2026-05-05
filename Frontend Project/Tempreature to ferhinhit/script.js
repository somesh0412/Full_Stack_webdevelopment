const tempInput = document.getElementById('tempInput');
const unitInput = document.getElementById('unitInput');

const celsiusOutput = document.getElementById('celsiusOutput');
const fahrenheitOutput = document.getElementById('fahrenheitOutput');
const kelvinOutput = document.getElementById('kelvinOutput');

function convertTemperature() {
    const inputValue = parseFloat(tempInput.value);

    // If input is empty or invalid, clear output displays
    if (isNaN(inputValue)) {
        celsiusOutput.innerText = "--";
        fahrenheitOutput.innerText = "--";
        kelvinOutput.innerText = "--";
        return;
    }

    const currentUnit = unitInput.value;
    let celsius = 0;

    // 1. Convert any incoming unit to Celsius as the base
    if (currentUnit === "C") {
        celsius = inputValue;
    } else if (currentUnit === "F") {
        celsius = (inputValue - 32) * (5 / 9);
    } else if (currentUnit === "K") {
        celsius = inputValue - 273.15;
    }

    // 2. Convert Celsius base to Fahrenheit and Kelvin
    const fahrenheit = (celsius * (9 / 5)) + 32;
    const kelvin = celsius + 273.15;

    // 3. Render outputs to exactly 2 decimal places
    celsiusOutput.innerText = `${celsius.toFixed(2)} °C`;
    fahrenheitOutput.innerText = `${fahrenheit.toFixed(2)} °F`;
    kelvinOutput.innerText = `${kelvin.toFixed(2)} K`;
}

// Attach event listeners for real-time conversion
tempInput.addEventListener('input', convertTemperature);
unitInput.addEventListener('change', convertTemperature);

// Run on page load to initialize output values
convertTemperature();