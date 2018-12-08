'use strict';

var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'pie',

    // The data for our dataset
    data: {
        labels: ["January", "February", "March", "April", "May"],
        datasets: [{
            data: [10, 10, 5, 2, 5],
            backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#ccc']
        }]
    },
    // Configuration options go here
    options: {}
});