
$select = $("#selection");


$select.on('change', function () {
    const section = $("#selection option:selected").val();

    event.preventDefault();
    $.ajax ({
        method: "GET",
        dataType: "json",
        url: `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=YUqBlpD8cvotqM6phA6OPbW1Hlm3O07c`

    }).done(function(data) { 
        $.each(data.results, function (key, data) {
            console.log(data.abstract);
            $(".block-container").append('<img src="' + data.multimedia[4].url + '">');
            $(".item").append(`<p>${data.abstract}</p>`)
        })
    })
    .fail(function () {
        $(".block-container").append("Sorry there was an error.");
    });
});