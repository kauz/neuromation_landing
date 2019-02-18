Chart.defaults.global.responsive = true;

var ctx = document.getElementById("barChart").getContext('2d');
var cty = document.getElementById("doughnutChart").getContext('2d');
var ctw = document.getElementById("secondDoughnutChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        datasets: [{
            label: 'First week',
            data: [15],
            backgroundColor: [
                '#114d8d'
            ],
            borderWidth: 1
        },
            {
                label: 'Second week',
                data: [10],
                backgroundColor: [
                    '#114d8d'
                ],
                borderWidth: 1
            },
            {
                label: 'Third week',
                data: [5],
                backgroundColor: [
                    '#114d8d'
                ],
                borderWidth: 1
            }]
    },
    options: {
        labels: {
            defaultFontFamily: "Roboto"
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    display: false
                },
                gridLines: {
                    drawTicks: false,
                    display: false,
                    drawBorder: false
                }
            }],
            xAxes: [{
                categoryPercentage: 1,
                ticks: {
                    beginAtZero: true,
                    display: true,
                    fontFamily: "Roboto",
                    fontSize: 13
                },
                gridLines: {
                    drawTicks: false,
                    display: false,
                    drawBorder: false
                }
            }]
        },
        legend: {
            display: false
        },
        legendCallback: function () {
            return "<div class=\"bar_helper\"><div>+15%</div> in neurotokens</div> <div class=\"bar_helper\"><div>+10%</div> in neurotokens</div> <div class=\"bar_helper\"><div>+5%</div> in neurotokens</div>"+
                    "<div class=\"bar_helper_low\">First week</div> <div class=\"bar_helper_low\">Second week</div> <div class=\"bar_helper_low\">Third week</div>"
        }
    }
});

var myDoughnutChart = new Chart(cty, {
    type: "doughnut",
    data: {
        labels: ["Liquidity reserve", "To the team", "To partners", "To researchers", "In the Token Sale"],
        datasets: [{
            label: "My First Dataset",
            data: [10, 12, 12, 6, 60],
            backgroundColor: ["#4fd5ff", "#02bef6", "#0892db", "#1775b8", "#114d8d"]
        }]
    },
    options: {

        legend: {
            display: false
        },
        legendCallback: function () {
            return "<div class=\"distribution chart1__helpers\"> <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"donut_path path_1\" viewBox=\"0 0 9253 3657\"> <defs id=\"defs4\"><style id=\"style6\"> .chart1__helpers .str0{stroke:#707070;stroke-width:9.5502} .chart1__helpers .fil0{fill:none} .chart1__helpers .fil1{fill:#02bff6} .chart1__helpers .fil3{fill:#0992db} .chart1__helpers .fil4{fill:#114d8d} .chart1__helpers .fil2{fill:#4fd6ff} </style></defs> <g id=\"Layer_x0020_1\"><g id=\"_1504955520\"><path class=\"fil0 str0\" id=\"polyline11\" d=\"M5590 3249l188 247h3456\"></path><path class=\"fil0 str0\" id=\"polyline13\" d=\"M5575 1584l188-246h3456\"></path><path class=\"fil0 str0\" id=\"polyline15\" d=\"M5575 2547l188-247h3456\"></path><path class=\"fil0 str0\" id=\"polyline17\" d=\"M5161 1148l602-774h3456\"></path><path class=\"fil0 str0\" id=\"polyline19\" d=\"M0 374h3456l602 774\"></path></g></g></svg> <div class=\"distribution__descr\"><span class=\"bold\">60%</span> in the Token Sale</div> <div class=\"distribution__descr\"><span class=\"bold\">10%</span> liquidity reserve</div> <div class=\"distribution__descr\"><span class=\"bold\">12%</span> to the team</div> <div class=\"distribution__descr\"><span class=\"bold\">12%</span> to partners</div> <div class=\"distribution__descr\"><span class=\"bold\">6%</span> to researchers</div> </div>"
        }
    }
});

var secondDoughnutChart = new Chart(ctw, {
    type: "doughnut",
    data: {
        labels: ["10% to partners / advisers / early backers",
            "At Least 40% for Platform Development",
            "Up to 40% Liquidity reverse (pre-pay for computing power)",
            "10% for PR and Marketing of Neuromation service"],
        datasets: [{
            label: "My First Dataset",
            data: [10, 40, 40, 10],
            backgroundColor: ["#4fd5ff", "#3673b5", "#114d8d", "02bff6"]
        }]
    },
    options: {
        legend: {
            display: false
        },
        legendCallback: function () {
            return "<div class=\"distribution chart2__helpers\"> <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"donut_path path_2\" viewBox=\"0 0 11382 4765\"> <defs id=\"defs4\"> <style id=\"style6\"> .chart2__helpers .str0{stroke:#707070;stroke-width:11.7675} .chart2__helpers .fil0{fill:none} .chart2__helpers .fil1{fill:#02bff6} .chart2__helpers .fil3{fill:#0992db} .chart2__helpers .fil4{fill:#114d8d} .chart2__helpers .fil2{fill:#4fd6ff} </style> </defs> <g id=\"Layer_x0020_1\"><g id=\"_970941424\"><path class=\"fil0 str0\" id=\"polyline11\" d=\"M4490 4263l-232 304H0\"></path><path class=\"fil0 str0\" id=\"polyline13\" d=\"M6875 4263l232 304h4258\"></path><path class=\"fil0 str0\" id=\"polyline15\" d=\"M5824 1282l-232-304H0\"></path><path class=\"fil0 str0\" id=\"polyline17\" d=\"M6875 1812l232-305h4258\"></path></g></g></svg> <div class=\"distribution__descr\">Al Least <span class=\"bold\">40%</span> for Platform Development</div> <div class=\"distribution__descr\">Up to <span class=\"bold\">40%</span> Liquidity reverse</div> <div class=\"distribution__descr\"><span class=\"bold\">10%</span> for PR and Marketing of Neuromation service</div> <div class=\"distribution__descr\"><span class=\"bold\">10%</span> to partners / advisers /early backers</div> </div>"
        }
    }
});
document.getElementById('js-legend_bar').innerHTML = myChart.generateLegend();
document.getElementById('js-legend').innerHTML = myDoughnutChart.generateLegend();
document.getElementById('js-legend_2').innerHTML = secondDoughnutChart.generateLegend();