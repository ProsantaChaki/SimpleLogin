var division = ['Dhaka','Chittagong', 'Khulna', 'Sylhet','Barisal','Rajshahi'];
var idlist = [ 'title', 'sub_title', 'description',  'address',  'quality', 'mobile','post_condition',  'post_type', 'financial_value'];
var areaTypes =['division','district','subordinate','branch'];
var selectedArea = [], areaId = 0 , areaTypeId=0, areaType=[], selectedCategory=[], categoryId=0; categoryType=[]
var respons, postId=0;


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
        var url = project_url+'api/v1/users/'+ id;
        var method= 'GET';
        var data = false;
        var request = httpRequest(method, url, data);
        //alert(request.response)
        respons  = JSON.parse(request.response);
        document.getElementById('area').value =respons['data']['area'];
        document.getElementById('mobile').value =respons['data']['mobile'];
        document.getElementById('address').value =respons['data']['address'];
        areaId = respons['data']['area_id'];

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

    document.getElementById('area').value = null;
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

function activateCategory() {
    selectedCategory = [];
    categoryId = 0;
    document.getElementById('category').value = '';
    document.getElementById('category').placeholder = 'Select Appropriate Category';
    document.getElementById('selectcategory').value = '';
    document.getElementById('selectcategory').style.display = 'block';
    document.getElementById('selectcategory').placeholder = 'Select Category';
    document.getElementById('categorylist').innerHTML = categoryDataFeatch('category' , 'category')
}

function categoryDataFeatch(Types , name){
    var url = project_url+'api/v1/category/'+ Types + '/' + name;
    var method = 'GET';
    var request = httpRequest(method, url, false)

    //alert(request.response)

    if(request.status = 200) {
        var tem = JSON.parse(request.response);
        categoryType = tem['data'][Types];
        if(Types=='id'){
            return tem['data'][Types];
        }
        else{
            return  optionDataGenerator(tem['data'][Types]);
        }
    }
    else{
        alert('something wrong');
        return '<option value= none>';
    }
}

function CategoryPickup(){

    var selectedItem = document.getElementById('selectcategory').value;
    var type = '';
    if(selectedCategory.length == 0){
        if(categoryType.indexOf(selectedItem)>-1){

            selectedCategory[selectedCategory.length] = selectedItem;
            type = 'sub_category';
            document.getElementById('selectcategory').style.backgroundColor = '#ffffff';
            document.getElementById('categorylist').innerHTML = categoryDataFeatch(type, selectedItem) ;

            document.getElementById('category').placeholder = 'Select Sub-Category';
            document.getElementById('selectcategory').placeholder = 'Select Sub-Category';
            document.getElementById('selectcategory').value = '';
        }
        else {
            document.getElementById('selectcategory').style.backgroundColor = '#FFA07A';
        }
    }
    else{
        if(categoryType.indexOf(selectedItem)>-1){

            selectedCategory[selectedCategory.length] = selectedItem;
            type = 'id';
            categoryId = categoryDataFeatch(type, selectedItem)[0] ;
            document.getElementById('category').value = selectedCategory;
            document.getElementById('selectcategory').style.display = 'none';
        }
        else {
            document.getElementById('selectcategory').style.backgroundColor = '#FFA07A';
        }

    }

}

function optionDataGenerator(name) {
    var htmldata = '';
    for(var i=0; name.length>i; i++){
        htmldata = htmldata + "<option value= '"+ name[i] +"'>"
    }
    return htmldata;

}


function createPost() {

    //event.preventDefault()
    var formData = new FormData($('#post_create')[0]);
    formData.append('category_id', categoryId);
    formData.append('area_id',areaId)
    var data = formData;
    var url = project_url+'api/v1/post/create';
    //var request= fileUpload("POST", url, data);

    $.ajax({
        type: 'POST',
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
            //return(data);
            console.log(data)
        },
        error: function (xhr, textStatus, error) {
            //Handle error
            console.log(error)

            //return(reject(error));
        }
    });


   // console.log(request)

   // return false;

}

function Validation() {
    if(categoryId==0){
        activateCategory()
    }
    if(areaId==0){
        alert('area need')
        activateArea()
        document.getElementById('selectarea').style.backgroundColor = '#FFA07A';
        document.getElementById('financial_value').value = null

    }

}


