
var idlist = ['title', 'sub_title', 'description', 'address', 'quality', 'mobile', 'post_status', 'post_type', 'post_condition', 'created_at', 'photo', 'area', 'category', 'sub_category', 'name' ]

var respons, postId = 4;
var img = 0, imgNumber = 0;

$(document).ready(function() {
    menuLoginButton()

});

loadData()


function loadData() {
    postId = document.getElementById('postId').value;


    try{
        var url = "http://donor.test/api/v1/single/post/"+ postId +"/details";
        var method= 'GET';
        var data = false;
        var request = httpRequest(method, url, data);
        if(request.status==500){
            window.location.replace("http://donor.test/post");
        }
        respons  = JSON.parse(request.response);

        var select = {}
        select[respons['data']['post_status']]= 'selected';
        //alert(respons['data']['post_status'])

        document.getElementById("header").innerHTML='<h3 class="mb-2" id="title" style="color: #1d68a7">'+ respons['data']['title']+'</h3>\n' +
            '             <div class="meta-wrap">\n' +
            '                 <p class="meta">\n' +
            '                     <span id="created_at"><i class="icon-calendar mr-2"></i>'+ respons['data']['created_at']+'</span>\n' +
            '                 </p>\n' +
            '             </div>'

        document.getElementById('middleRight').innerHTML= ' <div>\n' +
            '                   <label class="chosen md-2" style="padding: 10px; padding-bottom: 0px">Status</label>\n'+
            '                   <select id="post_type" onchange="changeStatus('+data['id']+')" class="chosen md-2 form-control border-bottom-line" placeholder="ype of Post" required style="padding: 10px">\n' +
            '                     <option value="Available" '+ select['Available'] +'>Available</option>\n' +
            '                     <option value="Reserved" '+ select['Reserved'] +'>Reserved</option>\n' +
            '                     <option value="Occupied"'+ select['Occupied'] +'>Occupied</option>\n' +
            '                     <option value="Delete" '+ select['Deleted'] +'>Delete</option>\n' +
            '                   </select>\n' +
            '                 </div>'

        document.getElementById('buttomRight').innerHTML=' <h4 class="mb-2 border-bottom-line" style="padding: 10px"><a href="#">'+ respons['data']['post_type']+'</a></h4>\n' +
            '                    <p class="border-bottom-line" id="category" style="padding: 10px"><b>Category : </b>'+ respons['data']['category']+'</p>\n' +
            '                     <p class="border-bottom-line" id="sub_category" style="padding: 10px"><b>Sub-Category : </b>'+ respons['data']['sub_category']+'</p>\n' +
            '                     <p class="border-bottom-line" id="post_condition" style="padding: 10px"><b>Condition : </b>'+ respons['data']['post_condition']+'</p>\n' +
            '                     <p class="border-bottom-line" id="mobile" style="padding: 10px"><b>Mobile : </b>'+ respons['data']['mobile']+'</p>\n' +
            '                     <p class="mb-2 border-bottom-line"  style="padding: 10px">'+ respons['data']['address']+'</p>\n' +
            '                     <p class="mb-2 border-bottom-line"  style="padding: 10px">'+ respons['data']['area']+'</p>'

        document.getElementById('buttomLeft').innerHTML = ' <h4 id="sub_title" style="padding-bottom: 15px">'+ respons['data']['sub_title']+'</h4>\n' +
            '                     <p id="description" style="padding: 10px;">'+ respons['data']['description']+'</p>'

        imgNumber = respons['data']['photo'].length;
        var imgBig = '';
        var imgSmall = '';
        for(var i=0; i<imgNumber; i++){
            imgBig = imgBig + '<img class="mySlides" src="'+ respons['data']['photo'][i]+'"  style="max-height: 450px; width: auto; display:none;margin: auto">\n';
            imgSmall = imgSmall + '<img class="demo w3-opacity w3-hover-opacity-off"  src="'+ respons['data']['photo'][i]+'" style=" height: 70px; width:auto;cursor:pointer;" onclick="currentDiv('+ (i+1)+')">\n'
        }
        document.getElementById('middleLeft').innerHTML = imgBig +'<a class="left carousel-control" onclick="chengeImage(-1)" data-slide="prev">\n' +
            '                    <span class="glyphicon glyphicon-chevron-left"></span>\n' +
            '                    <span class="sr-only">Previous</span>\n' +
            '                </a>\n' +
            '                <a class="right carousel-control" onclick="chengeImage(1)" data-slide="next">\n' +
            '                    <span class="glyphicon glyphicon-chevron-right"></span>\n' +
            '                    <span class="sr-only">Next</span>\n' +
            '                </a>\n' +
            '                <div class="col-md-12 col-sm-12" style="margin: auto; text-align: center; padding: 10px">\n' + imgSmall +
            '                </div>\n' +
            '                \n' +
            '                <div class="range range-primary" style="margin-top: 5px; background-image: linear-gradient(to right, white , #2a62bc);">\n' +
            '                    <input type="range" id="quality-" disabled name="range" min="1" max="10" value="'+ respons['data']['quality'] +'">\n' +
            '                    <output id="quality">'+ respons['data']['quality'] +'</output>\n' +
            '                </div>'

    }
    catch (e) {
        console.log(e)
    }

}




var img = 1, imgNumber = 3;
function chengeImage(side){
    if( img == 1 && side == -1){
        img = imgNumber;
    }
    else if (img == imgNumber && side == 1){
        img = 1;
    }
    else{
        img = img+ side;
    }
    currentDiv(img)
}

currentDiv(img)
function currentDiv(n) {
    imageSlide(slideIndex = n);
    img = n;
}

function imageSlide(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    if (n > x.length) {slideIndex = 1}
    if (n < 1) {slideIndex = x.length}
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" w3-opacity-off", "");
    }
    x[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " w3-opacity-off";
}




