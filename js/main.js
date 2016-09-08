// Decided to use jQuery after all. Way easier and I don't want to martyr myself over this project. 

// Global Variables
var htmlPage = $(".page");
var numberOfStudentsPerPage = 10;
var nodeUListOfStudents = $(".student-list");
var nodeListOfStudents = $(".student-item");
var arrayListOfStudents = $.makeArray(nodeListOfStudents);

// This function builds the search feature 
var constructSearchFeature = function() {
	$(".page-header").append("<div class='student-search'><input placeholder='Search by name or email...'><button>Search Students</button>");
};

// function to find the number of students that are relevant 
var numberOfStudentsThatMatch = function(arrayListOfStudents){
	return arrayListOfStudents.length;
};

// function which clears the page of all students
var clearPage = function() {
	$(".student-item").remove();
};

// function which clears all the buttons
var clearPaginationButtons = function(){
	$(".pagination").remove();
};

// this is the function which paginates the page
var paginatePage = function(arrayListOfStudents, numberOfStudentsPerPage, currentPage) {
	clearPage();

	var arrayLength = numberOfStudentsThatMatch(arrayListOfStudents);
	for (var i = 0; i < arrayLength; i++){
		nodeUListOfStudents.append($(arrayListOfStudents[i]));
	}
	var firstSliceStart = 0;
	var	firstSliceEnd = (currentPage - 1) * numberOfStudentsPerPage;
	var	showSliceStart = firstSliceEnd;
	var	showSliceEnd = showSliceStart + numberOfStudentsPerPage;
	var	endSliceStart = showSliceEnd;
	var endSliceEnd = arrayListOfStudents.length;

	var startSlice = arrayListOfStudents.slice(firstSliceStart, firstSliceEnd);

		startSlice.forEach(function(student){
			$(student).hide();
		});

	var showSlice = arrayListOfStudents.slice(showSliceStart, showSliceEnd);

		showSlice.forEach(function(student) {
			$(student).show();
		});

	var endSlice = arrayListOfStudents.slice(endSliceStart, endSliceEnd);

		endSlice.forEach(function(student){
			$(student).hide();
		});
};

// This function constructs the pagination buttons on the bottom
var constructPaginationButtons = function(arrayListOfStudents, numberOfStudentsPerPage) {
	clearPaginationButtons();

	var numberOfStudents = numberOfStudentsThatMatch(arrayListOfStudents);
	var numberOfPaginationButtons = Math.ceil(numberOfStudents / numberOfStudentsPerPage);

	if (numberOfPaginationButtons > 1) {	
	htmlPage.append("<div class='pagination'><ul></ul></div>");
	for (var i = 1; i <= numberOfPaginationButtons; i++) {
		$(".pagination").append("<li><a> " + i + " </a></li>");
		
	}
	$(".pagination a").click(paginationclick);
	$(".pagination a:first").addClass("active");
	}

};

// must add variable to pagination Click so it knows which array to add event listener to.
var paginationclick = function() {
	var searchArray = createSearchArray();
	var currentPage = $(this).text();
	$(".pagination li a").removeClass("active");
	$(this).addClass("active");
	paginatePage(searchArray, numberOfStudentsPerPage, currentPage);
};

// this is the keyup function which activates the search
var createSearchArray = function() {
	var searchArray = [];
	var firstNameSearchValue = '^' + $("input").val();
	var lastNameSearchValue = '\\'  + 's' + $("input").val();
	var emailSearchValue = '^' + $("input").val();
	arrayListOfStudents.forEach(function(student){
		
		var nameValue = $(student).find("h3").text().toLowerCase();
		var emailValue = $(student).find("span").text().toLowerCase();
		var firstNamePattern = new RegExp(firstNameSearchValue);
		var lastNamePattern = new RegExp(lastNameSearchValue);
		var emailPattern = new RegExp(emailSearchValue);

		if (firstNamePattern.test(nameValue) || lastNamePattern.test(nameValue) || emailPattern.test(emailValue) || $("input").val() === ""){
			searchArray.push(student);
		}
	});
	return searchArray;
};

// this is the function which runs when the keyup event occurs. 
var keyup = function() {
	var searchArray = createSearchArray();
	paginatePage(searchArray, numberOfStudentsPerPage, 1);
	constructPaginationButtons(searchArray, numberOfStudentsPerPage);
};

// this is the function which runs when the search button is pushed.
var searchButton = function(){
	if ( $("button").text() === "Search Students" ) {
		$("button").text("Quit Search");
		$("input").focus();
	} else {
		$("button").text("Search Students");
		$("input").val("");
		paginatePage(arrayListOfStudents, 10, 1);
		constructPaginationButtons(arrayListOfStudents, numberOfStudentsPerPage);
	}
};

// sets the button when the search field is in focus
var setButton = function(){
	$("button").text("Quit Search");
};

// construct search feature
constructSearchFeature();
// construct the first page
paginatePage(arrayListOfStudents, 10, 1);
// construct the pagination buttons
constructPaginationButtons(arrayListOfStudents, numberOfStudentsPerPage);
// construct the search features

// add event listeners
$("input").keyup(keyup);
$("input").focus(setButton);
$("button").click(searchButton);



