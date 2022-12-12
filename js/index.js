FindMoviesURL = "https://prod-02.uksouth.logic.azure.com/workflows/d03b448f3b91447ea1839141868b16ab/triggers/manual/paths/invoke/api/v1_0/movies?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=4iDy6MKuPXnOSMEz6v01K9qtUKnijaQ8VmgX_86rAic";

SubmitRequestURL = "https://prod-26.uksouth.logic.azure.com/workflows/3ebbd658dfa64a079791b59614c5317e/triggers/manual/paths/invoke/api/v1_0/join?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=A5-Mfdpwby10BdxLPJaA0_ufRiOLIbne2eNliXjuFEo"

BlobURL = "https://mtlkmovies.blob.core.windows.net"


$(document).ready(function(){
    $.get(FindMoviesURL, function(data){
        console.log(data.value)
        for (var key in data.value) {
            console.log(data.value[key]);
            $("#movie").append("<li class=\"playlist-number\"><div class=\"song-info\"><h4>" +
                data.value[key].name + 
                "</h4><p><strong>Director</strong>: " +
                data.value[key].director + 
                "&nbsp;|&nbsp; <strong>Writer</strong>: " +
                data.value[key].writer + 
                "&nbsp;|&nbsp; <strong>Genre</strong>: " + 
                data.value[key].genre + 
                "&nbsp;|&nbsp;<strong>Age rating</strong>: PG-13 </p>&nbsp;</div><div class=\"music-icon\"><a href="+
                BlobURL + data.value[key].url + 
                "><i class=\"fa fa-play\"></i></a><a href=\"#\"><i class=\"fa fa-pause\"></i></a></div><div class=\"clearfix\"></div></li>")
        }
    });

    $("#sr").click(function(){
        var data = {
            name: $("#name").val(), 
            email: $("#email").val(), 
            phone: $("#phone").val(),
            reason: $("#message").val()
        };
        
        console.log(data);
        data = JSON.stringify(data);
        $.post({
            url: SubmitRequestURL, 
            data: data,
            contentType:  'application/json'
        }, function(){
            alert("Application submitted successfully!")
        });
    });
})