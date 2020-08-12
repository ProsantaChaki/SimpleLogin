function paginationGenarator(data) {
    var currentPagenumber = data['current_page'];
    var lastPagenumber = data['last_page'];
    var url1= data['first_page_url'];
    var firstPage ='<li class="page-item" ><a class="page-link" onclick= "getPostData(1)">1</a></li>\n';
    var lastPage ='<li class="page-item" ><a class="page-link" onclick= "getPostData('+lastPagenumber+')" >'+lastPagenumber+'</a></li>\n';
    var previousPage ='<li class="page-item"><a class="page-link"  onclick= "getPostData('+(currentPagenumber-1)+')">'+(currentPagenumber-1)+'</a></li>\n';
    var nextPage ='<li class="page-item" ><a class="page-link" onclick= "getPostData('+(currentPagenumber+1)+')">'+(currentPagenumber+1)+'</a></li>\n';
    var currentPage ='<li class="page-item active"><a class="page-link">'+currentPagenumber+'</a></li>\n';
    var empty = '<li class="page-item" style="border: none;"><a class="page-link" style="border: none; margin: 0px; padding-left: 0px; padding-right: 3px"> . . . . </a></li>\n';
    var htmlBefore ='<div class="col-md-12 col-sm-12 ftco-animate d-md-flex " style="padding-top: 10px; text-align: center;" >\n <ul class="pagination">\n';
    var htmlAfter = '</ul>\n </div>';

    var htmlRespons = '';

    if(lastPagenumber==1){
        htmlRespons = htmlBefore + currentPage + htmlAfter;
    }
    else if(lastPagenumber==2){

        if(currentPagenumber == 1){
            htmlRespons = htmlBefore + currentPage + nextPage + htmlAfter;
        }
        else{
            htmlRespons = htmlBefore + previousPage + currentPage + htmlAfter;
        }
    }
    else if(lastPagenumber==3){

        if(currentPagenumber == 1){
            htmlRespons = htmlBefore + currentPage + nextPage + lastPage + htmlAfter;
        }
        else if(currentPagenumber == 2){
            htmlRespons = htmlBefore + previousPage + currentPage + lastPage + htmlAfter;
        }
        else{
            htmlRespons = htmlBefore + firstPage + previousPage + currentPage + htmlAfter;
        }
    }
    else if(lastPagenumber==4){

        if(currentPagenumber == 1){
            htmlRespons = htmlBefore + currentPage + nextPage + empty + lastPage + htmlAfter;
        }
        else if(currentPagenumber == 2){
            htmlRespons = htmlBefore + previousPage + currentPage + nextPage + lastPage + htmlAfter;
        }
        else if(currentPagenumber == 3){
            htmlRespons = htmlBefore + firstPage + empty + previousPage + currentPage + nextPage + htmlAfter;
        }
        else{
            htmlRespons = htmlBefore + firstPage + empty + previousPage + currentPage + htmlAfter;
        }
    }
    else if(lastPagenumber==5){

        if(currentPagenumber == 1){
            htmlRespons = htmlBefore + currentPage + nextPage + empty + lastPage + htmlAfter;
        }
        else if(currentPagenumber == 2){
            htmlRespons = htmlBefore + previousPage + currentPage + nextPage + empty + lastPage + htmlAfter;
        }
        else if(currentPagenumber == 3){
            htmlRespons = htmlBefore + firstPage + previousPage + currentPage + nextPage + lastPage + htmlAfter;
        }
        else if(currentPagenumber == 4){
            htmlRespons = htmlBefore + firstPage + empty + previousPage + currentPage + nextPage + htmlAfter;
        }
        else{
            htmlRespons = htmlBefore + firstPage + empty + previousPage + currentPage + htmlAfter;
        }
    }
    else if(lastPagenumber==6){

        if(currentPagenumber == 1){
            htmlRespons = htmlBefore + currentPage + nextPage + empty + lastPage + htmlAfter;
        }
        else if(currentPagenumber == 2){
            htmlRespons = htmlBefore + previousPage + currentPage + nextPage + empty + lastPage + htmlAfter;
        }
        else if(currentPagenumber == 3){
            htmlRespons = htmlBefore + firstPage + previousPage +  currentPage + nextPage  + empty + lastPage + htmlAfter;
        }
        else if(currentPagenumber == 4){
            htmlRespons = htmlBefore + firstPage + empty + previousPage + currentPage + nextPage + lastPage + htmlAfter;
        }
        else if(currentPagenumber == 5){
            htmlRespons = htmlBefore + firstPage + empty + previousPage + currentPage + nextPage + htmlAfter;
        }
        else{
            htmlRespons = htmlBefore + firstPage + empty + previousPage + currentPage + htmlAfter;
        }
    }
    else{

        if(currentPagenumber == 1){
            htmlRespons = htmlBefore + currentPage + nextPage + empty + lastPage + htmlAfter;
        }
        else if(currentPagenumber == 2){
            htmlRespons = htmlBefore + previousPage + currentPage + nextPage + empty + lastPage + htmlAfter;
        }
        else if(currentPagenumber == 3){
            htmlRespons = htmlBefore + firstPage + previousPage + currentPage + nextPage  + empty + lastPage + htmlAfter;
        }
        else if(currentPagenumber == (lastPagenumber-2)){
            htmlRespons = htmlBefore + firstPage + empty + previousPage + currentPage + nextPage + lastPage + htmlAfter;
        }
        else if(currentPagenumber == (lastPagenumber-1)){
            htmlRespons = htmlBefore + firstPage + empty + previousPage + currentPage + nextPage + htmlAfter;
        }
        else if(currentPagenumber == lastPagenumber){
            htmlRespons = htmlBefore + firstPage + empty + previousPage + currentPage + htmlAfter;
        }
        else{
            htmlRespons = htmlBefore + firstPage + empty + previousPage + currentPage + nextPage + empty + lastPage + htmlAfter;
        }
    }
    return htmlRespons;
}

