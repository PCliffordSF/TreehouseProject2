// Decided to use jQuery after all. Way easier and I don't want to martyr myself over this project. 

// Global Variables
var htmlPage = $(".page");
var numberOfStudentsPerPage = 10;
var nodeUListOfStudents = $(".student-list");
var nodeListOfStudents = $(".student-item");
var arrayListOfStudents = $.makeArray(nodeListOfStudents);

// function to find the number of students that are relevant 
var numberOfStudentsThatMatch = function(arrayListOfStudents){
	return arrayListOfStudents.length
}

// function which clears the page of all students
var clearPage = function() {
	$(".student-item").remove();
}

// function which clears all the buttons
var clearPaginationButtons = function(){
	$(".pagination").remove();
}

// this is the function which paginates the page
var paginatePage = function(arrayListOfStudents, numberOfStudentsPerPage, currentPage){
	clearPage();

	var arrayLength = numberOfStudentsThatMatch(arrayListOfStudents);
	for (var i = 0; i < arrayLength; i++){
		nodeUListOfStudents.append($(arrayListOfStudents[i]));
	}
	var firstSliceStart = 0;
	var firstSliceEnd;
	var showSliceStart;
	var showSliceEnd;
	var endSliceStart;
	var endSliceEnd = arrayListOfStudents.length;
	if (currentPage ===  1){
		firstSliceEnd = 0;
		showSliceStart = 0;
		showSliceEnd = numberOfStudentsPerPage;
		endSliceStart = numberOfStudentsPerPage;
	} else {
		firstSliceEnd = (currentPage - 1) * numberOfStudentsPerPage;
		showSliceStart = firstSliceEnd;
		showSliceEnd = showSliceStart + numberOfStudentsPerPage;
		endSliceStart = showSliceEnd;
	}

	var startSlice = arrayListOfStudents.slice(firstSliceStart, firstSliceEnd);

		startSlice.forEach(function(student){
			$(student).hide();
		});

	var showSlice = arrayListOfStudents.slice(showSliceStart, showSliceEnd);

		showSlice.forEach(function(student) {
			$(student).show();
		});

	var endSlice = arrayListOfStudents.slice(endSliceStart, endSliceEnd)

		endSlice.forEach(function(student){
			$(student).hide();
		});
}

// This function constructs the pagination buttons on the bottom
var constructPaginationButtons = function(arrayListOfStudents, numberOfStudentsPerPage) {
	clearPaginationButtons();
	var numberOfStudents = numberOfStudentsThatMatch(arrayListOfStudents);
	var numberOfPaginationButtons = Math.ceil(numberOfStudents / numberOfStudentsPerPage);

	htmlPage.append("<div class='pagination'><ul></ul></div>");
	for (var i = 1; i <= numberOfPaginationButtons; i++) {
		$(".pagination").append("<li><a> " + i + " </a></li>")
		
	}
	$(".pagination a").click(paginationclick);
	$(".pagination a:first").addClass("active");
}

// must add variable to pagination Click so it knows which array to add event listener to.
var paginationclick = function() {
	currentPage = $(this).text();
	$(".pagination li a").removeClass("active");
	$(this).addClass("active");

	paginatePage(arrayListOfStudents, numberOfStudentsPerPage, currentPage);
}

// this is the keyup function which activates the search
var keyup = function() {
	var searchArray = [];
	var counter = 0;
	var searchValue = $(this).val();
	arrayListOfStudents.forEach(function(student){
		var nameValue = $(student).find("h3").text().toLowerCase();
		var emailValue = $(student).find(".email").text().toLowerCase();

		if (nameValue.indexOf(searchValue) !== -1){
			searchArray.push(student)
			counter += 1;
		}

	});

	paginatePage(searchArray, numberOfStudentsPerPage, 1)
	constructPaginationButtons(searchArray, numberOfStudentsPerPage);
}

// construct the first page
paginatePage(arrayListOfStudents, 10, 1);
// construct the pagination buttons
constructPaginationButtons(arrayListOfStudents, numberOfStudentsPerPage);
// construct the search features

// This function builds the search feature 
var constructSearchFeature = function() {
	$(".page-header").append("<div class='student-search'><input placeholder='Search by name or email...'><button>Seach Students</button>");
}

constructSearchFeature();
// add event listener to search field
$("input").keyup(keyup);