(function(d3) {
<<<<<<< HEAD
  var tableData = [];
=======
>>>>>>> 498ec9d986cd9fc0978a6ec7c94ae57ae2b85d03

  $('.select-data').on('change', function() {
    var endPoint = $(this).find("option:selected").attr("id");

    var request = $.ajax({
      type: "GET",
      dataType: "json",
      url: `http://localhost:3000/reports/${endPoint}`
    });

    request.done(function(data) {
      $('.chart').find('svg').first().remove();
<<<<<<< HEAD

      drawGraph(data.graph);
      tableData = data.table;
    });

    request.error(function(error) {
      console.log(error);
    });
  });

  $('body').on('click', 'path', function() {
    window.tableData = tableData;
    console.log('in here');
    var dataID = $(this).attr('id');
    var title = $(this).attr('class');

    $('.table-title').text(title);
    // tableData.forEach(function(obj) {
    //   console.log(obj);
    //   if (obj.hasOwnProperty(dataID)) {
    //       console.log(obj.dataID);
    //     }
    // });
  });

  function populateTable(data) {

  };

=======
      drawGraph(data);
    });
  });

>>>>>>> 498ec9d986cd9fc0978a6ec7c94ae57ae2b85d03
  function drawGraph(data) {
    var title = $('h1.graph-title').text(data[0].title);
    $('.graph-container').append(title);

    var graphData = data.splice(0, 1);
    var dataset = data;

    dataset.forEach(function(d) {
      d.enabled = true;
    });
    var svgWidth = 700;
    var width = 500;
    var height = 500;
    var radius = Math.min(width, height) / 2;

    //generic color palette
    // var color = d3.scale.category10();

    var color = d3.scale.ordinal()
      .range(['#9B0000', '#FF3939', '#FF6363', '#FF9339', '#FFAA63',  '#54D954', '#00CC00', '#009E00']);

    var svg = d3.select('.chart')
      .append('svg')
      .attr('width', svgWidth)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')');
    //apparently pie > donut
    //var donutWidth = 75;

    var arc = d3.svg.arc()
      //.innerRadius(radius - donutWidth)
      .outerRadius(radius);

    var pie = d3.layout.pie()
      .value(function(d) { return d.count; })
      .sort(null);

    var tooltip = d3.select('.chart').append('div').attr('class', 'tooltip');

    tooltip.append('div').attr('class', 'label');
    tooltip.append('div').attr('class', 'count');
    tooltip.append('div').attr('class', 'percent');

    var path = svg.selectAll('path')
      .data(pie(dataset))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('id', function(d) {
        return d.data.id;
      })
      .attr('class', function(d) {
        return d.data.label;
      })
      .attr('fill', function(d, i) {
        return color(d.data.label);
<<<<<<< HEAD
      })
      .each(function(d) { this._current = d; });
=======
    })
    .each(function(d) { this._current = d; });
>>>>>>> 498ec9d986cd9fc0978a6ec7c94ae57ae2b85d03

    path.on('mouseover', function(d) {
      var total = d3.sum(dataset.map(function(d) {
         return (d.enabled) ? d.count : 0;
      }));
      var percent = Math.round(1000 * d.data.count / total) / 10;

      tooltip.select('.label').html(d.data.label);
      tooltip.select('.count').html('Patients: ' + d.data.count);
      tooltip.select('.percent').html(percent + '% of Total');
      tooltip.style('display', 'block');
    });

    path.on('mouseout', function(d) {
      tooltip.style('display', 'none');
    });

    path.on('mousemove', function(d) {
      tooltip.style('top', (d3.event.layerY + 10) + 'px')
      .style('left', (d3.event.layerX + 10) + 'px');
    });

    var legendRectSize = 18;
    var legendSpacing = 6;

    var legend = svg.selectAll('.legend')
      .data(color.domain())
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', function(d, i) {
        var height = legendRectSize + legendSpacing;
        var offset =  height * color.domain().length / 2;
        var horz = 270;
        var vert = i * height - offset;
        return 'translate(' + horz + ',' + vert + ')';
      });

    legend.append('rect')
      .attr('width', legendRectSize)
      .attr('height', legendRectSize)
      .style('fill', color)
      .style('stroke', color)
      .on('click', function(label) {
        var rect = d3.select(this);
        var enabled = true;
        var totalEnabled = d3.sum(dataset.map(function(d) {
          return (d.enabled) ? 1 : 0;
        }));

        if (rect.attr('class') === 'disabled') {
          rect.attr('class', '');
        } else {
          if (totalEnabled < 2) return;
          rect.attr('class', 'disabled');
          enabled = false;
        }

        pie.value(function(d) {
          if (d.label === label) d.enabled = enabled;
          return (d.enabled) ? d.count : 0;
        });

        path = path.data(pie(dataset));

        path.transition()
          .duration(750)
          .attrTween('d', function(d) {
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
              return arc(interpolate(t));
            };
          });
      });

    legend.append('text')
      .attr('x', legendRectSize + legendSpacing)
      .attr('y', legendRectSize - legendSpacing)
      .text(function(d) { return d; });
  };
<<<<<<< HEAD
=======

  // request.error(function(error) {
  //   console.log(error);
  // });
>>>>>>> 498ec9d986cd9fc0978a6ec7c94ae57ae2b85d03
})(window.d3);
