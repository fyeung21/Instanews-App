
const $select = $("#selection"),
    $loading = $(".loading"),
    $storiesGrid = $(".stories-grid"),
    $blockContainer = $(".block-container"),
    $logo = $(".logo"),
    $header = $(".select-container");

$loading.append(`<img class="loading-gif" src="../assets/images/ajax-loader.gif">`);
$loading.hide();

$select.on('change', function () {
    const section = $("#selection option:selected").val();
    $logo.addClass("logo-small");
    $header.addClass("header-slim");
    
    event.preventDefault();
    $.ajax({
        method: "GET",
        dataType: "json",
        url: `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=YUqBlpD8cvotqM6phA6OPbW1Hlm3O07c`,

        beforeSend: function () {
            $loading.show();
        },
        complete: function () {
            $loading.hide();
        }
    })

        .done(function (data) {
            $storiesGrid.html('');
            $.each(data.results, function (key, data) {

                if (key <= 11 && data.multimedia[4].url.length !== 0) {
                    $storiesGrid.append(`<a href="${data.url}"><div class="item" style="background-image: url('${data.multimedia[4].url}')"><p class="abstract">${data.abstract}</p></div></a>`);
                    console.log(data.multimedia[4].url);
                }
            })
        })
        .fail(function () {
            $blockContainer.append("Sorry there was an error.");
        });
});
