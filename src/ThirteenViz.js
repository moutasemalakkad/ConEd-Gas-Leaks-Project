// import React, { Component } from "react";
// import "semantic-ui-css/semantic.min.css";
// import * as d3 from 'd3v4';
// import * as topojson from 'topojson';

// class Thirteen extends Component {
//     state = {
//         usData: null,
//         usCongress: null
//     }
//     UNSAFE_componentWillMount(){
//       d3.queue()
//         .defer(d3.json,"https://bl.ocks.org/mbostock/raw/4090846/us.json")
//         .defer(d3.json,"https://bl.ocks.org/mbostock/raw/4090846/us-congress-113.json")
//         .await((error, usData, usCongress) => {
//             this.setState({
//                 usData,
//                 usCongress
//             });
//         })
//     }

//     componentDidUpdate() {
//         const svg = d3.select(this.refs.anchor),
//         {width, height } = this.props;

//         const projection = d3.geoAlbersUSA()
//             .scale(1280)
//             .translate([width / 2, height / 2]);

//         const path = d3.geoPath(projection);
//         const us = this.state.usData,
//             congress = this.state.usCongress

//         svg.append("defs").append("path")
//       .attr("id", "land")
//       .datum(topojson.feature(us, us.objects.land))
//       .attr("d", path);

//   svg.append("clipPath")
//       .attr("id", "clip-land")
//     .append("use")
//       .attr("xlink:href", "#land");

//   svg.append("g")
//       .attr("class", "districts")
//       .attr("clip-path", "url(#clip-land)")
//     .selectAll("path")
//       .data(topojson.feature(congress, congress.objects.districts).features)
//     .enter().append("path")
//       .attr("d", path)
//     .append("title")
//       .text(function(d) { return d.id; });

//   svg.append("path")
//       .attr("class", "district-boundaries")
//       .datum(topojson.mesh(congress, congress.objects.districts, function(a, b) { return a !== b && (a.id / 1000 | 0) === (b.id / 1000 | 0); }))
//       .attr("d", path);

//   svg.append("path")
//       .attr("class", "state-boundaries")
//       .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
//       .attr("d", path);

//     }
//      render() {
//         const {usData, usCongress } = this.state;
       
//         if(!usData || !usCongress) {
//             return null;
//         }
//         return <g ref="layout" />;
//     }
// }
// export default Thirteen;







// //class Thirteen extends Component {
//     // state = {
//     //     leaks: null,
//     //     temps: null
//     // }
//     // UNSAFE_componentWillMount(){
//     //   d3.queue()
//     //     .defer(d3.json,"http://127.0.0.1:5000/api/monthly-leaks")
//     //     .defer(d3.json,"http://127.0.0.1:5000/api/monthly-temps")
//     //     .await((error, leaks, temps ) => {
//     //         this.setState({
//     //             leaks,
//     //             temps
//     //         });
//     //     })
//     // }

//     // componentDidUpdate() {
//             // const svg = d3.select(this.refs.anchor)
//             // const margin = 80
//             // const width = 1000 - 2 * margin
//             // const height = 600 - 2 * margin
//             // const leaks = this.state.leaks;
//             // const temps = this.state.temps

//             // const monthTemps = [
//             //     {
//             //       month: 'Jan',
//             //       temp: 78.9,
            
//             //     },
//             //     {
//             //       month: 'Feb',
//             //       temp: 75.1
//             //     },
//             //     {
//             //       month: 'Mar',
//             //       temp: 68.0,
//             //     },
//             //     {
//             //       month: 'Apr',
//             //       temp: 97.0,
//             //     },
//             //     {
//             //       month: 'May',
//             //       temp: 55.6
//             //     },
//             //     {
//             //       month: 'Jun',
//             //       temp: 35.1
//             //     },
//             //     {
//             //       month: 'Jul',
//             //       temp: 71.9
//             //     },
//             //     {
//             //       month: 'Aug',
//             //       temp: 40.4
//             //     },
//             //     {
//             //       month: 'Sep',
//             //       temp: 59.6
//             //     },
//             //     {
//             //       month: 'Oct',
//             //       temp: 59.6
//             //     },
//             //     {
//             //         month: 'Nov',
//             //         temp: 89.6
//             //       },
//             //       {
//             //         month: 'Dec',
//             //         temp: 19.6
//             //       }
//             //   ];
//             //placeholder data above
            
