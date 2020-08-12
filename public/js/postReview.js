
var idlist = ['title', 'sub_title', 'description', 'address', 'quality', 'mobile', 'post_status', 'post_type', 'post_condition', 'created_at', 'photo', 'area', 'category', 'sub_category', 'name' ]
var id='', token='';
var respons, postId = 2;
var img = 0, imgNumber = 0;

loadData()
function loadData() {
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
        var url = project_url+'api/v1/post/'+ postId +'/details';
        var method= 'GET';
        var data = false;
        var request = httpRequest(method, url, data);
        //alert(request.response)
        respons  = JSON.parse(request.response);
        //alert(respons['data']['id'])

        document.getElementById('postImage').src = respons['data']['photo'][0];
        document.getElementById('comment_user_label').innerHTML = 'Write Somthing About '+ respons['data']['name'];

        document.getElementById('middleRight').innerHTML=' <h4 class="mb-2 border-bottom-line" style="padding: 10px"><a href="#">'+ respons['data']['title']+'</a></h4>\n' +
            ' <h5 class="mb-2 border-bottom-line" style="padding: 10px"><b>Type : </b><a href="#">'+ respons['data']['post_type']+'</a></h5>\n' +
            '                 <h5 class="mb-2 border-bottom-line"  style="padding: 10px"><b>Name : </b><a href="#">'+ respons['data']['name']+'</a></h5>\n' +
            '                 <p class="mb-2 border-bottom-line"  style="padding: 10px"><b>Address : </b>'+ respons['data']['address']+'</p>\n' +
            '                 <p class="mb-2 border-bottom-line"  style="padding: 10px"><b>Area : </b>'+ respons['data']['area']+'</p>\n'+
            '<p class="border-bottom-line" id="category" style="padding: 10px"><b>Category : </b>'+ respons['data']['category']+'</p>\n' +
            '                     <p class="border-bottom-line" id="sub_category" style="padding: 10px"><b>Sub-Category : </b>'+ respons['data']['sub_category']+'</p>\n' +
            '                     <p class="border-bottom-line" id="post_condition" style="padding: 10px"><b>Condition : </b>'+ respons['data']['post_condition']+'</p>\n'


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
            }
            else{
                document.getElementById('mobile').style.display = 'block';
            }
        }else{
            //run code
            document.getElementById('mobile').style.display = 'none';

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

function submitReview() {
    var reviewId = ['comment_post', 'comment_user', 'financial_value', 'quality']
    var data={}

    //data['user_id']=id;
    for(var i=0; i<reviewId.length; i++){
        data[reviewId[i]]=document.getElementById(reviewId[i]).value;
        //alert(data[idlist[i]]);
    }
    data['post_id'] = postId;
    //alert(data);
    var data = JSON.stringify(data);
    var url = project_url+'api/v1/post/'+ postId +'/review/submission';
    var method =  'POST';
    //alert('post')
    var request= httpRequest(method, url, data);
    //alert(request.response)
    postId = JSON.parse(request.response)['data']['id'];
    return false;

}
