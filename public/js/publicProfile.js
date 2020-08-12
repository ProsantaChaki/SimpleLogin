
var idlist = ['photo','name','email','gender','birthday','occupation','organization','marital_status','blood_group','weight','description','area'];
var respons, uid= 3;


$(document).ready(function() {
    menuLoginButton()

    uid = document.getElementById('uid').value;

    try{
        var request = new XMLHttpRequest();
        var url = project_url+'api/v1/user/'+ uid+'/profile';
        request.open("GET", url, false);
        request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        request.setRequestHeader("Authorization", 'Bearer '+token);

        request.send();
        respons  = JSON.parse(request.response);

        for(var i=0; i<idlist.length; i++){

            if (idlist[i] in respons['data']){
                if(idlist[i]=='photo'){
                    document.getElementById(idlist[i]).src =respons['data'][idlist[i]];
                }
                else if(idlist[i]=='area'){
                    document.getElementById(idlist[i]).innerHTML =respons['data'][idlist[i]];
                    areaId = respons['data']['area_id'];
                }
                else  if(idlist[i]=='email'){
                    document.getElementById('u_email').innerHTML =respons['data'][idlist[i]];
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


