let select;
let value;
let text;

// Váriaveis que guardam os valores de casos totais e das mortes.
let cases;
let deaths;
let recovered;
let todayCases;

//Para mudar as bandeiras dos países.
let countryName;
let countryFlag;

// Váriavel que guarda o gráfico criado.
var myChart;

// Váriavel para desbugar os gráficos
let amount = 0;

$(document).ready(function () {
    catchD();
});


function catchD() {
    select = document.getElementById("countrypicker");
    value = select.options[select.selectedIndex].value;
    text = select.options[select.selectedIndex].text;
    onClick();
}


function catchCountryID() {
    fetch(`https://restcountries.eu/rest/v2/name/${countryName}`).then(response => {
        return response.json();
    }).then(function (response) {
        let flag = response.filter(flag => flag.name === text)[0];

        countryFlag = `https://www.countryflags.io/${flag.alpha2Code}/flat/64.png`;

        let container = document.getElementById("img-pais");
        container.src = `${countryFlag}`;

    }).catch(function (error) {
        console.log(`Houve um erro ao tentar localizar o Alphs2Code do país: ${countryName}`);
        container.src = `img/coronavirus.png`;
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
        todayCases = country.todayCases;

        amount++;

        if (amount >= 2) {
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

let covidData = [
    {
        value: cases,
        color: "#3e95cd"
    },
    {
        value: deaths,
        color: "#1C1C1C"
    },
    {
        value: recovered,
        color: "#00ff7f"
    },
    {
        value: todayCases,
        color: "#bd353b"
    }
]

function createChart() {
    Chart.defaults.global.elements.rectangle.borderWidth = 0;
    myChart = new Chart(document.getElementById("myChart"), {
        type: 'doughnut',
        data: {
            labels: [`Casos Totais`, `Mortes`, `Curadas`, `Casos Hoje`],
            datasets: [
                {
                    label: "Casos",
                    backgroundColor: [covidData[0].color, covidData[1].color, covidData[2].color, covidData[3].color],
                    borderColor: "#373757",
                    data: [cases, deaths, recovered, todayCases]
                }
            ]
        },
        options: {
            legend: {
                labels: {
                    fontColor: 'white',
                    fontFamily: 'Montserrat',
                    borderColor: 'black'
                }
            }
        },
        animation: {
            tension: {
                duration: 1000,
                easing: 'linear',
                from: 1,
                to: 0,
                loop: true
            }
        }
    });
}
