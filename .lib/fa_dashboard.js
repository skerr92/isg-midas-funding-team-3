function savingsPlans() {
    let savingsLink = document.getElementById("clientSavingsLink")
    let messageLink = document.getElementById("messageClientLink")
    let reportsLink = document.getElementById("reportsLink")
    let findClient = document.getElementById("findClientLink")

    savingsLink.className = "nav-link active"
    messageLink.className = "nav-link"
    reportsLink.className = "nav-link"
    findClient.className = "nav-link"

    $( document ).ready(function() {

        // GET REQUEST
        $("#clientSavingsLink").click(function(event){
            event.preventDefault();
            ajaxGet();
        });

        // DO GET
        function ajaxGet(){
            $.ajax({
                type : "GET",
                url : "/users",
                success: function(result){
                    $('#getResultDiv ul').empty();
                    $.each(result, function(i, user){
                        $('#getResultDiv .list-group').append(user.firstName + " " + user.lastName + "<br>")
                    });
                    console.log("Success: ", result);
                },
                error : function(e) {
                    $("#getResultDiv").html("<strong>Error</strong>");
                    console.log("ERROR: ", e);
                }
            });
        }
    })
}

function messageClient() {
    let savingsLink = document.getElementById("clientSavingsLink")
    let messageLink = document.getElementById("messageClientLink")
    let reportsLink = document.getElementById("reportsLink")
    let findClient = document.getElementById("findClientLink")

    savingsLink.className = "nav-link"
    messageLink.className = "nav-link active"
    reportsLink.className = "nav-link"
    findClient.className = "nav-link"
}

function viewReports() {
    let savingsLink = document.getElementById("clientSavingsLink")
    let messageLink = document.getElementById("messageClientLink")
    let reportsLink = document.getElementById("reportsLink")
    let findClient = document.getElementById("findClientLink")

    savingsLink.className = "nav-link"
    messageLink.className = "nav-link"
    reportsLink.className = "nav-link active"
    findClient.className = "nav-link"
}

function findClient() {
    let savingsLink = document.getElementById("clientSavingsLink")
    let messageLink = document.getElementById("messageClientLink")
    let reportsLink = document.getElementById("reportsLink")
    let findClient = document.getElementById("findClientLink")

    savingsLink.className = "nav-link"
    messageLink.className = "nav-link"
    reportsLink.className = "nav-link"
    findClient.className = "nav-link active"
}