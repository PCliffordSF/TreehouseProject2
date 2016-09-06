// Decided to use jQuery after all. Way easier and I don't want to martyr myself over this project. 

// Global Variables
var htmlPage = $(".page");
var numberOfStudentsPerPage = 10;
var nodeUListOfStudents = $(".student-list");
var nodeListOfStudents = $(".student-item");
var arrayListOfStudents = $.makeArray(nodeListOfStudents);



// function to find the number of students that match
var numberOfStudentsThatMatch = function(arrayListOfStudents){
	return arrayListOfStudents.length
}

// function which clears the page of all students
var clearPage = function(nodeListOfStudents) {
	$(".student-item").remove();
}

clearPage(nodeListOfStudents);

var hideWhatIsNotOnPage = function(arrayListOfStudents, numberOfStudentsPerPage, currentPage){
	for (var i = 0; i < arrayListOfStudents.length; i++){
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

			console.log("first slice");
			$(student).hide();

		});
	var showSlice = arrayListOfStudents.slice(showSliceStart, showSliceEnd);

		showSlice.forEach(function(student) {
			console.log("show slice");
			$(student).show();

		});
	var endSlice = arrayListOfStudents.slice(endSliceStart, endSliceEnd)

		endSlice.forEach(function(student){
			console.log("end slice");
			$(student).hide();

		});
}

hideWhatIsNotOnPage(arrayListOfStudents, 10, 1);




// This function constructs the pagination buttons on the bottom

var constructPaginationButtons = function(arrayListOfStudents, numberOfStudentsPerPage) {
	
	var numberOfStudents = numberOfStudentsThatMatch(arrayListOfStudents);
	var numberOfPaginationButtons = Math.ceil(numberOfStudents / numberOfStudentsPerPage);

	htmlPage.append("<div class='pagination'><ul></ul></div>");
	for (var i = 1; i <= numberOfPaginationButtons; i++) {
		$(".pagination").append("<li><a> " + i + " </a></li>")
		
	}
	$(".pagination a").click(paginationclick);
	$(".pagination a:first").addClass("active");
}

var paginationclick = function() {
	currentPage = $(this).text();
	$(".pagination li a").removeClass("active");
	$(this).addClass("active");

	hideWhatIsNotOnPage(arrayListOfStudents, numberOfStudentsPerPage, currentPage);
}

// This function builds the search feature 

var constructSearchFeature = function() {
	$(".page-header").append("<div class='student-search'><input placeholder='Search by name or email...'><button>Seach Students</button>");

}

var revealSearch = function() {
	console.log("clicked");
	console.log($(".page-header .student-search input"));
}



constructPaginationButtons(arrayListOfStudents, numberOfStudentsPerPage);
constructSearchFeature();

$("button").click(revealSearch);


// this is the keyup function which activates the search
var keyup = function() {
	var searchValue = $(this).val();
	console.log(searchValue);
	var searchArray = [];
	arrayListOfStudents.forEach(function(student){
		var nameValue = $(student).find("h3").text().toLowerCase();
		var emailValue = $(student).find(".email").text().toLowerCase();
		console.log(nameValue);
		console.log(emailValue);
		if (nameValue.indexOf(searchValue) !== -1){
			console.log("found");
		}
	})
	
}

$("input").keyup(keyup);
