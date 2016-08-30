// create objects for student search section on the top 
var lastSheetIndex = 1;
var numberStudentsPerPage = 10;

// first I create the elemebts on the top. The button and the text area. 
var pageHeader = document.querySelector(".page-header");

var studentSeach = document.createElement("div");
studentSeach.className = "student-search";

var searchInput = document.createElement("input");
searchInput.placeholder = "Search for students..."
searchInput.id = "search"; // I added this ID.

var searchButtton = document.createElement("button");
searchButtton.innerHTML = "Search";


pageHeader.appendChild(studentSeach);
studentSeach.appendChild(searchInput);
studentSeach.appendChild(searchButtton);


// // create objects for pagination pagination buttons on the bottom. 

var page = document.querySelector(".page");

var pagination = document.createElement("div");
pagination.className = "pagination";

var paginationList = document.createElement("ul");
paginationList.id = "buttons";

page.appendChild(pagination);
pagination.appendChild(paginationList);


// Create the list of students. I still don't know what this is called? is it an object? What is it?
// this are global variables which will be used for the list and for buttons. 
var studentListObject = document.querySelectorAll(".student-item");
var numberOfStudents = studentListObject.length;
// this part will go into a function which loops and makes the buttons.


// This is the function which hides the previously unhidden li's and unhides the new li's
var paginate = function(xxxx, startUnhideIndex) {

	var numberOfButtons = Math.ceil(54 / numberStudentsPerPage);
	for (var i = lastSheetIndex; i < lastSheetIndex + numberStudentsPerPage && i < numberOfStudents; i++) {
		studentListObject[i].style.display = "none"
	}

	for (var i = startUnhideIndex; i < startUnhideIndex + numberStudentsPerPage && i < numberOfStudents; i++) {
		studentListObject[i].style.display = "list-item";
	}
	
	lastSheetIndex = startUnhideIndex;
	return numberOfButtons;
}


// this is a function which creates the pagination buttons. 
var createPaginationButtons = function(numberButtons) {
	for (var i = 1; i <= numberButtons; i++) {
		var listItem = document.createElement("li");
		var anchorItem = document.createElement("a");
		if (i === 1){
			anchorItem.className = "active";
		}
		anchorItem.href = "#";
		anchorItem.addEventListener("click", paginationButtonsClicked);
		anchorItem.innerHTML = i;
		paginationList.appendChild(listItem);
		listItem.appendChild(anchorItem);
	}
}

// This is the function which is called when the pagination buttons are clicked. 
var paginationButtonsClicked = function(){
	var startUnhideIndex = (this.innerHTML - 1) * numberStudentsPerPage;
	paginate(studentListObject, startUnhideIndex);
}




// Create variables for the search
var searchField = document.querySelector("#search");

// This sets the event and calls the function. 
searchField.onkeyup  = function(event) {
	mySearchFunction(studentListObject);
}

// // this is the function which creates the object for pagination 


var mySearchFunction =	function(studentListObject){
		for (var i = 0; i < studentListObject.length; i++) {
			var name = studentListObject[i].children['0'].children['1'].innerHTML;
			 console.log(name); // this prints the names to the console, so I know this works. 
		}
		// use logic and regex to remove li's which don't meet search. 
		// I don't know how to do this.
		// Once this studentListObject is reduced, then call line 113 again but with new list
		// I have spent an ENORMOUS amount of time screwing around with this. 
	}




// this start the process
createPaginationButtons(paginate(studentListObject, lastSheetIndex - 1));