//         //       const svg = d3.select('svg');
//         //       const margin = 80;
//         //       const width = 1000 - 2 * margin;
//         //       const height = 600 - 2 * margin;
            
//         //       const chart = svg.append('g')
//         //         .attr('transform', `translate(${margin}, ${margin})`);
            
//         //       const xScale = d3.scaleBand()
//         //         .range([0, width])
//         //         .domain(monthTemps.map((s) => s.month))
//         //         .padding(0.4)
              
//         //       const yScale = d3.scaleLinear()
//         //         .range([height, 0])
//         //         .domain([0, 100]);
            
//         //       const makeYLines = () => d3.axisLeft()
//         //         .scale(yScale)
            
//         //       chart.append('g')
//         //         .attr('transform', `translate(0, ${height})`)
//         //         .call(d3.axisBottom(xScale));
            
//         //       chart.append('g')
//         //         .call(d3.axisLeft(yScale));
            
//         //       chart.append('g')
//         //         .attr('class', 'grid')
//         //         .call(makeYLines()
//         //           .tickSize(-width, 0, 0)
//         //           .tickFormat('')
//         //         )
            
//         //       const barGroups = chart.selectAll()
//         //         .data(monthTemps)
//         //         .enter()
//         //         .append('g')
            
//         //       barGroups
//         //         .append('rect')
//         //         .attr('class', 'bar')
//         //         .attr('x', (g) => xScale(g.month))
//         //         .attr('y', (g) => yScale(g.temp))
//         //         .attr('height', (g) => height - yScale(g.temp))
//         //         .attr('width', xScale.bandwidth())
//         //         .on('mouseenter', function (actual, i) {
//         //           d3.selectAll('.temp')
//         //             .attr('opacity', 0)
            
//         //           d3.select(this)
//         //             .transition()
//         //             .duration(300)
//         //             .attr('opacity', 0.6)
//         //             .attr('x', (a) => xScale(a.month) - 5)
//         //             .attr('width', xScale.bandwidth() + 10)
            
            
//         //           barGroups.append('text')
//         //             .attr('class', 'divergence')
//         //             .attr('x', (a) => xScale(a.month) + xScale.bandwidth() / 2)
//         //             .attr('y', (a) => yScale(a.temp) + 30)
//         //             .attr('fill', 'white')
//         //             .attr('text-anchor', 'middle')
//         //             .text((a, idx) => {
//         //               const divergence = (a.temp - actual.temp).toFixed(1)
                      
//         //               let text = ''
//         //               if (divergence > 0) text += '+'
//         //               text += `${divergence}`
            
//         //               return idx !== i ? text : '';
//         //             })
            
//         //         })
//         //         .on('mouseleave', function () {
//         //           d3.selectAll('.temp')
//         //             .attr('opacity', 1)
            
//         //           d3.select(this)
//         //             .transition()
//         //             .duration(300)
//         //             .attr('opacity', 1)
//         //             .attr('x', (a) => xScale(a.month))
//         //             .attr('width', xScale.bandwidth())
            
//         //           chart.selectAll('#limit').remove()
//         //           chart.selectAll('.divergence').remove()
//         //         })
            
//         //       barGroups 
//         //         .append('text')
//         //         .attr('class', 'temp')
//         //         .attr('x', (a) => xScale(a.month) + xScale.bandwidth() / 2)
//         //         .attr('y', (a) => yScale(a.temp) + 30)
//         //         .attr('text-anchor', 'middle')
//         //         .text((a) => `${a.temp}`)
              
//         //       svg
//         //         .append('text')
//         //         .attr('class', 'label')
//         //         .attr('x', -(height / 2) - margin)
//         //         .attr('y', margin / 2.4)
//         //         .attr('transform', 'rotate(-90)')
//         //         .attr('text-anchor', 'middle')
//         //         .text('Temperature')
            
//         //       svg.append('text')
//         //         .attr('class', 'label')
//         //         .attr('x', width / 2 + margin)
//         //         .attr('y', height + margin * 1.7)
//         //         .attr('text-anchor', 'middle')
//         //         .text('Months')
            
//         //       svg.append('text')
//         //         .attr('class', 'title')
//         //         .attr('x', width / 2 + margin)
//         //         .attr('y', 40)
//         //         .attr('text-anchor', 'middle')
//         //         .text('2013 Gas Leaks Vs Temeparture')
            
