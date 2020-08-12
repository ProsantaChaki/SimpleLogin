var division = ['Dhaka','Chittagong', 'Khulna', 'Sylhet','Barisal','Rajshahi'];
var idlist = [ 'title', 'sub_title', 'description', 'area', 'address', 'category', 'quality', 'mobile', 'post_status' , 'post_type', 'financial_value', 'post_condition'];
var areaTypes =['division','district','subordinate','branch'];
var selectedArea = [], areaId = 0 , areaTypeId=0, areaType=[], selectedCategory=[], categoryId=0; categoryType=[]
var respons, postId = 0;

$(document).ready(function() {
    getCookies()
    loadData()

    document.getElementById('pro-image').addEventListener('change', readImage, false);

    $( ".preview-images-zone" ).sortable();

    $(document).on('click', '.image-cancel', function() {
        let no = $(this).data('no');
        $(".preview-image.preview-show-"+no).remove();
    });

});

var num = 4;
function readImage() {
    if (window.File && window.FileList && window.FileReader) {
        var files = event.target.files; //FileList object
        var output = $(".preview-images-zone");

        for (let i = 0; i < files.length; i++) {
            var file = files[i];
            if (!file.type.match('image')) continue;

            var picReader = new FileReader();

            picReader.addEventListener('load', function (event) {
                var picFile = event.target;
                var html =  '<div class="preview-image preview-show-' + num + '">' +
                    '<div class="image-cancel" data-no="' + num + '">x</div>' +
                    '<div class="image-zone"><img id="pro-img-' + num + '" src="' + picFile.result + '"></div>' +
                    '<div class="tools-edit-image"><a href="javascript:void(0)" data-no="' + num + '" class="btn btn-light btn-edit-image">edit</a></div>' +
                    '</div>';

                output.append(html);
                num = num + 1;
            });

            picReader.readAsDataURL(file);
        }
        //$("#pro-image").val('');
    } else {
        console.log('Browser not support');
    }
}

function loadData() {
    postId=document.getElementById('postId').value;
    //alert (postId)

    try{
        var url = project_url+'api/v1/post/user/editview/'+ postId;

        var method= 'GET';
        var data = false;

        var request = httpRequest(method, url, data);

        //alert(request.response)
        respons  = JSON.parse(request.response);
        //alert(respons['data']['id'])
        console.log(respons)


        for(var i = 0; i<idlist.length; i++){
            if(idlist[i]=='photo'){
                //console.log(respons['data'][idlist[i]])

            }else document.getElementById(idlist[i]).value = respons['data'][idlist[i]];
             //alert(idlist[i]+'=>'+respons['data'][idlist[i]])
        }
        document.getElementById('quality_level').innerHTML = document.getElementById('quality').value
        areaId = respons['data']['area_id'];
        categoryId = respons['data']['category_id'];
        //document.getElementById('quality-').value = respons['data']['quality'];

    }
    catch (e) {
        console.log(e)
    }


}
function loadPost(id){

}


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

function updatePost() {
    if(Validation()==0) return false
    postId=document.getElementById('postId').value;

    event.preventDefault()
    var formData = new FormData($('#post_create')[0]);
    formData.append('category_id', categoryId);
    formData.append('area_id',areaId)
    formData.append('id',postId);
    var data = formData;
    var url = project_url+'api/v1/post/update/'+ postId;
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
            //iss= JSON.parse(data)['data'];

            console.log(data)
            $('.toast').toast('show');

            //return(data);
        },
        error: function (xhr, textStatus, error) {
            //Handle error
            console.log(reject(error))
            //return(reject(error));
        }
    });

    return false;

    var data={}
    data['category_id']=categoryId;
    data['area_id'] = areaId;
    data['id'] = postId;
    //data['user_id']=id;
    for(var i=0; i<idlist.length; i++){
        if(idlist[i]!= 'area' && idlist[i]!= 'category'){
            data[idlist[i]]=document.getElementById(idlist[i]).value;
        }
        //alert(data[idlist[i]]);
    }
    //alert(data);
    var data = JSON.stringify(data);
    //alert(data)
    var url = project_url+'api/v1/post/update/'+ postId;
    var method =  'POST';
    var request= httpRequest(method, url, data);
    alert(request.response)
    $('.toast').toast('show');
    postId = JSON.parse(request.response)['data']['id'];
    //alert(postId)
    return false;

}

function Validation() {
    //alert(1)
    if(categoryId==0){
        activateCategory()
        return 0
    }
    if(areaId==0){
        alert('area need')
        activateArea()
        document.getElementById('selectarea').style.backgroundColor = '#FFA07A';
        document.getElementById('financial_value').value = null
        return 0

    }

    return 1;
}
