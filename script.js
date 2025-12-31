let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const currencyUnits = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.1,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100
};

document.getElementById("purchase-btn").addEventListener("click", () => {
  const cash = parseFloat(document.getElementById("cash").value);
  const changeDue = document.getElementById("change-due");

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (cash === price) {
    changeDue.textContent = "Status: EXACT_PAYMENT: No change due.";
    return;
  }

  let changeToGive = parseFloat((cash - price).toFixed(2));
  const originalCID = JSON.parse(JSON.stringify(cid));
  let changeArray = [];

  const reversedCID = cid.slice().reverse();

  for (let [unit, amount] of reversedCID) {
    let unitValue = currencyUnits[unit];
    let amountAvailable = parseFloat(amount);
    let amountToReturn = 0;

    while (changeToGive >= unitValue && amountAvailable >= unitValue) {
      changeToGive = parseFloat((changeToGive - unitValue).toFixed(2));
      amountAvailable = parseFloat((amountAvailable - unitValue).toFixed(2));
      amountToReturn += unitValue;
    }

    if (amountToReturn > 0) {
      changeArray.push([unit, parseFloat(amountToReturn.toFixed(2))]);
    }
  }

  const totalChange = changeArray.reduce((acc, curr) => acc + curr[1], 0);
  const totalCID = originalCID.reduce((acc, curr) => acc + curr[1], 0);

  if (changeToGive > 0) {
    changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
  } else if (parseFloat(totalChange.toFixed(2)) === parseFloat(totalCID.toFixed(2))) {
    let result = "Status: CLOSED";
    changeArray = originalCID;
    for (let [unit, amt] of changeArray) {
      if (amt > 0) {
        result += ` ${unit}: $${amt.toFixed(2)}`;
      }
    }
    changeDue.textContent = result;
  } else {
    let result = "Status: OPEN";
    for (let [unit, amt] of changeArray) {
      result += ` ${unit}: $${amt.toFixed(2)}`;
    }
    changeDue.textContent = result;
  }
});








