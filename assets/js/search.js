$(document).ready(function() {

    var apikey = "c406f281";
    $("#search-form").submit(function(e) {
        e.preventDefault()
        var result = ""
        var url = "http://www.omdbapi.com/?apikey=" + apikey

        // searchbar
        var movie = $("#searchbar").val()
            // shrink size of search area to make room below
        $("#searcharea").css("bottom", "60%")
            // bring top of result DIV higher to meet search area
        $("#result").addClass('showResult')
        $(".main-banner .caption").addClass('singlePage')

        $.ajax({
            method: 'GET',
            url: url + "&t=" + movie,
            success: function(data) {
                var imdburl = "HTTPS://imdb.com/title/" + data.imdbID,
                    result = `
				<header class = "Title">
            <h1>${data.Title}</h1>
        </header>
				<div clss="container">
					<div class = "row content float-container">
						<div class = "col-lg-3">
							<img src="${data.Poster}" width="100%" height="auto" class="left-container img-th poster" />
						</div>
						<div class = "col-lg-5" middle-container>
								<h2 class = "section-title">
										<u>Movie Details:</u>
								</h2>
								<h3 class = "info">
										<em>Release Date:</em> ${data.Released}
								</h3>
								<h3 class = "info">
										<em>Runtime:</em> ${data.Runtime}
								</h3>
								<h3 class = "info">
										<em>Genre:</em> ${data.Genre}
								</h3>
								<h3 class = "info">
										<em>Directors:</em> ${data.Director}
								</h3>
								<h3 class = "info">
										<em>Actors:</em> ${data.Actors}
								</h3>
								<h3 class = "info">
										<em>IMDB Rating:</em> ${data.imdbRating}
								</h3>
								<h3 class = "info">
										<em>Awards:</em> ${data.Awards}
								</h3>
								<h3 class = "info">
										<em>IMDB:</em> <a href="${imdburl}" target="_blank" class="imdblink"> This is the movie link </a>
								</h3>
						</div>
						<div class="col-lg-3 right-container" id="plot">
						<h2 class="section-title">Plot</h2>
								${data.Plot}
						</div>
					</div>
				</div>
				`
                $("#result").empty().append(result)
								resultsFix();

            }
        })
    })
});

// Window Resize Mobile Menu Fix
$(window).on('resize', function() {
	resultsFix();
});

function resultsFix() {
	var resultBottom = $('#result').height();
	$('#about').css({"position":"absolute", "top":resultBottom+200})
}