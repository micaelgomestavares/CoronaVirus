let select;
let value;
let text;

// Váriaveis que guardam os valores de casos totais e das mortes.
let cases;
let deaths;
let recovered;

//Para mudar as bandeiras dos países.
let countryName;
let countryFlag;

// Váriavel que guarda o gráfico criado.
var myChart;

// Váriavel para desbugar os gráficos
let tam = 0;

$(document).ready(function () {
    catchD();
});

function catchCountryID() {
    fetch(`https://restcountries.eu/rest/v2/name/${countryName}`).then(response => {
        return response.json();
    }).then(function (response) {
        let flag = response.filter(flag => flag.name === text)[0];

        countryFlag = `https://www.countryflags.io/${flag.alpha2Code}/flat/64.png`;

        let container = document.getElementById("img-pais");
        container.innerHTML = `<img src="${countryFlag}" class="float-right">`;
        
    }).catch(function (error) {
        console.log("Houve um erro ao tentar localizar o ALPHA2CODE");
    });
}

function catchD() {
    select = document.getElementById("countrypicker");
    value = select.options[select.selectedIndex].value;
    text = select.options[select.selectedIndex].text;
    onClick();
}

function createChart() {
    myChart = new Chart(document.getElementById("myChart"), {
        type: 'doughnut',
        data: {
            labels: [`Casos Totais`, `Pessoas Mortas`, `Curadas`],
            datasets: [
                {
                    label: "Casos",
                    backgroundColor: ["#3e95cd", "#1C1C1C", "#00ff7f"],
                    data: [cases, deaths, recovered]
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: 'Relação de casos, pessoas mortas e as curadas.'
            }
        }
    });
}

function onClick() {
    fetch("https://coronavirus-19-api.herokuapp.com/countries").then(response => {
        return response.json();
    }).then(function (response) {

        let country = response.filter(country => country.country === text)[0];

        countryName = country.country;
        cases = country.cases;
        deaths = country.deaths;
        recovered = country.recovered;

        tam++;
        if (tam >= 2) {
            myChart.destroy();
        }

        createChart();
        catchCountryID();



    }).catch(function (error) {
        console.log("Ocorreu um erro, não conseguimos pegar os dados corretamente.")
        console.log(error);
        $('#toasthome').toast('show');
    });
}