//         //       svg.append('text')
//         //         .attr('class', 'source')
//         //         .attr('x', width - margin / 2)
//         //         .attr('y', height + margin * 2.7)
//         //         .attr('text-anchor', 'start')
//         //         .text('Con Edison Data, 2018')    
//         // }
//     // render() {
//         // const {leaks, temps } = this.state;

//         // let leaksYear = Object.entries(leaks);
//         // console.log('leaksYear', leaksYear);

//         // leaksYear.forEach(function(item,index, array){
//         //     console.log(index, item, array);
//         // })

//         // let tempsYear = Object.entries(temps);
//         // console.log('tempsYear', tempsYear);
       
//         // if(!leaks || !temps) {
//            //  return null;
//         // }
//         //return <g ref="layout" />;
//     //}
// //}
// //export default Thirteen;




// // // // const MonthlyLeaksTemps = () => {
// // // //     const [hasError, setErrors] = useState(false);
// // // //     const [monthlyLeaks, setMonthlyLeaks] = useState({});
// // // //     const [monthlyTemps, setMonthlyTemps] = useState({});
  
// // // //     async function fetchData() {
// // // //       const resLeaks = await fetch("http://127.0.0.1:5000/api/monthly-leaks");
// // // //       const resTemps = await fetch("http://127.0.0.1:5000/api/monthly-temps");
  
// // // //       resLeaks
// // // //         .json()
// // // //         .then(resLeaks => setMonthlyLeaks(resLeaks))
// // // //         .catch(err => setErrors(err));
        
// // // //       resTemps
// // // //       .json()
// // // //       .then(resTemps => setMonthlyTemps(resTemps))
// // // //       .catch(err => setErrors(err));
// // // //     }
  
// // // //     useEffect(() => {
// // // //       fetchData();
// // // //     });
// // // //     MonthlyLeaksTemps();
// // // //     // return (
// // // //     //   <div>
// // // //     //     <span>{JSON.stringify(monthlyLeaks)}</span>
// // // //     //     <hr />
// // // //     //     <span>Has error: {JSON.stringify(hasError)}</span>
// // // //     //     <hr />
  
// // // //     //     <span>{JSON.stringify(monthlyTemps)}</span>
// // // //     //     <hr />    
// // // //     //     <span>Has error: {JSON.stringify(hasError)}</span>
// // // //     //   </div>
// // // //     // );
// // // //   };


// // // // const sample = [
// // // // //     {
// // // // //       language: 'Rust',
// // // // //       value: 78.9,
// // // // //       color: '#000000'
// // // // //     },
// // // // //     {
// // // // //       language: 'Kotlin',
// // // // //       value: 75.1,
// // // // //       color: '#00a2ee'
// // // // //     }]


// // // // //   const svg = d3.select('svg');
// // // // //   const svgContainer = d3.select('#container');
// // // // //  const margin = 80;
// // // // //  const width = 1000 - 2 * margin;
// // // // //   const height = 600 - 2 * margin; top up added to top

// // // // //   const chart = svg.append('g')
// // // // //     .attr('transform', `translate(${margin}, ${margin})`); added to bottom 

// // // // //   const xScale = d3.scaleBand() 
// // // // //     .range([0, width])
// // // // //     .domain(sample.map((s) => s.language))
// // // // //     .padding(0.4)                    //mapped over data added to top, bottom down
  
// // // // //   const yScale = d3.scaleLinear()
// // // // //     .range([height, 0])
// // // // //     .domain([0, 100]);  //mapped over data added to top, top up

// // // // //   // vertical grid lines
// // // // //   // const makeXLines = () => d3.axisBottom()
// // // // //   //   .scale(xScale)                     // added to top not defined?

// // // // //   const makeYLines = () => d3.axisLeft()
// // // // //     .scale(yScale)                       //added to top not defined?



// // // // //   chart.append('g')
// // // // //     .attr('transform', `translate(0, ${height})`)
// // // // //     .call(d3.axisBottom(xScale));  //added to bottom  except call

// // // // //   chart.append('g')
// // // // //     .call(d3.axisLeft(yScale)); //added to bottom except call



// // // // //   // vertical grid lines
// // // // //   // chart.append('g')
// // // // //   //   .attr('class', 'grid')
// // // // //   //   .attr('transform', `translate(0, ${height})`)
// // // // //   //   .call(makeXLines()
// // // // //   //     .tickSize(-height, 0, 0)
// // // // //   //     .tickFormat('')
// // // // //   //   )

