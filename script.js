// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  // Get current date/time
  const now = dayjs();

  // Save textarea value in localStorage on save button click.
  $('.saveBtn').click(function (event) {

    const parentDiv = $( this ).parent();
    const idKey = parentDiv.attr('id');
    const textArea = parentDiv.find('textarea');
    const textAreaContent = textArea.val().trim();

    if (textAreaContent) {
      localStorage.setItem(
        idKey,
        JSON.stringify(textAreaContent)
      );
    // If user saves empty string, delete item from localStorage.
    } else {
      localStorage.removeItem(idKey);
    }
  });

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

  // 1. Add 'past', 'present', or 'future' classname to each div.time-block
  // 2. Get content for each child textarea from localStorage if it exists
  $('.time-block').each(function (i) {
    // Get the hour-<num> id of each .time-block div
    const elemId = $( this ).attr('id');
    // textarea child of div.time-block
    const textArea = $( this ).find('textarea');
    // Extract the hour from the id string
    const idHour = parseInt(elemId.split("-")[1], 10);
    // Add 'past', 'present', or 'future' class depeding on current time
    $( this ).addClass(getTimeComparisonClass(idHour));

    // Get saved user content from localStorage
    const storedContent = localStorage.getItem(elemId);
    if (storedContent) {
      textArea.val(JSON.parse(storedContent));
    } else {
      textArea.val('');
    } 

  });

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  // TODO: Add code to display the current date in the header of the page.
  const fullDateFormatString = 'dddd[,] MMMM D[,] YYYY';
  $('#currentDay').text(now.format(fullDateFormatString));
});

