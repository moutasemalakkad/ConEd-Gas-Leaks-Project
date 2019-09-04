import React from "react";
import * as d3 from "d3";
import { useD3 } from "d3blackbox";


d3.json(`/api/monthly-leaks`).then(function(leaksCount, error){
  if(error) {
    console.log(error);

    throw error;
  }
  //console.log("leaksCount", leaksCount);

 const leakVals = (obj) => {
  var total = 0;
      Object.keys(obj).forEach(key => {
        total += obj[key]
        console.log(key, obj[key])

      if (typeof obj[key] === 'object') {
              leakVals(obj[key])
          }
      })
      console.log(total);
    }

    leakVals(leaksCount[2013])
    // leakVals(leaksCount[2014])
    // leakVals(leaksCount[2015])
    // leakVals(leaksCount[2016])
    // leakVals(leaksCount[2017])
    // leakVals(leaksCount[2018])    
});
  

// var data = [{ a: 1, b: 2, c: 3, d: 4 }, { a: 2, b: 3, c: 4, d: 5 }],
//     sum = data.map(function (object) {
//         return Object.keys(object).reduce(function (sum, key) {
//             return sum + object[key];
//         }, 0);
//     });

// console.log(sum);
 
const barchart = function(anchor, props) {
    const monthTemps = [
        {
          month: 'Jan',
          temp: 78.9,
    
        },
        {
          month: 'Feb',
          temp: 75.1
        },
        {
          month: 'Mar',
          temp: 68.0,
        },
        {
          month: 'Apr',
          temp: 97.0,
        },
        {
          month: 'May',
          temp: 55.6
        },
        {
          month: 'Jun',
          temp: 35.1
        },
        {
          month: 'Jul',
          temp: 71.9
        },
        {
          month: 'Aug',
          temp: 40.4
        },
        {
          month: 'Sep',
          temp: 59.6
        },
        {
          month: 'Oct',
          temp: 59.6
        },
        {
            month: 'Nov',
            temp: 89.6
          },
          {
            month: 'Dec',
            temp: 19.6
          }
      ];
    

    const svg = d3.select('svg');
    const margin = 80;
    const width = 800 - 2 * margin;
    const height = 620 - 2 * margin;
  
    const chart = svg.append('g')
      .attr('transform', `translate(${margin}, ${margin})`);
  
    const xScale = d3.scaleBand()
      .range([0, width])
      .domain(monthTemps.map((s) => s.month))
      .padding(0.4)
    
    const yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, 110]);
  
    const makeYLines = () => d3.axisLeft()
      .scale(yScale)
  
    chart.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));
  
    chart.append('g')
      .call(d3.axisLeft(yScale));
  
    chart.append('g')
      .attr('class', 'grid')
      .call(makeYLines()
        .tickSize(-width, 0, 0)
        .tickFormat('')
      )
  
    const barGroups = chart.selectAll()
      .data(monthTemps)
      .enter()
      .append('g')
  
    barGroups
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (g) => xScale(g.month))
      .attr('y', (g) => yScale(g.temp))
      .attr('height', (g) => height - yScale(g.temp))
      .attr('width', xScale.bandwidth())
      .on('mouseenter', function (actual, i) {
        d3.selectAll('.temp')
          .attr('opacity', 0)
  
        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 0.6)
          .attr('x', (a) => xScale(a.month) - 5)
          .attr('width', xScale.bandwidth() + 10)
  
        const y = yScale(actual.temp)
  
        const line = chart.append('line')
          .attr('id', 'limit')
          .attr('x1', 0)
          .attr('y1', y)
          .attr('x2', width)
          .attr('y2', y)
  
        barGroups.append('text')
          .attr('class', 'divergence')
          .attr('x', (a) => xScale(a.month) + xScale.bandwidth() / 2)
          .attr('y', (a) => yScale(a.temp) + 30)
          .attr('fill', 'white')
          .attr('text-anchor', 'middle')
          .text((a, idx) => {
            const divergence = (a.temp - actual.temp).toFixed(1)
            
            let text = ''
            if (divergence > 0) text += '+'
            text += `${divergence}`
  
            return idx !== i ? text : '';
          })
  
      })
      .on('mouseleave', function () {
        d3.selectAll('.temp')
          .attr('opacity', 1)
  
        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 1)
          .attr('x', (a) => xScale(a.month))
          .attr('width', xScale.bandwidth())
  
        chart.selectAll('#limit').remove()
        chart.selectAll('.divergence').remove()
      })
  
    barGroups 
      .append('text')
      .attr('class', 'temp')
      .attr('x', (a) => xScale(a.month) + xScale.bandwidth() / 2)
      .attr('y', (a) => yScale(a.temp) + 30)
      .attr('text-anchor', 'middle')
      .text((a) => `${a.temp}`)
    
    svg
      .append('text')
      .attr('class', 'label')
      .attr('x', -(height / 2) - margin)
      .attr('y', margin / 2.1)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('Temperature')
  
    svg.append('text')
      .attr('class', 'label')
      .attr('x', width / 2 + margin)
      .attr('y', height + margin * 1.7)
      .attr('text-anchor', 'middle')
      .text('Months')
  
    svg.append('text')
      .attr('class', 'title')
      .attr('x', width / 2 + margin)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .text('2018 Gas Leaks Vs Temperature')
  
    svg.append('text')
      .attr('class', 'source')
      .attr('x', width - margin / 2)
      .attr('y', height + margin * 2)
      .attr('text-anchor', 'start')
      .text('Con Edison Data')
};

export default ({ x, y, width, height }) => {
  const ref = useD3(anchor => barchart(anchor, { width, height }));

  return <g transform={`translate(${x}, ${y})`} ref={ref} />;
};
