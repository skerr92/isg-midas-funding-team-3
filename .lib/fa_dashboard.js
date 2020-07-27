function savingsPlans() {
    let savingsLink = document.getElementById("clientSavingsLink")
    let messageLink = document.getElementById("messageClientLink")
    let reportsLink = document.getElementById("reportsLink")
    let findClient = document.getElementById("findClientLink")

    savingsLink.className = "nav-link active"
    messageLink.className = "nav-link"
    reportsLink.className = "nav-link"
    findClient.className = "nav-link"


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