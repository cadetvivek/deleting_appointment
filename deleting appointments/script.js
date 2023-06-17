// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault();

  // Get form values
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var number = document.getElementById('number').value;

  // Create data object
  var data = {
    name: name,
    email: email,
    number: number
  };

  // Get existing data from local storage
  var existingData = JSON.parse(localStorage.getItem('formData')) || [];

  // Add new data to existing data
  existingData.push(data);

  // Store updated data in local storage
  localStorage.setItem('formData', JSON.stringify(existingData));

  // Clear form inputs
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('number').value = '';

  // Refresh data list
  displayData();
}

// Function to display data from local storage
function displayData() {
  var dataList = document.getElementById('dataList');
  dataList.innerHTML = '';

  // Get data from local storage
  var storedData = JSON.parse(localStorage.getItem('formData')) || [];

  // Iterate over stored data and create list items
  storedData.forEach(function(item, index) {
    var li = document.createElement('li');
    li.innerHTML = `
      <span><strong>Name:</strong> ${item.name}</span><br>
      <span><strong>Email:</strong> ${item.email}</span><br>
      <span><strong>Phone:</strong> ${item.number}</span><br>
      <button class="editButton" data-index="${index}">Edit</button>
      <button class="deleteButton" data-index="${index}">Delete</button>
    `;
    dataList.appendChild(li);
  });

  // Add event listeners to edit and delete buttons
  var editButtons = document.getElementsByClassName('editButton');
  var deleteButtons = document.getElementsByClassName('deleteButton');

  for (var i = 0; i < editButtons.length; i++) {
    editButtons[i].addEventListener('click', handleEdit);
    deleteButtons[i].addEventListener('click', handleDelete);
  }
}

// Function to handle edit button click
function handleEdit(event) {
  var index = event.target.getAttribute('data-index');

  // Get stored data
  var storedData = JSON.parse(localStorage.getItem('formData')) || [];

  // Get data for the selected index
  var selectedData = storedData[index];

  // Set form inputs with selected data
  document.getElementById('name').value = selectedData.name;
  document.getElementById('email').value = selectedData.email;
  document.getElementById('number').value = selectedData.number;

  // Remove the selected data from the stored data
  storedData.splice(index, 1);

  // Update the stored data in local storage
  localStorage.setItem('formData', JSON.stringify(storedData));

  // Refresh data list
  displayData();
}

// Function to handle delete button click
function handleDelete(event) {
  var index = event.target.getAttribute('data-index');

  // Get stored data
  var storedData = JSON.parse(localStorage.getItem('formData')) || [];

  // Remove the selected data from the stored data
  storedData.splice(index, 1);

  // Update the stored data in local storage
  localStorage.setItem('formData', JSON.stringify(storedData));

  // Refresh data list
  displayData();
}

// Function to handle delete all button click
function handleDeleteAll() {
  // Clear the local storage
  localStorage.removeItem('formData');

  // Refresh data list
  displayData();
}

// Add event listener to form submission
document.getElementById('myForm').addEventListener('submit', handleSubmit);

// Add event listener to delete all button
document.getElementById('deleteAll').addEventListener('click', handleDeleteAll);

// Display existing data on page load
displayData();