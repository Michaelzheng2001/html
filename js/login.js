LoginURL="https://prod-00.centralus.logic.azure.com/workflows/2cb9baa663c4427d88bf5c82adda839f/triggers/manual/paths/invoke/api/v1_0/user?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Ntk3Ecu9RNqaCMyxa2Bl21JAhJdbOfQCmuq1iXuGSX4"

$(document).ready(function(){
    $("#login").click(function(){
        var data = {
            username: $("#username").val()
        };
        data = JSON.stringify(data)
        $.post({
            url: LoginURL,
            data:data,
            contentType:  'application/json'
        }, function(response){
            password = response.ResultSets.Table1[0].password
            if ($("#password").val() == password){
                window.location.replace("admin.html");
            }
        })
    })

    
})