var division = ['Dhaka','Chittagong', 'Khulna', 'Sylhet','Barisal','Rajshahi'];
var idlist = ['photo','mobile','name','email','gender','birthday','occupation','organization','marital_status','blood_group','weight','address','description','area'];

var areaTypes =['division','district','subordinate','branch'];
var selectedArea = [], areaId = 0 , areaTypeId=0, areaType=[];
var id='', token='';
var respons;


$(document).ready(function(){
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

        for(var i=0; i<idlist.length; i++){
            if (idlist[i] in respons['data']){
                if(idlist[i]=='photo'){
                    alert('photo')
                    document.getElementById(idlist[i]).src =user_image_url+respons['data'][idlist[i]];

                }
                else if(idlist[i]=='area'){
                    document.getElementById(idlist[i]).value =respons['data'][idlist[i]];

                    areaId = respons['data']['area_id'];
                }
                else{
                    document.getElementById(idlist[i]).value =respons['data'][idlist[i]];

                }
            }
        }
    }
    catch (e) {
        console.log(e)
    }
});

function activateArea() {
    selectedArea = [];
    areaId = 0;
    areaTypeId=0;
    areaType=[];

    document.getElementById('area').value = '';
    document.getElementById('area').placeholder = 'Select Your Division';
    document.getElementById('selectarea').value = '';
    document.getElementById('selectarea').style.display = 'block';
    document.getElementById('selectarea').placeholder = 'Select Division';
    document.getElementById('data').innerHTML = optionDataGenerator(division);
    areaType = division;
    areaTypeId++;
}


function areaDataFeatch(areaTypes , name, areaTypesNext){
    var request = new XMLHttpRequest();
    var url = project_url+'api/v1/area/'+ areaTypes + '/' + name;
    var method = 'GET'
    var request = httpRequest(method, url, false)

    if(request.status = 200) {
        var tem = JSON.parse(request.response);
        if(selectedArea.length==4){
            var temt= '';
            for(i=3; i>-1; i--){
                temt = temt + selectedArea[i] + ' , ';
            }
            temt = temt + tem['data']['post_code'];
            areaId = tem['data']['id']
            document.getElementById('area').value = temt;
            document.getElementById('selectarea').style.display = 'none';
        }
        else {
            areaType = tem['data'][areaTypesNext];
            return  optionDataGenerator(areaType);
        }
    }
    else{
        alert('something wrong');
        return '<option value= none>';
    }
}

function optionDataGenerator(name) {
    var htmldata = '';
    for(var i=0; name.length>i; i++){
        htmldata = htmldata + "<option value= '"+ name[i] +"'>"
    }
    return htmldata;

}

function addressPickup(){

    var selectedAreaData = document.getElementById('selectarea').value


    if(areaType.indexOf(selectedAreaData)>-1){
        selectedArea[selectedArea.length] =  selectedAreaData;
        document.getElementById('selectarea').style.backgroundColor = '#ffffff';

        var optionList = areaDataFeatch(areaTypes[selectedArea.length-1], selectedAreaData, areaTypes[selectedArea.length]) ;

        document.getElementById('data').innerHTML = optionList;
        document.getElementById('area').placeholder = 'Select Your '+ areaTypes[selectedArea.length].charAt(0).toUpperCase() + areaTypes[selectedArea.length].slice(1);
        document.getElementById('selectarea').placeholder = 'Select '+ areaTypes[selectedArea.length].charAt(0).toUpperCase() + areaTypes[selectedArea.length].slice(1);
        document.getElementById('selectarea').value = '';
    }
    else {
        document.getElementById('selectarea').style.backgroundColor = '#FFA07A';
    }
}

function organizationLoad(){

    var request = new XMLHttpRequest();
    var url = project_url+'api/v1/organizations/';
    var method = 'GET'
    var request = httpRequest(method, url, false)
    var respons = JSON.parse(request.response);
    var options = optionDataGenerator(respons['data']);
    document.getElementById('organizationList').innerHTML = options;

}


function userInformationUpdate(form) {
    event.preventDefault()
    var formData = new FormData($('#updatePhoto')[0]);
    formData.append('area_id',areaId);
    var data = formData;
    var url = project_url+'api/v1/users/'+ id + '/update';
    var request= fileUpload("POST", url, data);
}



