// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  // Get current date/time
  const now = dayjs();

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  $('.saveBtn').click(function (event) {
    const parentDiv = $( this ).parent();
    const textArea = parentDiv.find('textarea');
    localStorage.setItem(parentDiv.attr('id'), textArea.val().trim());
  })

  // Apply the past, present, or future class to each time
  // block by comparing the id to the current hour.   

  // idHour: number - returns string className
  // one of 'past', 'present', or 'future'
  function getTimeComparisonClass(idHour) {
    
    const nowHour = now.hour(); 
    const divHour = idHour;

    let className = '';
    if (nowHour == divHour) {
      className = 'present';
    } else if (nowHour > divHour) {
      className = 'past';
    } else {
      className = 'future';
    }

    return className;
  }

  // Add 'past', 'present', or 'future' classname to each div.time-block
  $('.time-block').each(function (i) {
    // Get the hour-<num> id of each .time-block div
    const elemId = $( this ).attr('id');
    // Extract the hour from the id string
    const idHour = parseInt(elemId.split("-")[1], 10);

    $( this ).addClass(getTimeComparisonClass(idHour));
  });

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  // TODO: Add code to display the current date in the header of the page.
  const fullDateFormatString = 'dddd[,] MMMM D[,] YYYY';
  $('#currentDay').text(now.format(fullDateFormatString));
});

