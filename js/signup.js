ADSUURL = "https://prod-29.uksouth.logic.azure.com:443/workflows/913b613ea7804a7aa903954572d391cc/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=75wf9uI_FWL5oarSBFkG21Y-C8wpTlq7fBxtfHGRkds";
FUURL = "https://prod-15.uksouth.logic.azure.com:443/workflows/e927a68221cf4b10ab0c8eef82eedea5/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=4kpaKA8_O6OwtkWp2SNyFvdrdr_zfIfAhukFE8KVFzQ"


$(document).ready(function(){
    $("#su").click(function(){
        data = {
            username: $("#username").val(),
            password:$("#password").val(),
            name: $("#name").val(),
            phone: $("#phone").val(),
            email: $("#email").val(),
        };
        data = JSON.stringify(data)


        $.ajax({
            type: "post",
            url: FUURL,
            data:data,
            contentType:  'application/json',
            success: function(response){
                if (response.ResultSets.Table1.length ==1 ){
                    $.ajax({
                        type: "post",
                        url: ADSUURL,
                        data:data,
                        contentType:  'application/json',
                        success:function(){
                            alert("sucess!")
                        }
                    })
                }
                else{
                    alert("Please correct your input or sent the request first.")
                }
            }
        })
    })
})