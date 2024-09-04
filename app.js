const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json";

const dropdowns = document.querySelectorAll(".fromDropdown select, .toDropdown select");
// console.log(dropdowns);
// for(let country in countryList){
//   console.log(country);
// }

const changeFlag=(e)=>{
  let country = e.value;
  let imgCode = countryList[country];
  let imgSource = `https://flagsapi.com/${imgCode}/flat/64.png`;
  let img= e.parentElement.querySelector("img");
  img.src= imgSource;
};

for(let select of dropdowns){
  for(country in countryList){
    let newCurr = document.createElement("option");
    newCurr.innerText=country;
    newCurr.value = country;
    select.append(newCurr);
    if(select.name==="fromSelect" && country ==="USD"){
      newCurr.selected="selected";
    }
    else if(select.name==="toSelect" && country ==="BDT"){
      newCurr.selected="selected";
    }
  }
  select.addEventListener("change",(e)=>{
    changeFlag(e.target);
  });
}

let convertButton= document.querySelector(".convertButton");
let fromCurr = document.querySelector(".fromDropdown select")
let toCurr = document.querySelector(".toDropdown select")

convertButton.addEventListener("click",(e)=>{
  e.preventDefault();
  convert();
});
window.addEventListener("load", () => {
  convert();
});

const output=document.querySelector(".output");
const amount = document.querySelector(".amount input");
const convert = async () => {
  let amountValue = parseFloat(amount.value);
  if(isNaN(amountValue)|| amountValue<0){
    amountValue=0.00;
  }
  let fromVal = fromCurr.value.toLowerCase();
  let toVal = toCurr.value.toLowerCase();
  const URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json";
  let response = await fetch(URL);
  let data = await response.json();
  if(fromVal==="usd"){
    let rate= data.eur[toVal];
    const result = amountValue * rate;
    output.innerText = `${amountValue} ${fromCurr.value} = ${result.toFixed(4)} ${toCurr.value}`;
  } 
  else{
    let rate1= data.eur[fromVal];
    let valueUS = amountValue/rate1;
    let rate2= data.eur[toVal];
    const result = valueUS*rate2;
    output.innerText = `${amountValue} ${fromCurr.value} = ${result.toFixed(4)} ${toCurr.value}`;
  }  
};

amount.addEventListener("input", (e) => {
  e.preventDefault();
});

let exchangeButton = document.querySelector(".exchange");
exchangeButton.addEventListener("click",(e)=>{
  e.preventDefault();
  console.log(toCurr.value);
  let temp = toCurr.value;
  toCurr.value = fromCurr.value;
  fromCurr.value = temp;
  changeFlag(fromCurr);
  changeFlag(toCurr);
  convert();
});
  

