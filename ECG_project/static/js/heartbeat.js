// const socket = io();

var limit = 200,
    duration = 5,
    now = new Date(Date.now() - duration)

var width = 600,
    height = 400

var groups = {
    current: {
        value: 0,
        color: '#fff',
        data: d3.range(limit).map(function() {
            return 0
        }),
        minX: 0,
        maxX: 0,
        minY: 0,
        maxY: 0
    }
}

var x = d3.time.scale()
    .domain([now - (limit - 2), now - duration])
    // .domain([0,100])
    .range([0, width])

var y = d3.scale.linear()
    .domain([0, 100])
    .range([height, 0])

var line = d3.svg.line()
    .interpolate('basis')
    .x(function(d, i) {
        return x(now - (limit - 1 - i) * duration)
    })
    .y(function(d) {
        return y(d)
    })

var svg = d3.select('.graph').append('svg')
    .attr('class', 'chart')
    .attr('width', width)
    .attr('height', height)

// var axis = svg.append('g')
//     .attr('class', 'x axis')
//     .attr('transform', 'translate(0,' + height + ')')
//     .call(x.axis = d3.svg.axis().scale(x).orient('bottom'))

var paths = svg.append('g')

for (var name in groups) {
    var group = groups[name]
    group.path = paths.append('path')
        .data([group.data])
        .attr('class', name + ' group')
        .style('stroke', group.color)
}

// Update heartbeat data
for (var name in groups) {
    var group = groups[name]
    socket.on('heartbeat', function(realbeat) {
        group.value = realbeat
    });
}

var minYTemp = 0;
var maxYTemp = 0;

function tick() {
    now = new Date()

    // Add new values
    for (var name in groups) {
        var group = groups[name]
            // console.log(group.value)
        group.data.push(group.value) // Real values arrive at irregular intervals

        // Get max and min on determine y scope
        maxYTemp = parseInt(d3.max(group.data)) + 3;
        minYTemp = parseInt(d3.min(group.data)) - 3;
        // console.log(maxYTemp, minYTemp)

        // Draw line
        group.path.attr('d', line);
    }

    // Shift domain
    x.domain([now - (limit - 2) * duration, now - duration])
    y.domain([minYTemp, maxYTemp])


    // Slide x-axis left
    // axis.transition()
    //     .duration(duration)
    //     .ease('linear')
    //     .call(x.axis)

    // Slide paths left
    paths.attr('transform', null)
        .transition()
        .duration(duration)
        .ease('linear')
        .attr('transform', 'translate(' + x(now - (limit - 1) * duration) + ')')
        .each('end', tick)

    // Remove oldest data point from each group
    for (var name in groups) {
        var group = groups[name]
        group.data.shift()
    }
}

tick()