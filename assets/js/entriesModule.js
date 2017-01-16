var entriesModule = (function(){

  var entries = [];

  const ul = document.querySelector(".entries-list");
  const form = document.forms["food-entry"];
  const deleteBtn = document.querySelectorAll('.deleteBtn');
  const submit = document.getElementById('submit');

  const entryTime = form.elements["foodTime"];
  const entryFood = form.elements["foodMeal"];
  const entryValue = form.elements["foodSelect"];
  const timeCount = document.getElementById('timeCharCount');
  const foodCount = document.getElementById('foodCharCount');

  // Bind events
  submit.addEventListener('click', addEntry);
  ul.addEventListener('click', deleteEntry);
  entryTime.addEventListener('keydown', charCount);
  entryFood.addEventListener('keydown', charCount);

  // Check if localStorage has any entries to render
  // **** EXTREMELY MESSY CODE THAT MUST BE SORTED ****
  if (Object.keys(localStorage)){

      // create an array of the localStorage object keys
      const array = [].slice.call(Object.keys(localStorage));
      let entriesArray = [];

      // Only keep the object keys that are an entry as opposed to a chart value
      for (let i = 0; i < array.length; i++){
          if (array[i] !== 'good' && array[i] !== 'okay' && array[i] !== 'bad'){
              entriesArray.push(array[i]);
          }

      }

      // Sort the array of entries by time by comparing to a Data object
      // 2017/01/16 is an arbitrary date
      entriesArray.sort(function (a, b) {
        return new Date('2017/01/16 ' + a) - new Date('2017/01/16 ' + b);
      });

      // loop over each array item and get the entry from localStorage so it becomes
      // an object again
      for (let i = 0; i < entriesArray.length; i++){
          if (localStorage.hasOwnProperty(entriesArray[i])){
              // render the stored entries
              const storedEntry = storage.get(entriesArray[i]);
              render(storedEntry);
          }

      }

  }

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
    li.setAttribute('data-id', time);

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
    storage.set(entry.time, entry);
    timeCount.innerText = '';
    foodCount.innerText = '';
    render(entry);
  }

  // Assign the event listener to the parent <ul> and delegate to the <i> tag
  function deleteEntry(el) {
    if(el.target && el.target.nodeName == "I"){
        // grab data attribute to delete entry from localStorage
        const attributesArray = [].slice.call(el.target.parentNode.attributes);
        const id = attributesArray[1].value;

        // test localStorage for an entry matching the data-id
        if (localStorage.hasOwnProperty(id)){
            storage.delete(id);
        }

        // delete the node
        el.target.parentNode.parentNode.removeChild(el.target.parentNode);
        console.log(localStorage);
    }
  }

  function charCount(e){
      const el = e.target;
      const countType = el.parentNode.lastChild.id;
      if (countType === 'timeCharCount'){
          const limit = 5;
          timeCount.innerText = limit - el.value.length -1;
          if (timeCount.innerText == limit - limit) {
              timeCount.classList.add('warning');
          } else {
              timeCount.classList.remove('warning');
          }
      } else if (countType === 'foodCharCount'){
          const limit = 100;
          foodCount.innerText = limit - el.value.length -1;
          if (foodCount.innerText == limit - limit) {
              foodCount.classList.add('warning');
          } else {
              foodCount.classList.remove('warning');
          }
      }
  }

})();
