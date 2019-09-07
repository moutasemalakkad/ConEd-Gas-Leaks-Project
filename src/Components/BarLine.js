import React from "react";
import * as d3 from "d3";
import { useD3 } from "d3blackbox";

//get monthly-leaks value
d3.json(`/api/monthly-leaks`).then(function(leaksCount, error){
  if(error) {
    console.log(error);
    throw error;
  }
  //console.log("leaksCount", leaksCount);


const leakSum = (leaksCount) => {
  let total = 0;
    Object.keys(leaksCount).forEach(key => {
      //console.log(typeof(leaksCount[key]))
      total  += leaksCount[key]
            //console.log(typeof(total));
        //console.log(key, total)
      if (typeof leaksCount[key] === 'object') {
              leakSum(leaksCount[key])
          }
      })
      console.log(total)
}
//change to a function or an optimal loop later 
//needed reordering (chronological) of json month keys 

    const yr13Aprsum = leakSum(leaksCount[2013].Apr)
    console.log(yr13Aprsum)
    const yr13Augsum = leakSum(leaksCount[2013].Aug)
    console.log(yr13Augsum)
    const yr13Decsum = leakSum(leaksCount[2013].Dec)
    const yr13Febsum = leakSum(leaksCount[2013].Feb)
    const yr13Jansum = leakSum(leaksCount[2013].Jan)
    const yr13Julsum = leakSum(leaksCount[2013].Jul)
    const yr13Junsum = leakSum(leaksCount[2013].Jun)
    const yr13Marsum = leakSum(leaksCount[2013].Mar)
    const yr13Maysum = leakSum(leaksCount[2013].May)
    const yr13Novsum = leakSum(leaksCount[2013].Nov)
    const yr13Octsum = leakSum(leaksCount[2013].Oct)
    const yr13Sepsum = leakSum(leaksCount[2013].Sep)
    
    const barchart13 = function(anchor, props) {
    
      const monthLeaks13 = [
          {
            month: 'Jan',
            leaks: 1186,
  
          },
          {
            month: 'Feb',
            leaks: 1147
          },
          {
            month: 'Mar',
            leaks: 1089,
          },
          {
            month: 'Apr',
            leaks: 986,
          },
          {
            month: 'May',
            leaks: 1013
          },
          {
            month: 'Jun',
            leaks: 931
          },
          {
            month: 'Jul',
            leaks: 1010
          },
          {
            month: 'Aug',
            leaks: 1019
          },
          {
            month: 'Sep',
            leaks: 1037
          },
          {
            month: 'Oct',
            leaks: 1092
          },
          {
            month: 'Nov',
            leaks: 1172
          },
          {
            month: 'Dec',
            leaks: 1302
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
        .domain(monthLeaks13.map(s => s.month))
        .padding(0.4)
      
      const yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([800, 1400]);
    
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
        .data(monthLeaks13)
        .enter()
        .append('g')
    
      barGroups
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (g) => xScale(g.month))
        .attr('y', (g) => yScale(g.leaks))
        .attr('height', (g) => height - yScale(g.leaks))
        .attr('width', xScale.bandwidth())
        .on('mouseenter', function (actual, i) {
          d3.selectAll('.leaks')
            .attr('opacity', 0)
    
          d3.select(this)
            .transition()
            .duration(300)
            .attr('opacity', 0.6)
            .attr('x', (a) => xScale(a.month) - 5)
            .attr('width', xScale.bandwidth() + 10)
    
          const y = yScale(actual.leaks)
    
          const line = chart.append('line')
            .attr('id', 'limit')
            .attr('x1', 0)
            .attr('y1', y)
            .attr('x2', width)
            .attr('y2', y)
    
          barGroups.append('text')
            .attr('class', 'divergence')
            .attr('x', (a) => xScale(a.month) + xScale.bandwidth() / 2)
            .attr('y', (a) => yScale(a.leaks) + 30)
            .attr('fill', 'white')
            .attr('text-anchor', 'middle')
            .text((a, idx) => {
              const divergence = (a.leaks - actual.leaks).toFixed(1)
              
              let text = ''
              if (divergence > 0) text += '+'
              text += `${divergence}`
    
              return idx !== i ? text : '';
            })
    
        })
        .on('mouseleave', function () {
          d3.selectAll('.leaks')
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
        .attr('class', 'leaks')
        .attr('x', (a) => xScale(a.month) + xScale.bandwidth() / 2)
        .attr('y', (a) => yScale(a.leaks) + 30)
        .attr('text-anchor', 'middle')
        .text((a) => `${a.leaks}`)
      
      svg
        .append('text')
        .attr('class', 'label')
        .attr('x', -(height / 2) - margin)
        .attr('y', margin / 2.1)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text('GasLeaks')
    
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
        .text('2013 Gas Leaks Vs Temperature')
    
      svg.append('text')
        .attr('class', 'source')
        .attr('x', width - margin / 2)
        .attr('y', height + margin * 2)
        .attr('text-anchor', 'start')
        .text('Con Edison Data')
  };

  });

//get monthly-temps value
// d3.json(`/api/monthly-temps`).then(function(leaksTemp, error){
//   if(error) {
//     console.log(error);
//     throw error;
//   }
//   console.log("leaksTemps", leaksTemp);

//  const leaksAvg = (obj) => {
//   var avg = 0;
//       Object.keys(obj).forEach(key => {
//         avg += obj[key]
//         //console.log(key, obj[key])

//       if (typeof obj[key] === 'object') {
//               leaksAvg(obj[key])
//           }
//       })
//       console.log(avg);
//     }

//     leaksAvg(leaksTemp[2013])
//     leaksAvg(leaksTemp[2014])
//     leaksAvg(leaksTemp[2015])
//     leaksAvg(leaksTemp[2016])
//     leaksAvg(leaksTemp[2017])
//     leaksAvg(leaksTemp[2018])    
// });
 
const barchart13 = function(anchor, props) {
    
    const monthLeaks13 = [
        {
          month: 'Jan',
          leaks: 1186,

        },
        {
          month: 'Feb',
          leaks: 1147
        },
        {
          month: 'Mar',
          leaks: 1089,
        },
        {
          month: 'Apr',
          leaks: 986,
        },
        {
          month: 'May',
          leaks: 1013
        },
        {
          month: 'Jun',
          leaks: 931
        },
        {
          month: 'Jul',
          leaks: 1010
        },
        {
          month: 'Aug',
          leaks: 1019
        },
        {
          month: 'Sep',
          leaks: 1037
        },
        {
          month: 'Oct',
          leaks: 1092
        },
        {
          month: 'Nov',
          leaks: 1172
        },
        {
          month: 'Dec',
          leaks: 1302
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
      .domain(monthLeaks13.map(s => s.month))
      .padding(0.4)
    
    const yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([800, 1400]);
  
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
      .data(monthLeaks13)
      .enter()
      .append('g')
  
    barGroups
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (g) => xScale(g.month))
      .attr('y', (g) => yScale(g.leaks))
      .attr('height', (g) => height - yScale(g.leaks))
      .attr('width', xScale.bandwidth())
      .on('mouseenter', function (actual, i) {
        d3.selectAll('.leaks')
          .attr('opacity', 0)
  
        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 0.6)
          .attr('x', (a) => xScale(a.month) - 5)
          .attr('width', xScale.bandwidth() + 10)
  
        const y = yScale(actual.leaks)
  
        const line = chart.append('line')
          .attr('id', 'limit')
          .attr('x1', 0)
          .attr('y1', y)
          .attr('x2', width)
          .attr('y2', y)
  
        barGroups.append('text')
          .attr('class', 'divergence')
          .attr('x', (a) => xScale(a.month) + xScale.bandwidth() / 2)
          .attr('y', (a) => yScale(a.leaks) + 30)
          .attr('fill', 'white')
          .attr('text-anchor', 'middle')
          .text((a, idx) => {
            const divergence = (a.leaks - actual.leaks).toFixed(1)
            
            let text = ''
            if (divergence > 0) text += '+'
            text += `${divergence}`
  
            return idx !== i ? text : '';
          })
  
      })
      .on('mouseleave', function () {
        d3.selectAll('.leaks')
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
      .attr('class', 'leaks')
      .attr('x', (a) => xScale(a.month) + xScale.bandwidth() / 2)
      .attr('y', (a) => yScale(a.leaks) + 30)
      .attr('text-anchor', 'middle')
      .text((a) => `${a.leaks}`)
    
    svg
      .append('text')
      .attr('class', 'label')
      .attr('x', -(height / 2) - margin)
      .attr('y', margin / 2.1)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('GasLeaks')
  
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
      .text('2013 Gas Leaks Vs Temperature')
  
    svg.append('text')
      .attr('class', 'source')
      .attr('x', width - margin / 2)
      .attr('y', height + margin * 2)
      .attr('text-anchor', 'start')
      .text('Con Edison Data')
};

export default ({ x, y, width, height }) => {
  const ref = useD3(anchor => barchart13(anchor, { width, height }));

  return <g transform={`translate(${x}, ${y})`} ref={ref} />;
};
