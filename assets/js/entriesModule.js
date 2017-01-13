// Modular version
var entriesModule = (function(){

  var entries = [];

  const ul = document.querySelector(".entries-list");
  const form = document.forms["food-entry"];
  const deleteBtn = document.querySelectorAll('.deleteBtn');
  const submit = document.getElementById('submit');

  var entryTime = form.elements["foodTime"];
  var entryFood = form.elements["foodMeal"];
  var entryValue = form.elements["foodSelect"];

  // Bind events
  submit.addEventListener('click', addEntry);
  ul.addEventListener('click', deleteEntry);

  // Render all items already on list
  for (let i = 0; i < entries.length; i++){
    render(entries[i]);
  }


  // Render the new entry to the page
  function render(object) {

    var time = object.time;
    var meal = object.meal;
    var value = object.value;

    var li = document.createElement('li');

    li.classList.add('list-item');

    var className = '';

    // Give the value a class depending on how healthy it is
    switch(value){
      case 'Good':
        className = 'good';
        break;
      case 'Okay':
        className = 'okay';
        break;
      case 'Bad':
        className = 'bad';
        break;
      default:
        className = '';
    }

    // Using ES6 Template literals to structure the HTML
    var renderedTime = `<p class="entry-item">${time}</p>`;
    var renderedFood = `<p class="entry-item meal-content">${meal}</p>`;
    var renderedSelect = `<p class="entry-item ${className}">${value}</p>`;
    var renderedDelete = '<i class="icon ion-ios-close-outline"></i>';

    li.innerHTML = renderedTime + renderedFood + renderedSelect + renderedDelete;
    ul.appendChild(li);
    form.reset();
  }

  // Add the entry to the entries array and call the render function
  function addEntry() {
    var addedTime = entryTime.value;
    var addedMeal = entryFood.value;
    var addedValue = entryValue.value;
    var entry = {time: addedTime, meal: addedMeal, value: addedValue};

    entries.push(entry);
    render(entry);
  }

  // Assign the event listener to the parent <ul> and delegate to the <i> tag
  function deleteEntry(el) {
    if(el.target && el.target.nodeName == "I"){
      el.target.parentNode.parentNode.removeChild(el.target.parentNode);
    }
  }

})();
