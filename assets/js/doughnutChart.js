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
                data: [`${storage.get["good"]}`,`${storage.get["okay"]}`,`${storage.get["bad"]}`],
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
const resetBtn = document.getElementById('reset');

// data array
var dataArray = doughnutChart.chart.config.data.datasets[0].data;

if(localStorage['good']){
    dataArray[0] = storage.get('good');
    doughnutChart.update();
} else {
    dataArray[0] = 0;
    doughnutChart.update();
}

if(localStorage['okay']) {
    dataArray[1] = storage.get('okay');
    doughnutChart.update();
} else {
    dataArray[1] = 0;
    doughnutChart.update();
}

if(localStorage['bad']){
    dataArray[2] = storage.get('bad');
    doughnutChart.update();
} else {
    dataArray[2] = 0;
    doughnutChart.update();
}

// bind events
submitBtn.addEventListener('click', submitValue);
ul.addEventListener('click', deleteValue);
resetBtn.addEventListener('click', clearStorage);

// clear localStorage and remove all entries
function clearStorage(){
    const timeCount = document.getElementById('timeCharCount');
    const foodCount = document.getElementById('foodCharCount');
    if(confirm('Do you want to reset your chart and delete all previous entries?')){
        localStorage.clear();
        dataArray[0] = 0;
        dataArray[1] = 0;
        dataArray[2] = 0;
        doughnutChart.update();
        form.reset();
        timeCount.innerText = '';
        foodCount.innerText = '';
        while(ul.firstChild){
            ul.removeChild(ul.firstChild);
        }
    }
}


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
            console.log('value of Good is ' + localStorage['good']);
            break;
        case 'Okay':
            // dataArray[1] += 100;
            // doughnutChart.update();

            var number = storage.get('okay');
            number += 100;
            storage.set('okay', number);
            dataArray[1] = number;
            doughnutChart.update();
            console.log('value of Okay is ' + localStorage['okay']);
            break;
        case 'Bad':
            // dataArray[2] += 100;
            // doughnutChart.update();

            var number = storage.get('bad');
            number += 100;
            storage.set('bad', number);
            dataArray[2] = number;
            doughnutChart.update();
            console.log('value of Bad is ' + localStorage['bad']);
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
            var newGood = storage.get('good');
            newGood -= 100;
            storage.set('good', newGood);
            doughnutChart.update();
        } else if(value.classList.contains('okay')){
            dataArray[1] -= 100;
            var newOkay = storage.get('okay');
            newOkay -= 100;
            storage.set('okay', newOkay);
            doughnutChart.update();
        } else if(value.classList.contains('bad')){
            dataArray[2] -= 100;
            var newBad = storage.get('bad');
            newBad -= 100;
            storage.set('bad', newBad);
            doughnutChart.update();
        }
    }
}
