// Run code after DOM rendered.
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

  // Display current time at top of app.
  const fullDateFormatString = 'dddd[,] MMMM D[,] YYYY';
  $('#currentDay').text(now.format(fullDateFormatString));

});