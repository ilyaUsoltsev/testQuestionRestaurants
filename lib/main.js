'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var ctx = document.getElementById('myChart').getContext('2d');
var listData = [];
var listDataObject = {};
var letters = 'ABCDE';
var pieData = { 'A': 0, 'B': 0, 'C': 0, 'D': 0, 'E': 0 };

drawChart = function drawChart() {
    new Chart(ctx, {
        // The type of chart we want to create
        type: 'pie',
        // The data for our dataset
        data: {
            labels: Object.keys(pieData),
            datasets: [{
                data: Object.values(pieData),
                backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#ccc']
            }]
        },
        // Configuration options go here
        options: {}
    });
};

var dataSet = {
    dataList: 'hey',
    listData: listData,
    email: "example@mail.com",
    message: "Hello there",
    isSubmitted: false
};
new Vue({
    beforeCreate: function beforeCreate() {
        fetch('https://data.gov.ru/sites/default/files/opendata/7710881420-Cafe/data-2015-06-25T00-00-00-structure-2015-06-25T00-00-00.json').then(function (data) {
            return data.json();
        }).then(function (res) {
            return res.filter(function (i) {
                return 'Name_en' in i && i.Name_en[0];
            });
        }).then(function (res) {
            return res.filter(function (i) {
                return letters.indexOf(i.Name_en[0]) !== -1;
            });
        }).then(function (res) {
            for (var i = 0; i < res.length; i++) {
                pieData[res[i].Name_en[0]] += 1;
            }
            drawChart();
            for (var _i = 0; _i < letters.length; _i++) {
                listDataObject['letter'] = letters[_i];
                listDataObject['value'] = pieData[letters[_i]];
                listData.push.apply(listData, _toConsumableArray(listDataObject));
            }
            console.log(listData);
        });
    },
    data: dataSet,
    el: "#example",
    methods: {
        submit: function submit() {
            //Now submit feed back via ajax 
            this.isSubmitted = true; //set submitted to true to disable submit button
        }
    }
});