// // // // //   chart.append('g')
// // // // //     .attr('class', 'grid')
// // // // //     .call(makeYLines()
// // // // //       .tickSize(-width, 0, 0)
// // // // //       .tickFormat('')
// // // // //     )

// // // // //   const barGroups = chart.selectAll()
// // // // //     .data(sample)
// // // // //     .enter()
// // // // //     .append('g')

// // // // //   barGroups
// // // // //     .append('rect')
// // // // //     .attr('class', 'bar')
// // // // //     .attr('x', (g) => xScale(g.language))
// // // // //     .attr('y', (g) => yScale(g.value))
// // // // //     .attr('height', (g) => height - yScale(g.value))
// // // // //     .attr('width', xScale.bandwidth())
// // // // //     .on('mouseenter', function (actual, i) {
// // // // //       d3.selectAll('.value')
// // // // //         .attr('opacity', 0)

// // // // //       d3.select(this)
// // // // //         .transition()
// // // // //         .duration(300)
// // // // //         .attr('opacity', 0.6)
// // // // //         .attr('x', (a) => xScale(a.language) - 5)
// // // // //         .attr('width', xScale.bandwidth() + 10)

// // // // //       const y = yScale(actual.value)

// // // // //       line = chart.append('line')
// // // // //         .attr('id', 'limit')
// // // // //         .attr('x1', 0)
// // // // //         .attr('y1', y)
// // // // //         .attr('x2', width)
// // // // //         .attr('y2', y)

// // // // //       barGroups.append('text')
// // // // //         .attr('class', 'divergence')
// // // // //         .attr('x', (a) => xScale(a.language) + xScale.bandwidth() / 2)
// // // // //         .attr('y', (a) => yScale(a.value) + 30)
// // // // //         .attr('fill', 'white')
// // // // //         .attr('text-anchor', 'middle')
// // // // //         .text((a, idx) => {
// // // // //           const divergence = (a.value - actual.value).toFixed(1)
          
// // // // //           let text = ''
// // // // //           if (divergence > 0) text += '+'
// // // // //           text += `${divergence}%`

// // // // //           return idx !== i ? text : '';
// // // // //         })

// // // // //     })
// // // // //     .on('mouseleave', function () {
// // // // //       d3.selectAll('.value')
// // // // //         .attr('opacity', 1)

// // // // //       d3.select(this)
// // // // //         .transition()
// // // // //         .duration(300)
// // // // //         .attr('opacity', 1)
// // // // //         .attr('x', (a) => xScale(a.language))
// // // // //         .attr('width', xScale.bandwidth())

// // // // //       chart.selectAll('#limit').remove()
// // // // //       chart.selectAll('.divergence').remove()
// // // // //     })

// // // // //   barGroups 
// // // // //     .append('text')
// // // // //     .attr('class', 'value')
// // // // //     .attr('x', (a) => xScale(a.language) + xScale.bandwidth() / 2)
// // // // //     .attr('y', (a) => yScale(a.value) + 30)
// // // // //     .attr('text-anchor', 'middle')
// // // // //     .text((a) => `${a.value}%`)
  
// // // // //   svg
// // // // //     .append('text')
// // // // //     .attr('class', 'label')
// // // // //     .attr('x', -(height / 2) - margin)
// // // // //     .attr('y', margin / 2.4)
// // // // //     .attr('transform', 'rotate(-90)')
// // // // //     .attr('text-anchor', 'middle')
// // // // //     .text('Love meter (%)')

// // // // //   svg.append('text')
// // // // //     .attr('class', 'label')
// // // // //     .attr('x', width / 2 + margin)
// // // // //     .attr('y', height + margin * 1.7)
// // // // //     .attr('text-anchor', 'middle')
// // // // //     .text('Languages')

// // // // //   svg.append('text')
// // // // //     .attr('class', 'title')
// // // // //     .attr('x', width / 2 + margin)
// // // // //     .attr('y', 40)
// // // // //     .attr('text-anchor', 'middle')
// // // // //     .text('Most loved programming languages in 2018')

// // // // //   svg.append('text')
// // // // //     .attr('class', 'source')
// // // // //     .attr('x', width - margin / 2)
// // // // //     .attr('y', height + margin * 1.7)
// // // // //     .attr('text-anchor', 'start')
// // // // //     .text('Source: Con Edison 2019')
