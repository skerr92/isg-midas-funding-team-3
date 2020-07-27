/* globals Chart:false, feather:false */

(function () {
    'use strict'

    feather.replace()

    // Graphs
    var ctx = document.getElementById('myChart')
    // eslint-disable-next-line no-unused-vars
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday'
            ],
            datasets: [{
                data: [
                    15339,
                    21345,
                    18483,
                    24003,
                    23489,
                    24092,
                    12034
                ],
                lineTension: 0,
                backgroundColor: 'transparent',
                borderColor: '#007bff',
                borderWidth: 4,
                pointBackgroundColor: '#007bff'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            },
            legend: {
                display: false
            }
        }
    })
}())

function leaderboard() {
    let leaderboardLink = document.getElementById("donor_leaderboard")
    let donorStatusLink = document.getElementById("donor_status_link")
    let aboutMidasLink = document.getElementById("about_midas")
    let midasMembersLink = document.getElementById("midas_members")
    donorStatusLink.className = "nav-link "
    leaderboardLink.className = "nav-link active"
    aboutMidasLink.className = "nav-link"
    midasMembersLink.className = "nav-link"

    const donorTitle = document.getElementById("donor_dashboard_title")
    donorTitle.innerHTML = "Leaderboard"

    var leaderboardPage = document.getElementById("leaderboard")
    var donorStatusPage = document.getElementById("donor-status")
    var aboutMidasPage = document.getElementById("about-midas")
    var midasMembersPage = document.getElementById("midas-members")
    leaderboardPage.style.display = ""
    donorStatusPage.style.display = "none"
    aboutMidasPage.style.display = "none"
    midasMembersPage.style.display = "none"
}

function donorStatus() {
    let leaderboardLink = document.getElementById("donor_leaderboard")
    let donorStatusLink = document.getElementById("donor_status_link")
    let aboutMidasLink = document.getElementById("about_midas")
    let midasMembersLink = document.getElementById("midas_members")
    leaderboardLink.className = "nav-link"
    donorStatusLink.className = "nav-link active"
    aboutMidasLink.className = "nav-link"
    midasMembersLink.className = "nav-link"

    const donorTitle = document.getElementById("donor_dashboard_title")
    donorTitle.innerHTML = "Donation Status"

    var leaderboardPage = document.getElementById("leaderboard")
    var donorStatusPage = document.getElementById("donor-status")
    var aboutMidasPage = document.getElementById("about-midas")
    var midasMembersPage = document.getElementById("midas-members")
    leaderboardPage.style.display = "none"
    donorStatusPage.style.display = ""
    aboutMidasPage.style.display = "none"
    midasMembersPage.style.display = "none"

}

function aboutMidas() {
    let leaderboardLink = document.getElementById("donor_leaderboard")
    let donorStatusLink = document.getElementById("donor_status_link")
    let aboutMidasLink = document.getElementById("about_midas")
    let midasMembersLink = document.getElementById("midas_members")
    leaderboardLink.className = "nav-link"
    donorStatusLink.className = "nav-link"
    aboutMidasLink.className = "nav-link active"
    midasMembersLink.className = "nav-link"

    const donorTitle = document.getElementById("donor_dashboard_title")
    donorTitle.innerHTML = "About Midas"

    var leaderboardPage = document.getElementById("leaderboard")
    var donorStatusPage = document.getElementById("donor-status")
    var aboutMidasPage = document.getElementById("about-midas")
    var midasMembersPage = document.getElementById("midas-members")
    leaderboardPage.style.display = "none"
    donorStatusPage.style.display = "none"
    aboutMidasPage.style.display = ""
    midasMembersPage.style.display = "none"
}

function midasMembers() {
    let leaderboardLink = document.getElementById("donor_leaderboard")
    let donorStatusLink = document.getElementById("donor_status_link")
    let aboutMidasLink = document.getElementById("about_midas")
    let midasMembersLink = document.getElementById("midas_members")
    leaderboardLink.className = "nav-link"
    donorStatusLink.className = "nav-link"
    aboutMidasLink.className = "nav-link"
    midasMembersLink.className = "nav-link active"

    const donorTitle = document.getElementById("donor_dashboard_title")
    donorTitle.innerHTML = "Midas Members"

    var leaderboardPage = document.getElementById("leaderboard")
    var donorStatusPage = document.getElementById("donor-status")
    var aboutMidasPage = document.getElementById("about-midas")
    var midasMembersPage = document.getElementById("midas-members")
    leaderboardPage.style.display = "none"
    donorStatusPage.style.display = "none"
    aboutMidasPage.style.display = "none"
    midasMembersPage.style.display = ""
}