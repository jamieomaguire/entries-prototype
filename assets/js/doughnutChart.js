var CHART = document.getElementById('doughnutChart');

Chart.defaults.global.defaultFontSize = 15;
Chart.defaults.global.defaultFontColor = '#333';
Chart.defaults.global.legend.display = false;

// Chart.defaults.global.legend.position = 'left';
Chart.defaults.global.tooltips.enabled = true;
Chart.defaults.global.elements.arc.borderWidth = 3;

var doughnutChart = new Chart(CHART, {

    type: 'doughnut',
    data: {
        labels: ['Healthy', 'Average', 'Unhealthy'],
        datasets: [
            {
                data: [0,0,0],
                backgroundColor: [
                    '#68D286',
                    '#FBAD2F',
                    '#EB585C'
                ],
                hoverBackgroundColor: [
               '#68D286',
               '#FBAD2F',
               '#EB585C'
           ]
            }
        ]
    },
    options: {
        cutoutPercentage: 50,
        datasetStrokeWidth : 0,
        elements: {
            arc: {
                borderWidth: 2
            }
        }
    }
});

// Grab data to fill Chart

const form = document.forms["food-entry"];
const submitBtn = document.getElementById('submit');
const mealValue = form.elements["foodSelect"];


// data array
var dataArray = doughnutChart.chart.config.data.datasets[0].data;

// bind event
submitBtn.addEventListener('click', submitValue);

function submitValue(){

    var value = mealValue.value;

    switch(value){
        case 'Good':
            dataArray[0] += 100;
            doughnutChart.update();
            break;
        case 'Okay':
            dataArray[1] += 100;
            doughnutChart.update();
            break;
        case 'Bad':
            dataArray[2] += 100;
            doughnutChart.update();
            break;
    }

}
