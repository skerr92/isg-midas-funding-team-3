
    var ctxB = document.getElementById("barChart").getContext('2d');
    var names = getNames();
    var budgets = getData();
    console.log("Names: " + names);
    var myBarChart = new Chart(ctxB, {
        type: 'bar',
        data: {
            labels: names,
            datasets: [{
                label: 'Client Budget',
                data: budgets,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });


    // DO GET
    function getNames(){
        var names = [];
        $.ajax({
            type : "GET",
            url : "/litUsers",
            success: function(results){
                for (var i = 0; i < results.length; i++) {
                    names[i] = results[i].firstName;
                }
                console.log(names);
            },
            error : function(e) {
                console.log("ERROR: ", e);
            }
        });
        return names;
    }

    // DO GET
    function getData(){
        var data = [];
        $.ajax({
            type : "GET",
            url : "/litUsers",
            success: function(results){
                for (var i = 0; i < results.length; i++) {
                    data[i] = (Number) (results[i].budget.replace("$", "").trim());
                }
                console.log(data);
            },
            error : function(e) {
                console.log("ERROR: ", e);
            }
        });
        return data;
    }




function savingsPlans() {
    let savingsLink = document.getElementById("clientSavingsLink")
    let messageLink = document.getElementById("messageClientLink")
    let reportsLink = document.getElementById("reportsLink")
    let findClient = document.getElementById("findClientLink")

    savingsLink.className = "nav-link active"
    messageLink.className = "nav-link"
    reportsLink.className = "nav-link"
    findClient.className = "nav-link"

    // $( document ).ready(function() {
    //
    //     // GET REQUEST
    //     $("#clientSavingsLink").click(function(event){
    //         event.preventDefault();
    //         ajaxGet();
    //     });
    //
    //     // DO GET
    //     function ajaxGet(){
    //         $.ajax({
    //             type : "GET",
    //             url : "/users",
    //             success: function(result){
    //                 $('#getResultDiv ul').empty();
    //                 $.each(result, function(i, user){
    //                     $('#getResultDiv .list-group').append(user.firstName + " " + user.lastName + "<br>")
    //                 });
    //                 console.log("Success: ", result);
    //             },
    //             error : function(e) {
    //                 $("#getResultDiv").html("<strong>Error</strong>");
    //                 console.log("ERROR: ", e);
    //             }
    //         });
    //     }
    // })
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