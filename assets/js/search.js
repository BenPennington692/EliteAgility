$(document).ready(function () {

	var apikey = "c406f281";
	$("#search-form").submit(function(e) {
		e.preventDefault()
		var result = ""
		var url = "http://www.omdbapi.com/?apikey="+apikey

		// searchbar
		var movie = $("#searchbar").val()
		// shrink size of search area to make room below
		$("#searcharea").css("bottom", "60%")
		// bring top of result DIV higher to meet search area
		$("#result").addClass('showResult')
		$(".main-banner .caption").addClass('singlePage')

		$.ajax({
			method:'GET',
			url:url+"&t="+movie,
			success:function(data){ 
				console.log(data); 
				result = `
				<img src="${data.Poster}" width="100%" height="auto" style="float:left" class="img-th poster" />
				<div id="movie-info">
					<h2>${data.Title}</h2>
					<h3>${data.Released}</h3>
					<h3>${data.Runtime}</h3>
					<h3>${data.Genre}</h3>
					<h3>${data.Director}</h3>
					<h3>${data.Actors}</h3>
				</div>
				`
				$("#result").empty().append(result)
				
			}
		})
	})
});

$( function() {
	var cats = ['leadactor', 'supportactor', 'leadactress', 'supportactress', 'animatedfilm', 'cinematography',
	'costumes', 'directing', 'featuredoc', 'shortdoc', 'filmediting', 'foreign', 'makeup',
	'originalmusic', 'originalsong', 'bestpicture', 'production', 'animatedshort', 'liveshort',
	'soundediting', 'soundmixing', 'visualfx', 'adaptedwriting', 'originalwriting'];
	$( "#searchbar" ).autocomplete({
		source: cats
	});
	} );