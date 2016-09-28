
(function() {
    'use strict';
    let data = [
        {
            "Week": "1",
            "Orange": "4637",
            "Apple": "6021"
        },
        {
            "Week": "2",
            "Orange": "4919",
            "Apple": "4368"
        },
        {
            "Week": "3",
            "Orange": "4050",
            "Apple": "5702"
        },
        {
            "Week": "4",
            "Orange": "4810",
            "Apple": "5469"
        },
        {
            "Week": "5",
            "Orange": "4680",
            "Apple": "7893"
        },
        {
            "Week": "6",
            "Orange": "4197",
            "Apple": "7485"
        },
        {
            "Week": "7",
            "Orange": "4193",
            "Apple": "7248"
        },
        {
            "Week": "8",
            "Orange": "4442",
            "Apple": "4553"
        },
        {
            "Week": "9",
            "Orange": "4737",
            "Apple": "0"
        },
        {
            "Week": "10",
            "Orange": "4995",
            "Apple": "6858"
        },
        {
            "Week": "11",
            "Orange": "4661",
            "Apple": "7219"
        },
        {
            "Week": "12",
            "Orange": "4743",
            "Apple": "4983"
        },
        {
            "Week": "13",
            "Orange": "4614",
            "Apple": "5007"
        },
        {
            "Week": "14",
            "Orange": "4710",
            "Apple": "6503"
        },
        {
            "Week": "15",
            "Orange": "4721",
            "Apple": "4745"
        },
        {
            "Week": "16",
            "Orange": "0",
            "Apple": "6370"
        },
        {
            "Week": "17",
            "Orange": "0",
            "Apple": "7347"
        },
        {
            "Week": "18",
            "Orange": "4200",
            "Apple": "5294"
        },
        {
            "Week": "19",
            "Orange": "4705",
            "Apple": "6309"
        },
        {
            "Week": "20",
            "Orange": "4681",
            "Apple": "5588"
        },
        {
            "Week": "21",
            "Orange": "4861",
            "Apple": "4728"
        },
        {
            "Week": "22",
            "Orange": "4936",
            "Apple": "0"
        },
        {
            "Week": "23",
            "Orange": "5000",
            "Apple": "0"
        },
        {
            "Week": "24",
            "Orange": "4791",
            "Apple": "6829"
        },
        {
            "Week": "25",
            "Orange": "4845",
            "Apple": "6801"
        },
        {
            "Week": "26",
            "Orange": "4919",
            "Apple": "7670"
        }
    ];

    $(document).ready(onDomReady);

    function onDomReady() {
        let width = 800;
        let height = 600;
        let svg = d3.select("svg");

        let topMargin = 50, rightMargin = 50, bottomMargin = 50, leftMargin = 50;
        let startPoint = 0;
        let yDomainValueBuffer = 1000;
        let xDomainValueBuffer = 1;

        let yAxisDesc = "Sold Units";
        let yAxisTextMargin = 12;
        let yAxisTextAngle = -90;

        let xAxisDesc = "Weeks";
        let xAxisTextMargin = 15;
        let xAxisTextAngle = 0;
        let xAxisKey = "Week";

        let lineStrokeWidth = 2;
        let lineTextDescLeftMargin = 10;
        let lineColors = ['orange', 'red'];

        let yOrangeMaxVal = d3.max(data, function(d) {return Number(d.Orange);});
        let yAppleMaxVal = d3.max(data, function(d) {return Number(d.Apple);});

        let yScale = d3.scaleLinear()
            .domain([(yOrangeMaxVal>=yAppleMaxVal?yOrangeMaxVal:yAppleMaxVal) + yDomainValueBuffer, startPoint])
            .range([startPoint, height - topMargin - bottomMargin]);

        let xScale = d3.scaleLinear()
            .domain([startPoint, d3.max(data, function(d) {return Number(d.Week);} ) + xDomainValueBuffer])
            .range([startPoint, width - rightMargin - leftMargin ]);

        let yAxis = d3.axisLeft(yScale);
        let xAxis = d3.axisBottom(xScale);

        svg.append('g').attr('transform',`translate(${leftMargin}, ${topMargin})`).call(yAxis);
        svg.append('g').attr('transform',`translate(${leftMargin}, ${height - bottomMargin})`).call(xAxis);
        svg.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", `translate(${yAxisTextMargin},${height/2})rotate(${yAxisTextAngle})`)  // text is drawn off the screen top left, move down and out and rotate
            .text(yAxisDesc);

        svg.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", `translate(${width/2},${height-xAxisTextMargin})rotate(${xAxisTextAngle})`)  // text is drawn off the screen top left, move down and out and rotate
            .text(xAxisDesc);

        function drawPath(key) {
            var dataLine = d3.line()
                .x(function(d) {
                    return xScale(d.Week) + leftMargin;
                })
                .y(function(d) {
                    return yScale(d[key]) + topMargin;
                })
            //.curve(d3.curveBasis);

            svg.data(data).append("path")
                .attr("d", dataLine(data))
                .attr("stroke", lineColors.shift())
                .attr("stroke-width", lineStrokeWidth)
                .attr("fill", "none");

            svg.append("text")
                .datum(data)
                .attr("transform", function(d) { return `translate(${xScale(d[d.length -1].Week) + lineTextDescLeftMargin}, ${yScale(d[d.length -1][key]) + topMargin})`;})
                .attr("x", leftMargin)
                .attr("dy", "0.10em")
                .style("font", "14px sans-serif")
                .text(key);
        }
        for(let key in data[0]) {
            if(xAxisKey != key) {
                drawPath(key);
            }
        }
    };

})();
