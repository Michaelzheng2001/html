RequestsURL="https://prod-01.uksouth.logic.azure.com/workflows/bbdb5f7d8d264bc3a77abefb491b1bec/triggers/manual/paths/invoke/api/v1_0/requests?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=We-6YwgW_ZGQfsYoFSAQ7pb-gO-3d7_phzplX9L_Nz8"
SubmitURL="https://prod-21.uksouth.logic.azure.com/workflows/440c7ecee56c450c89b0f48c75fedf80/triggers/manual/paths/invoke/api/v1_0/newmovie?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=O1TbZKPtmCJv5te0C12NYG16WUM8p4n7J5xzNi4Zrs8"
AnaURL="https://prod-17.centralus.logic.azure.com:443/workflows/68554eae11ad4daf83a8415fe58fa4a7/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=8ZfXpKLc8ZMFhc-yiobmVAOaPtTKTQ55XLvYQ10ztqk"
Refuse="https://prod-31.centralus.logic.azure.com:443/workflows/0679f0c8a89246cabd0acf31739df4bd/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=XAlYHZiumgpe4ZecaJh1I49EQ9y1LKuQERs71chnX18"

$(document).ready(function(){

    $("#sv").click(function(){
        data = new FormData();
        data.append("name", $("#name").val());
        data.append("director", $("#director").val());
        data.append("writer", $("#writer").val());
        data.append("genre", $("#genre").val());
        data.append("age_rating", $("#age_rating").val());
        data.append('file', $("#file")[0].files[0]);
        $.ajax({
            url: SubmitURL,
            data: data,
            cache: false,
            enctype: 'multipart/form-data',
            contentType: false,
            processData: false,
            type: 'POST',
            seccess: function(){
                alert("sucess!");
            }
        });
    })

    

    $.get(RequestsURL, function(data){
        console.log(data.value)
        var table = "<thead>"+ 
        "<tr>"+
          "<th scope=\"col\">#</th>"+
          "<th scope=\"col\">name</th>"+
          "<th scope=\"col\">email</th>"+
          "<th scope=\"col\">phone</th>"+
          "<th scope=\"col\">reason</th>"+
          "<th scope=\"col\">authorization</th>"+
        "</tr>"+
      "</thead>"+
      "<tbody>";
        for (var key in data.value) {
            console.log(data.value[key]);
            table += ("<tr><td>" +
                data.value[key].id + 
                "</td><td>" +
                data.value[key].name + 
                "</td><td>" +
                data.value[key].email + 
                "</td><td>" +
                data.value[key].phone + 
                "</td><td>" + 
                data.value[key].reason + 
                "</td><td><button type=\"button\" class=\"btn btn-success\" id=\"" + data.value[key].id +"\">yes</button><button type=\"button\" class=\"btn btn-danger\" id=\"" + data.value[key].id +"\">no</button></td></tr>"
                )
        };
        $("#tb").append(table);
        $(".btn-success").click(function(){
            console.log(this.id)
            $.post({
                url: AnaURL,
                data: JSON.stringify({id: this.id}),
                contentType:  'application/json'
            }, function(response){
                window.location.reload();
            })
        })
        $(".btn-danger").click(function(){
            console.log(this.id);
            $.post({
                url: Refuse,
                data: JSON.stringify({id: this.id}),
                contentType:  'application/json'
            }, function(response){
                window.location.reload();
            })
        })

    });

    

})