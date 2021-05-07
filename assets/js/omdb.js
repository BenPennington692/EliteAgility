$(document).ready(function(){
            
    var apikey = "44540b01"

    let input = document.getElementById('searchbar');

    $("#movieForm").submit(function(event){
        event.preventDefault()
        var movie = $("#searchbar").val()
        var url = "http://www.omdbapi.com/?apikey="+apikey
        $.ajax({
            method: 'GET',
            url:url+"&t="+movie,
            success:function(data){
                console.log(data)

                result = `

                    <img style="float:left" class="img-thumnail" width="200" height="250" src="${data.Poster}"/> 
                    <p><a href="movie.html">${data.Title}</a></p>
                    `;

            $("#result").html(result);
            }
        })
    })
})