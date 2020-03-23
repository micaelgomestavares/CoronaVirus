let select;
let value;
let text;

// Váriaveis que guardam os valores de casos totais e das mortes.
let cases;
let deaths;
let recovered;

// Váriavel que guarda o gráfico criado.
var myChart;

// Váriavel para desbugar os gráficos
let tam = 0;

$(document).ready(function () {
    catchD();
});

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

        cases = country.cases;
        deaths = country.deaths;
        recovered = country.recovered;

        tam++;

        if (tam >= 2) {
            myChart.destroy();
        }
        createChart();


    }).catch(function (error) {
        console.log("Ocorreu um erro, não conseguimos pegar os dados corretamente.")
        console.log(error);
        $('#toasthome').toast('show');
    });
}

