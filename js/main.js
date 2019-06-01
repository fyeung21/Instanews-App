
const $select = $("#selection");
const $storiesGrid = $(".stories-grid");
const $item = $(".item");


$select.on('change', function () {
    const section = $("#selection option:selected").val();

    event.preventDefault();
    $.ajax ({
        method: "GET",
        dataType: "json",
        url: `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=YUqBlpD8cvotqM6phA6OPbW1Hlm3O07c`

    }).done(function(data) { 
        $storiesGrid.html('');
        $item.html('');
        $.each(data.results, function (key, data) {
            console.log(data.url);
            $storiesGrid.append(`<a href="${data.url}"><img src=" ${data.multimedia[4].url}"></a>`);
            $item.append(`<p>${data.abstract}</p>`)
        })
    })
    .fail(function () {
        $(".block-container").append("Sorry there was an error.");
    });
});