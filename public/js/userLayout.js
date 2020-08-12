window.onload = function(){
    serverPostRequest();
    menuLoginButton();
};
userInformationLoad();

//document.getElementById("fname").onchange = function() {myFunction()};


var filter = {
    sort:[],
    type:[],
    category: [],
    sub_category:[],
    division:[],
    district:[]
}
$(window).resize(function(){
    if($(window).width()<769){
        document.getElementById("myNavbar").style.marginTop = '56px';
    }
    else {
        document.getElementById("myNavbar").style.marginTop = '0px';

    }
});

$("#sortby")
    .change(function(){
        filter['sort'] = document.getElementById('sortby').value;
        //alert(filter['sort'])
        serverPostRequest();
    });

$("#typeof")
    .change(function(){
        filter['type']=$('input[name="typeofvalue"]:checked', '#typeof').val();
        serverPostRequest();
        //alert(filter['type'])
    });

$("#category")
    .change(function(){
        var categories = [];
        $(':checkbox:checked').each(function(i){
            categories[i] = $(this).val();
        });
        if(categories.length==0){
            filter['sub_category'] = [];
        }
        filter['category']=categories;
        var data ={'category': categories}
        //alert(data['category']);
        var data = JSON.stringify(data);
        var url =  project_url+"api/v1/subcategory";
        var request = httpRequest('POST', url, data);
        //alert(request.response)
        var sub_category = JSON.parse(request.response);
        //alert(request.response);
        var htmldata = '';
        for(var i=0; sub_category['data']['sub_category'].length>i; i++){
            htmldata = htmldata + "<option value= '"+ sub_category['data']['sub_category'][i] +"'>"+ sub_category['data']['sub_category'][i] +"</option>"
        }
        document.getElementById('sub_category').innerHTML = htmldata;
        serverPostRequest();
    });

$("#sub_category")
    .change(function(){
        filter['sub_category'] = document.getElementById('sub_category').value;
        serverPostRequest();
    });

$("#division")
    .change(function(){
        filter['district'] = ''
        filter['division'] = document.getElementById('division').value;
        var url = project_url+'api/v1/area/division/' + document.getElementById('division').value;
        var request = httpRequest('GET', url, false);
        var district = JSON.parse(request.response);
        var htmldata = '<option value="0">Please select</option>';
        for(var i=0; district['data']['district'].length>i; i++){
            htmldata = htmldata + "<option value= '"+ district['data']['district'][i] +"'>"+ district['data']['district'][i] +"</option>"
        }
        document.getElementById('district').innerHTML = htmldata;
        //alert ('division')
        serverPostRequest();
    });

$("#district")
    .change(function(){
        filter['district'] = document.getElementById('district').value;
        serverPostRequest();

    });

function serverPostRequest() {
    var method = 'POST';
    var url = project_url+'api/v1/all/post';
    var data = JSON.stringify(filter);
    var request = httpRequest(method, url , data);
    var data = JSON.parse(request.response);
    var htmlData = '';
    for(var i = 0; i<data[0]['data'].length; i++){
        htmlData = htmlData + htmlPostDataGenerator(data[0]['data'][i])
    }
    var pagination = paginationGenarator(data[0])
    document.getElementById('posts').innerHTML = htmlData + pagination;
    //alert(data[0]['data'])
}

function getPostData(url) {
    url = project_url+'api/v1/all/post?page='+ url;
    var data = JSON.stringify(filter);

    //alert(url)
    var request = httpRequest('POST', url, data);
    var data = JSON.parse(request.response);
    var htmlData = '';
    for(var i = 0; i<data[0]['data'].length; i++){
        htmlData = htmlData + htmlPostDataGenerator(data[0]['data'][i])
    }
    //alert(htmlData)
    var pagination = paginationGenarator(data[0])
    document.getElementById('posts').innerHTML = htmlData + pagination;

}

function htmlPostDataGenerator(data) {
    //alert(data['id'])
    var html = '<div class="col-md-12 col-sm-12 ftco-animate d-md-flex w3-light-grey" style="margin-bottom: 10px; padding-top: 10px; padding-bottom: 10px" >\n' +
        '                <div  class="col-xl-4 col-lg-4 col-md-4 col-sm-4 " style="alignment: left">\n' +
        '                    <a href="#" class="img img-2">\n' +
        '                        <img src='+ data['photo'][0] +' style=" max-width: 200px; max-height:170px;">\n' +
        '                    </a>\n' +
        '                </div>\n' +
        '                <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8" style="alignment: right;">\n' +
        '                    <h4 class="mb-2"><a href="'+project_url+'postview/'+ data['id']+'" name="title">'+ data['title']+'</a></h4>\n' +
        '                    <div class="text text-2 pl-md-4">\n' +
        '                        <p class="mb-4" name="sub_title">'+ data['sub_title']+'</p>\n' +
        '                        <div class="meta-wrap">\n' +
        '                            <p class="meta">\n' +
        '                                <span name="date"><i class="icon-calendar mr-2"></i>'+ data['created_at']+'</span>\n' +
        '                                <span class="text-primary" style="font-weight: bold" name="type"><i class="mr-2 "></i>'+ data['post_type']+'</span>\n' +
        '                            </p>\n' +
        '                        </div>\n' +
        '                        <p class="mb-4" name="area">'+ data['area']+'</p>\n' +
        '                        <div class="meta-wrap">\n' +
        '                            <label class="text-primary" name="status" >'+ data['post_status']+'</label>\n' +
        '                            <label style="float: right; display: block" name><i class="fa fa-heart-o" style="font-size:24px;" ></i></label>\n' +
        '                            <label style="float: right; display: none "><i class="fa fa-heart" style="font-size:24px; color: blueviolet"></i></label>\n' +
        '\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n'
    return html;
}


function navMargin() {
    if($(window).width()<769){
        document.getElementById("myNavbar").style.marginTop = '56px';
    }
}
// Script to open and close sidebar when on tablets and phones
function sideBar() {
    if(document.getElementById("mySidebar").style.display == "block"){
        w3_close()
    }
    else{
        w3_open()
    }
}

function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}


