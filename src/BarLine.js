// import React, { Component } from "react";
// import "semantic-ui-css/semantic.min.css";
// import * as d3 from 'd3';
// // import {
// //   Button,
// //   Container,
// //   Divider,
// //   Grid,
// //   Header,
// //   Icon,
// //   Image,
// //   Menu
// // } from "semantic-ui-react";

// const BASE_URL = "api/gas-leaks";


// const margin = 80;
// const width = 1000 - 2 * margin;
// const height = 600 - 2 * margin;
// // const gasleaks =[]

// // const monthlyLeaks = [
// //      {  
// //         "1": 35,
// //         "2": 46,
// //         "3": 44,
// //         "4": 33,
// //         "5": 53,
// //         "6": 42,
// //         "7": 55,
// //         "8": 40,
// //         "9": 35,
// //         "10": 40,
// //         "11": 50,
// //         "12": 34,
// //         "13": 33,
// //         "14": 48,
// //         "15": 43,
// //         "16": 40,
// //         "17": 40,
// //         "18": 30,
// //         "19": 45,
// //         "20": 30,
// //         "21": 40,
// //         "22": 35,
// //         "23": 43,
// //         "24": 60,
// //         "25": 51,
// //         "26": 30,
// //         "27": 40,
// //         "28": 39,
// //         "29": 38,
// //         "30": 48,
// //         "31": 27
// //       }
// //     ]
// // const tempData = [    
// //     { 
// //         "1": 40,
// //         "2": 33,
// //         "3": 32,
// //         "4": 37,
// //         "5": 42,
// //         "6": 46,
// //         "7": 45,
// //         "8": 48,
// //         "9": 49,
// //         "10": 47,
// //         "11": 46,
// //         "12": 47,
// //         "13": 50,
// //         "14": 56,
// //         "15": 38,
// //         "16": 37,
// //         "17": 43,
// //         "18": 35,
// //         "19": 51,
// //         "20": 53,
// //         "21": 32,
// //         "22": 27,
// //         "23": 20,
// //         "24": 22,
// //         "25": 24,
// //         "26": 27,
// //         "27": 34,
// //         "28": 36,
// //         "29": 49,
// //         "30": 59,
// //         "31": 61
// //       },
// // ]

// class BarLine extends Component {
//     componentDidMount() {
//         fetch(BASE_URL)
//             .then(res => res.json())
//             .then(gasleaks => {
//                 console.log('gasleaks');
//             })
//     }
//     render() {
//         return (
//             <div>

//             </div>
//         )
//     }
// }
    
//     state = {
//         bars: [],
//         xScale: d3.scaleBand().range([0, width]).domain(monthlyLeaks.map((s) => "1")).padding(0.4),
//         yScale: d3.scaleLinear().range([height, 0]).domain(tempData.map((t) => "1")),  
//         colorScale: d3.scaleLinear()
// };

//    // vertical  lines
//         xLines = d3.axisBottom().scale(this.state.xScale)     //ticks?                
//         yLines = d3.axisLeft().scale(this.state.yScale)                      

//         // static getDerivedStateFromProps(nextProps, prevState) {
//         //     if (!nextProps.data) return null; 
//         //     const {data} = nextProps;
//         //     const {xScale, yScale, colorScale} = prevState;
// componentDidUpdate(){
//     d3.select('svg');
//     d3.select('#container');    
// }
    
//     render() {

//         return (
//             <svg width={width} height={height}>
//                 {this.state.bars.map((d, i) =>
//                 (<rect key={i} x={d.x} y={d.y} width='2' height={d.height} fill={d.fill} />))}
//             <g>
//                 <g ref='xScale' transform={`translate(0, ${height - margin.bottom})`} />
//                 <g ref='yScale' transform={`translate(${margin.left}, 0)`} />
//             </g>
//       </svg>
//         )
//     }

// }

// export default BarLine;







// // class BarLine extends Component {


// // export default BarLine;




// const sample = [
// //     {
// //       language: 'Rust',
// //       value: 78.9,
// //       color: '#000000'
// //     },
// //     {
// //       language: 'Kotlin',
// //       value: 75.1,
// //       color: '#00a2ee'
// //     },
// //     {
// //       language: 'Python',
// //       value: 68.0,
// //       color: '#fbcb39'
// //     },
// //     {
// //       language: 'TypeScript',
// //       value: 67.0,
// //       color: '#007bc8'
// //     },
// //     {
// //       language: 'Go',
// //       value: 65.6,
// //       color: '#65cedb'
// //     },
// //     {
// //       language: 'Swift',
// //       value: 65.1,
// //       color: '#ff6e52'
// //     },
// //     {
// //       language: 'JavaScript',
// //       value: 61.9,
// //       color: '#f9de3f'
// //     },
// //     {
// //       language: 'C#',
// //       value: 60.4,
// //       color: '#5d2f8e'
// //     },
// //     {
// //       language: 'F#',
// //       value: 59.6,
// //       color: '#008fc9'
// //     },
// //     {
// //       language: 'Clojure',
// //       value: 59.6,
// //       color: '#507dca'
// //     }
// //   ];

