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
        container.src = `${countryFlag}`;

    }).catch(function (error) {
        console.log(`Houve um erro ao tentar localizar o Alphs2Code do país: ${countryName}`);
        container.src = `img/coronavirus.png`;
    });
}

function catchD() {
    select = document.getElementById("countrypicker");
    value = select.options[select.selectedIndex].value;
    text = select.options[select.selectedIndex].text;
    onClick();
}

function createChart() {
    Chart.defaults.global.elements.rectangle.borderWidth = 0;
    myChart = new Chart(document.getElementById("myChart"), {
        type: 'doughnut',
        data: {
            labels: [`Casos Totais`, `Pessoas Mortas`, `Curadas`, `Casos Hoje`],
            datasets: [
                {
                    label: "Casos",
                    backgroundColor: ["#3e95cd", "#1C1C1C", "#00ff7f", "#bd353b"],
                    borderColor: "#373757",
                    data: [cases, deaths, recovered, todayCases]
                }
            ]
        },
        options: {
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        return tooltipItem.yLabel.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                    }
                }
            },
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    fontColor: 'white',
                    fontFamily: 'Montserrat',
                    borderColor: 'black'
                }
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
        todayCases = country.todayCases;

        console.log(formatNumber(country.cases));

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

