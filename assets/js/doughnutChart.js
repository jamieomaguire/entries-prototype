var CHART = document.getElementById('doughnutChart');

Chart.defaults.global.defaultFontSize = 15;
Chart.defaults.global.defaultFontColor = '#333';
Chart.defaults.global.legend.display = true;
Chart.defaults.global.legend.position = 'bottom';
Chart.defaults.global.tooltips.enabled = true;
Chart.defaults.global.elements.arc.borderWidth = 3;

var doughnutChart = new Chart(CHART, {

    type: 'doughnut',
    data: {
        labels: ['Good', 'Okay', 'Bad'],
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
        datasetStrokeWidth : 5,
        elements: {
            arc: {
                borderWidth: 2
            }
        },
        legend: {
            labels: {
                boxWidth: 20
            }
        }
    }
});

// Grab data to fill Chart

const form = document.forms["food-entry"];
const submitBtn = document.getElementById('submit');
const mealValue = form.elements["foodSelect"];
const ul = document.getElementById('entries');
console.log(ul);
// data array
var dataArray = doughnutChart.chart.config.data.datasets[0].data;

// bind events
submitBtn.addEventListener('click', submitValue);
ul.addEventListener('click', deleteValue);


// Increase the value depending on entry and update the chart
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

// Reduce value if the entry is deleted and update the chart
function deleteValue(el){
    if (el.target && el.target.nodeName == 'I'){

        var el = el.target;

        var value = el.previousSibling;

        if(value.classList.contains('good')){
            dataArray[0] -= 100;
            doughnutChart.update();
        } else if(value.classList.contains('okay')){
            dataArray[1] -= 100;
            doughnutChart.update();
        } else if(value.classList.contains('bad')){
            dataArray[2] -= 100;
            doughnutChart.update();
        }
    }
}
