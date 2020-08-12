<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

</head>
<body>
<p id="demo"></p>

<button onclick="UserAction()" >click me</button>

<script>
function UserAction() {
    // New XMLHTTPRequest
    var request = new XMLHttpRequest();
    request.open("GET", project_url+"api/v1/post/2/details", false);
    request.setRequestHeader("Accept", "application/json");
    request.send();
    // view request status
    alert(request.response);
    response.innerHTML = request.responseText;
}


</script>
</body>
</html>