// //   const svg = d3.select('svg');
// //   const svgContainer = d3.select('#container');
// //  const margin = 80;
// //  const width = 1000 - 2 * margin;
// //   const height = 600 - 2 * margin; top up added to top

// //   const chart = svg.append('g')
// //     .attr('transform', `translate(${margin}, ${margin})`); added to bottom 

// //   const xScale = d3.scaleBand() 
// //     .range([0, width])
// //     .domain(sample.map((s) => s.language))
// //     .padding(0.4)                    //mapped over data added to top, bottom down
  
// //   const yScale = d3.scaleLinear()
// //     .range([height, 0])
// //     .domain([0, 100]);  //mapped over data added to top, top up

// //   // vertical grid lines
// //   // const makeXLines = () => d3.axisBottom()
// //   //   .scale(xScale)                     // added to top not defined?

// //   const makeYLines = () => d3.axisLeft()
// //     .scale(yScale)                       //added to top not defined?



// //   chart.append('g')
// //     .attr('transform', `translate(0, ${height})`)
// //     .call(d3.axisBottom(xScale));  //added to bottom  except call

// //   chart.append('g')
// //     .call(d3.axisLeft(yScale)); //added to bottom except call



// //   // vertical grid lines
// //   // chart.append('g')
// //   //   .attr('class', 'grid')
// //   //   .attr('transform', `translate(0, ${height})`)
// //   //   .call(makeXLines()
// //   //     .tickSize(-height, 0, 0)
// //   //     .tickFormat('')
// //   //   )

// //   chart.append('g')
// //     .attr('class', 'grid')
// //     .call(makeYLines()
// //       .tickSize(-width, 0, 0)
// //       .tickFormat('')
// //     )

// //   const barGroups = chart.selectAll()
// //     .data(sample)
// //     .enter()
// //     .append('g')

// //   barGroups
// //     .append('rect')
// //     .attr('class', 'bar')
// //     .attr('x', (g) => xScale(g.language))
// //     .attr('y', (g) => yScale(g.value))
// //     .attr('height', (g) => height - yScale(g.value))
// //     .attr('width', xScale.bandwidth())
// //     .on('mouseenter', function (actual, i) {
// //       d3.selectAll('.value')
// //         .attr('opacity', 0)

// //       d3.select(this)
// //         .transition()
// //         .duration(300)
// //         .attr('opacity', 0.6)
// //         .attr('x', (a) => xScale(a.language) - 5)
// //         .attr('width', xScale.bandwidth() + 10)

// //       const y = yScale(actual.value)

// //       line = chart.append('line')
// //         .attr('id', 'limit')
// //         .attr('x1', 0)
// //         .attr('y1', y)
// //         .attr('x2', width)
// //         .attr('y2', y)

// //       barGroups.append('text')
// //         .attr('class', 'divergence')
// //         .attr('x', (a) => xScale(a.language) + xScale.bandwidth() / 2)
// //         .attr('y', (a) => yScale(a.value) + 30)
// //         .attr('fill', 'white')
// //         .attr('text-anchor', 'middle')
// //         .text((a, idx) => {
// //           const divergence = (a.value - actual.value).toFixed(1)
          
// //           let text = ''
// //           if (divergence > 0) text += '+'
// //           text += `${divergence}%`

// //           return idx !== i ? text : '';
// //         })

// //     })
// //     .on('mouseleave', function () {
// //       d3.selectAll('.value')
// //         .attr('opacity', 1)

// //       d3.select(this)
// //         .transition()
// //         .duration(300)
// //         .attr('opacity', 1)
// //         .attr('x', (a) => xScale(a.language))
// //         .attr('width', xScale.bandwidth())

// //       chart.selectAll('#limit').remove()
// //       chart.selectAll('.divergence').remove()
// //     })

// //   barGroups 
// //     .append('text')
// //     .attr('class', 'value')
// //     .attr('x', (a) => xScale(a.language) + xScale.bandwidth() / 2)
// //     .attr('y', (a) => yScale(a.value) + 30)
// //     .attr('text-anchor', 'middle')
// //     .text((a) => `${a.value}%`)
  
// //   svg
// //     .append('text')
// //     .attr('class', 'label')
// //     .attr('x', -(height / 2) - margin)
// //     .attr('y', margin / 2.4)
// //     .attr('transform', 'rotate(-90)')
// //     .attr('text-anchor', 'middle')
// //     .text('Love meter (%)')

// //   svg.append('text')
// //     .attr('class', 'label')
// //     .attr('x', width / 2 + margin)
// //     .attr('y', height + margin * 1.7)
// //     .attr('text-anchor', 'middle')
// //     .text('Languages')

// //   svg.append('text')
// //     .attr('class', 'title')
// //     .attr('x', width / 2 + margin)
// //     .attr('y', 40)
// //     .attr('text-anchor', 'middle')
// //     .text('Most loved programming languages in 2018')

// //   svg.append('text')
// //     .attr('class', 'source')
// //     .attr('x', width - margin / 2)
// //     .attr('y', height + margin * 1.7)
// //     .attr('text-anchor', 'start')
// //     .text('Source: Stack Overflow, 2018')
