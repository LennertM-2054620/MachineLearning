// Decode HTML entities
const decodedStr = he.decode(data);
const validJsonString = decodedStr.replace(/'/g, '"');

// Parse the string into a JavaScript object
const obj = JSON.parse(validJsonString);

const arr = []

obj.allData.forEach(element => {
    arr.push(Math.round(element * 100) / 100);
});

Highcharts.chart('chart', {
    credits: {
        enabled: false,
    },
    chart: {
        type: 'column'
    },
    title: {
        text: 'Prediction',
        align: 'center'
    },
    xAxis: {
        categories: ["Combi Wrench", "Hammer", "Screwdriver", "Wrench"],
        crosshair: true,
        accessibility: {
            description: 'Tools'
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Percent'
        }
    },
    tooltip: {
        valueSuffix: '%'
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [
        {
            name: 'Prediction percentage',
            data: arr
        }
    ]
});
