const billInput = document.getElementById('bill');
const tipBtns = document.querySelectorAll('.tip-btn');
const customTipInput = document.getElementById('customTip');
const peopleInput = document.getElementById('people');
const tipAmountDisplay = document.getElementById('tipAmount');
const totalAmountDisplay = document.getElementById('totalAmount');
const resetBtn = document.getElementById('reset-btn');
const peopleGroup = peopleInput.closest('.input-group');

let billValue = 0;
let tipPercent = 0;
let peopleValue = 1;

function calculate() {
    // Validate that number of people is greater than zero
    if (peopleValue <= 0) {
        peopleGroup.classList.add('invalid');
        tipAmountDisplay.innerText = "0.00";
        totalAmountDisplay.innerText = "0.00";
        return;
    } else {
        peopleGroup.classList.remove('invalid');
    }

    if (billValue >= 0 && peopleValue > 0) {
        const tipTotal = billValue * (tipPercent / 100);
        const totalBill = billValue + tipTotal;

        const tipPerPerson = tipTotal / peopleValue;
        const totalPerPerson = totalBill / peopleValue;

        // Display results rounded to exactly 2 decimal places
        tipAmountDisplay.innerText = tipPerPerson.toFixed(2);
        totalAmountDisplay.innerText = totalPerPerson.toFixed(2);

        // Enable reset button
        resetBtn.disabled = false;
    }
}

// Input Event Listeners
billInput.addEventListener('input', (e) => {
    billValue = parseFloat(e.target.value) || 0;
    calculate();
});

tipBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Remove active state from other tip buttons
        tipBtns.forEach(b => b.classList.remove('active'));
        customTipInput.value = ''; // Reset custom tip field

        btn.classList.add('active');
        tipPercent = parseFloat(btn.getAttribute('data-tip'));
        calculate();
    });
});

customTipInput.addEventListener('input', (e) => {
    tipBtns.forEach(b => b.classList.remove('active'));
    tipPercent = parseFloat(e.target.value) || 0;
    calculate();
});

peopleInput.addEventListener('input', (e) => {
    peopleValue = parseInt(e.target.value) || 0;
    calculate();
});

// Reset Handler
resetBtn.addEventListener('click', () => {
    billValue = 0;
    tipPercent = 0;
    peopleValue = 1;

    billInput.value = '';
    customTipInput.value = '';
    peopleInput.value = '1';
    
    tipBtns.forEach(b => b.classList.remove('active'));
    peopleGroup.classList.remove('invalid');

    tipAmountDisplay.innerText = "0.00";
    totalAmountDisplay.innerText = "0.00";
    resetBtn.disabled = true;
});