$(document).ready(function () {
	var apikey = "c406f281";


	$("#search-form").submit(function(e) {
		e.preventDefault()
		var result = ""
		var url = "http://www.omdbapi.com/?apikey="+apikey
		var movie = $("#searchbar").val()
		$("#searcharea").css("bottom", "50%")
		$("#result").addClass('showResult')
		$.ajax({		
			method:'GET',
			url:url+"&t="+movie,
			success:function(data){ 
				console.log(data); 
				result = `
				<img src="${data.Poster}" width="100%" height="auto" style="float:left" class="img-th poster" />
				<h2>${data.Title}</h2>
				<h3>${data.Released}</h3>
				<h3>${data.Runtime}</h3>
				<h3>${data.Genre}</h3>
				<h3>${data.Director}</h3>
				<h3>${data.Actors}</h3>
				`
				$("#result").empty().append(result)
				
			}
		})
	})
});