var idlist = ['photo','mobile','name','email','gender','birthday','occupation','organization','marital_status','blood_group','weight','address','description','area'];
var id='', token='', respons;


$(document).ready(function() {
    var CookieArray = document.cookie.split(';');

    for(var i=0; CookieArray.length>i; i++){
        if(CookieArray[i].split('=')[0]==' id'){
            id=CookieArray[i].split('=')[1];
        }
        else if(CookieArray[i].split('=')[0]==' token'){
            token=CookieArray[i].split('=')[1];
        }
    }
    try{
        var request = new XMLHttpRequest();
        var url = project_url+'api/v1/users/'+ id;
        request.open("GET", url, false);
        request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        request.setRequestHeader("Authorization", 'Bearer '+token);

        request.send();
        respons  = JSON.parse(request.response);
        console.log(respons)

        for(var i=0; i<idlist.length; i++){

            if (idlist[i] in respons['data']){
                if(idlist[i]=='photo'){
                   // alert(respons['data'][idlist[i]])
                    document.getElementById(idlist[i]).src =user_image_url+respons['data'][idlist[i]];
                }
                else if(idlist[i]=='area'){
                    document.getElementById(idlist[i]).innerHTML =respons['data'][idlist[i]];
                    areaId = respons['data']['area_id'];
                }
                else{
                    document.getElementById(idlist[i]).innerHTML =respons['data'][idlist[i]];
                }
            }
        }
    }
    catch (e) {
        console.log(e)
    }
});

if($(window).width()>768){
    var x = document.getElementsByClassName("info");
    for(var i=0; i<x.length;i++){
        x[i].style.width = '325px';

        //x[i].style.margin = '15px';

    }
}
if($(window).width()<769 & $(window).width()>500){
    var x = document.getElementsByClassName("info");
    for(var i=0; i<x.length;i++){
        x[i].style.width =($(window).width()-190)+'px';
    }
}
