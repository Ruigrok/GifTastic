
//GLOBAL VARIABLES
//================================================

var countries = ["Ireland", "England", "Wales", "Scotland", "United States", "Mexico", "Canada", "PuertoRico",
    "Nicaragua", "Colombia", "Peru", "Ecuador", "Brazil", "Bolivia", "Chile", "China", "Philippines",
    "Thailand", "Cambodia", "Vietnam", "Japan", "Germany", "Denmark", "Sweden", "Norway", "Italy",
    "Belgium", "Spain", "Portugal", "France", "Scotland", "Andorra", "Greece", "Turkey"];


//FUNCTIONS
//================================================

function renderButtons() {
    $('#countryButtons').empty();

    for (var i = 0; i < countries.length; i++) {
        var button = $("<button>");
        button.addClass("button btn-basic");
        button.attr("data-country", countries[i]);
        button.attr("id", "countryButton")
        button.text(countries[i]);

        $('#countryButtons').append(button);
    }
};

$('#addCountry').on("click", function () {
    event.preventDefault();
    var newCountry = $('#countryInput').val().trim();
    countries.push(newCountry);
    $('#countryInput').val("");
    renderButtons();
});

$(document).on("click", '#countryButton', function () {
    event.preventDefault();
    $('#displayGifs').empty();

    var country = $(this).attr("data-country");

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        country + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .done(function (response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    var gifDiv = $("<div>");
                    //gifDiv.addClass("col-md-3")
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var countryImage = $("<img>");

                    countryImage.attr("src", results[i].images.fixed_height_still.url);
                    countryImage.attr("data-state", "still");
                    countryImage.attr("data-animate", results[i].images.fixed_height.url);
                    countryImage.attr("data-still", results[i].images.fixed_height_still.url);
                    countryImage.attr("id", "countryImage")

                    gifDiv.addClass("col-md-6")
                    gifDiv.append(p);
                    gifDiv.append(countryImage);

                    // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                    $('#displayGifs').prepend(gifDiv);
                }
            }
        });
});

$(document).on("click", '#countryImage', function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});



//MAIN PROCESS
//================================================

renderButtons();
















