// localStorage helper function
const storage = {
    set: function(key, value) {
        window.localStorage.setItem( key, JSON.stringify(value) );
    },
    get: function(key) {
        try {
            return JSON.parse( window.localStorage.getItem(key) );
        } catch(e){
            return null;
        }
    }
}


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
                data: [`${storage.get["good"]}`,0,0],
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
                boxWidth: 20,
                padding: 25
            }
        }
    }
});

// Chart Functionality



// Grab data to fill Chart
const form = document.forms["food-entry"];
const submitBtn = document.getElementById('submit');
const mealValue = form.elements["foodSelect"];
const ul = document.getElementById('entries');

// data array
var dataArray = doughnutChart.chart.config.data.datasets[0].data;

if(localStorage['good'] || localStorage['okay'] || localStorage['bad']) {
    dataArray[0] = storage.get('good');
    dataArray[1] = storage.get('okay');
    dataArray[2] = storage.get('bad');
    doughnutChart.update();
} else {
    dataArray[0] = 0;
    dataArray[1] = 0;
    dataArray[2] = 0;
}

// bind events
submitBtn.addEventListener('click', submitValue);
ul.addEventListener('click', deleteValue);

// Increase the value depending on entry and update the chart
function submitValue(){

    var value = mealValue.value;

    switch(value){
        case 'Good':
            // dataArray[0] += 100;
            // doughnutChart.update();

            var number = storage.get('good');
            number += 100;
            storage.set('good', number);
            dataArray[0] = number;
            doughnutChart.update();
            console.log(localStorage['good']);
            break;
        case 'Okay':
            // dataArray[1] += 100;
            // doughnutChart.update();

            var number = storage.get('okay');
            number += 100;
            storage.set('okay', number);
            dataArray[1] = number;
            doughnutChart.update();
            console.log(localStorage['good']);
            break;
        case 'Bad':
            // dataArray[2] += 100;
            // doughnutChart.update();

            var number = storage.get('bad');
            number += 100;
            storage.set('bad', number);
            dataArray[2] = number;
            doughnutChart.update();
            console.log(localStorage['bad']);
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
