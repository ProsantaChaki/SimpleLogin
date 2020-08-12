
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
        var url = project_url+"api/v1/single/post/"+ postId +"/details";
        var method= 'GET';
        var data = false;
        var request = httpRequest(method, url, data);
        if(request.status==500){
            window.location.replace(project_url+"post");
        }
        respons  = JSON.parse(request.response);

        document.getElementById("header").innerHTML='<h3 class="mb-2" id="title" style="color: #1d68a7">'+ respons['data']['title']+'</h3>\n' +
            '             <div class="meta-wrap">\n' +
            '                 <p class="meta">\n' +
            '                     <span id="created_at"><i class="icon-calendar mr-2"></i>'+ respons['data']['created_at']+'</span>\n' +
            '                 </p>\n' +
            '             </div>'

        document.getElementById('middleRight').innerHTML=' <h4 class="mb-2 border-bottom-line" style="padding: 10px"><a href="#">'+ respons['data']['post_type']+'</a></h4>\n' +
            '                 <h5 class="mb-2 border-bottom-line"  style="padding: 10px"><a href="'+project_url+'publicprofile/'+ respons['data']['user_id']+'">'+ respons['data']['name']+'</a></h5>\n' +
            '                 <p class="mb-2 border-bottom-line"  style="padding: 10px">'+ respons['data']['address']+'</p>\n' +
            '                 <p class="mb-2 border-bottom-line"  style="padding: 10px">'+ respons['data']['area']+'</p>'

        document.getElementById('buttomRight').innerHTML='<p class="border-bottom-line" id="category" style="padding: 10px"><b>Category : </b>'+ respons['data']['category']+'</p>\n' +
            '                     <p class="border-bottom-line" id="sub_category" style="padding: 10px"><b>Sub-Category : </b>'+ respons['data']['sub_category']+'</p>\n' +
            '                     <p class="border-bottom-line" id="post_condition" style="padding: 10px"><b>Condition : </b>'+ respons['data']['post_condition']+'</p>\n' +
            '                     <p class="border-bottom-line" id="post_status" style="padding: 10px"><b>Status : </b>'+ respons['data']['post_status']+'</p>\n' +
            '                     <p class="border-bottom-line" id="mobile" style="padding: 10px; display: none"><b>Mobile : </b>'+ respons['data']['mobile']+'</p>\n' +
            '                     <p class="border-bottom-line" style="padding: 10px; display: none"><b style="background-color: #fde300 ">Please Login </b></p>\n' +
            '                     <div class="border-bottom-line" style="padding: 5px">\n' +
            '                         <p style="padding-left: 5px">\n' +
            '                             <span> <b style="padding-right: 5px">I am </b> </span>\n' +
            '                             <input type="checkbox"  data-toggle="toggle" id="interest" data-on="Interested" data-off="Not Interested" data-onstyle="success" data-offstyle="primary ">\n' +
            '                         </p>\n' +
            '                     </div>'

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
$("#interest")
    .change(function(){
        if($(this).prop("checked") == true){
            //run code
            if(id>0){
                document.getElementById('mobile').style.display = 'block';
                var data={};
                data['post_id'] = postId;
                data['interested'] = 1;
                var data = JSON.stringify(data);

                var url = project_url+'api/v1/post/user/activities'
                var request = httpRequest('POST', url, data);
                //alert(request.response)
            }
            else{
                $('#login').modal('show');

            }
        }else{
            //run code

            if(id>0){
                document.getElementById('mobile').style.display = 'block';
                var data={};
                data['post_id'] = postId;
                data['interested'] = 0;
                var data = JSON.stringify(data);

                var url = project_url+'api/v1/post/user/activities'
                var request = httpRequest('POST', url, data);
                //alert(request.response)
            }
            document.getElementById('mobile').style.display = 'none';
        }

    });

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




