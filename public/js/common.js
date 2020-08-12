var id=-1, token='', photo='';


    if(id==-1)
        readCookies()


function readCookies() {
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
        var url = project_url+'api/v1/users/'+ id;
        var method= 'GET';
        var data = false;
        var request = httpRequest(method, url, data);
        //alert(request.response)
        //alert(0)

        respons  = JSON.parse(request.response);
       // alert(document.getElementById('area').value)

        //document.getElementById('area').value =respons['data']['area'];
        //alert(1)

        //document.getElementById('mobile').value =respons['data']['mobile'];
        //alert(2)

        //document.getElementById('address').value =respons['data']['address'];
        //alert(3)

        //areaId = respons['data']['area_id'];
        //alert(1)

    }
    catch (e) {
        console.log(e)
    }
}

function userInformationLoad() {

    try{
        var allCookieArray = document.cookie.split(';');
        for(var i=0; allCookieArray.length>i; i++){
            if(allCookieArray[i].split('=')[0]==' id'){
                id=allCookieArray[i].split('=')[1];
            }
            else if(allCookieArray[i].split('=')[0]==' token'){
                token=allCookieArray[i].split('=')[1];
            }
        }
    }
    catch (e) {
        alert ('alert');
    }

    if(id>0) {
        var url = project_url+'api/v1/users/' + id;
        var method = 'GET';
        var data = false;
        var request = httpRequest(method, url, data);
        var respons = JSON.parse(request.response);
        //if (respons['data']['photo'].length > 1)
            document.getElementById('profilePhoto').src = respons['data']['photo'].length > 1? user_image_url+respons['data']['photo']:project_url+'image/profileImage/avatar.png';

    }
}

function menuLoginButton() {
    if(id>0){
        document.getElementById('loginVisibility').style.display = 'none';
        document.getElementById('profileVisibility').style.display = 'block';
        /* document.getElementById('messageVisibility').style.display = 'block';
        document.getElementById('notificationVisibility').style.display = 'block';*/
    }
    else {
        document.getElementById('loginVisibility').style.display = 'block';
        document.getElementById('profileVisibility').style.display = 'none';
        /*document.getElementById('messageVisibility').style.display = 'none';
        document.getElementById('notificationVisibility').style.display = 'none';*/
    }

}

function logout(){
    var url= project_url+'api/v1/logout/'+id;
    var method = 'GET';
    var data = false;
    var request = httpRequest(method, url, data);
    //alert( request.response)

    var allCookieArray = document.cookie.split(';');
    for(var i=0; allCookieArray.length>i; i++){
        document.cookie = allCookieArray[i].split('=')[0]+'=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
    }

///////here is the problem

    id=-1;
    token='';
    photo='';

    userInformationLoad();

    menuLoginButton()

    //window.location.reload(true);

}

function logoutProfile(){
        //alert(project_url)
    //window.location.href= project_url+'post'
    //return false
    var url= project_url+'api/v1/logout/'+id;
    var method = 'GET';
    var data = false;
    var request = httpRequest(method, url, data);
    //alert( request.response)

    var allCookieArray = document.cookie.split(';');
    for(var i=0; allCookieArray.length>i; i++){
        document.cookie = allCookieArray[i].split('=')[0]+'=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
    }

///////here is the problem

    id=-1;
    token='';
    photo='';

    userInformationLoad();

   // menuLoginButton()

    window.location.href= project_url+'post'

    //window.location.reload(true);

}



function userRegistration(theForm) {
    var time= 0 ;
    try{
        alert(document.querySelector('.messageCheckbox:checked').value)
        (document.querySelector('.messageCheckbox:checked').value)
        time = 60;
    }
    catch (e) {

    }

    var data = JSON.stringify({
        'name' :document.getElementById("r_name").value,
        'email' : document.getElementById("r_email").value,
        'mobile' : document.getElementById("r_mobile").value,
        'password' : document.getElementById("r_password").value,
        'c_password' :document.getElementById("r_c_password").value,
    });

    var request = new XMLHttpRequest();
    request.open("POST", project_url+"api/v1/register", false);
    request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    request.send(data);
    if(request.status = 200) {
        setCookies(request.response);
        document.getElementById("r_password").value= '';
        document.getElementById("r_c_password").value= '';

    }
    //userInformationLoad();
}

function setCookies(data ) {

    var date = new Date();
    date.setTime(date.getTime() + (60*24*60*60*1000));

    var respons  = JSON.parse(data);
    var u_id     = respons['data']['id'];
    var u_name   = respons['data']['name'];
    var u_token  = respons['data']['token'];
    var expires  = date.toUTCString();
    document.cookie = 'name=' + u_name + ";" + "expires=" + expires + ";path=/";
    document.cookie = 'id=' + u_id + ";" + "expires=" + expires + ";path=/";
    document.cookie = 'token=' + u_token + ";" + "expires="+ expires + ";path=/";


    userInformationLoad();
    //window.location.reload(true);

}

function getCookies() {
    var CookieArray = document.cookie.split(';');

    for(var i=0; CookieArray.length>i; i++){
        if(CookieArray[i].split('=')[0]==' id'){
            id=CookieArray[i].split('=')[1];
        }
        else if(CookieArray[i].split('=')[0]==' token'){
            token=CookieArray[i].split('=')[1];
        }
    }

    var CookieArray = document.cookie.split(';');

    for(var i=0; CookieArray.length>i; i++){
        if(CookieArray[i].split('=')[0]==' id'){
            id=CookieArray[i].split('=')[1];
        }
        else if(CookieArray[i].split('=')[0]==' token'){
            token=CookieArray[i].split('=')[1];
        }
    }

}

function userLogin(form) {
    // var checkedValue = document.querySelector('.messageCheckbox:checked').value;
    // New XMLHTTPRequest
    if(document.getElementById("email").value.length >1 && document.getElementById("password").value.length>6){
        var data = JSON.stringify({
            'email' : document.getElementById("email").value,
            'password' : document.getElementById("password").value
        });

        //alert(document.getElementById("email").value)
        var url =  project_url+"api/v1/login";
        var method = 'POST';
        //var data  = false;
        var request = httpRequest(method, url, data)
        if(request.status == 200) {
            setCookies(request.response);
            document.getElementById("email").value = '';
            document.getElementById("password").value= '';
        }
        else{
            alert('Login failed, Try again')
        }
    }
    else{
        alert('Enter Correct Login Data')
    }
}

function httpRequest(method, url, data) {
    var request = new XMLHttpRequest();
    request.open(method, url, false);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", 'Bearer '+token);
    request.send(data);
    return request;
}

function fileUpload(type, url, data) {
    $.ajax({
        type: type,
        url: url,
        beforeSend: function(request) {
            //ADD CUSTOM HEADER HERE
            request.setRequestHeader("Authorization", "Bearer " + token);
        },
        data: data,
        contentType: false, //THIS IS REQUIRED
        processData: false, //THIS IS REQUIRED
        success: function(data){
            //Handle success here
            return(data);
        },
        error: function (xhr, textStatus, error) {
            //Handle error
            return(reject(error));
        }
    });
}
