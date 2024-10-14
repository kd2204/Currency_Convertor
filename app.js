const dropdowns = document.querySelectorAll(".dropdown  select");
const btn = document.querySelector(".btn");
const msg = document.querySelector(".msg");
const fromCurr = document.querySelector(".from select");
const toCurr= document.querySelector(".To select");
const Base_Url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"


for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option")
        newOption.innerText = currCode
        newOption.value = currCode
        if (select.name == "from" && currCode == "USD") {
            newOption.selected = "selected"
        }
        else if (select.name == "to" && currCode == "INR") {
            newOption.selected = "selected"
        }
        select.append(newOption)
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
        // console.log(evt.target.value)
    })
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    const URL = `${Base_Url}/${fromCurr.value.toLowerCase()}.json`
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};


btn.addEventListener('click', (evt) => {
    evt.preventDefault();
    updateExchangeRate();
})
window.addEventListener("load", () => {
    updateExchangeRate();
});