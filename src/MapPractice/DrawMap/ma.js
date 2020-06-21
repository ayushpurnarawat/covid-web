import React, { useEffect ,useState} from 'react'
import * as d3 from 'd3' 
import Axios from 'axios'
import MapNavigation from './MapNavigation'
// var stat= null
var Response = {}
function TestMap (){
  
          const [state_Name,SetState_Name] = useState({
            state_Name:'',
            ActiveCases:'',
            Confrim:'',
            Death:'',
            Recoverd:''
          });

            useEffect(()=>{
              // console.log("useEffect")
            },[state_Name])  

  
                function map(){
                            
                                // var width = 550
                                // var height = 400
                                var svg = d3.select('#map')
                                .append('svg')
                                .attr('width','432px')
                                .attr('height','600px')
                                // .attr('viewBox','0 0 632 800')
                                // .attr('transform','translate(10,30)')

                                // var path = d3.geoPath();
                                var projection = d3.geoMercator()
                                  .scale(730)
                               // .center([0,0])

                                .translate([-850, 550]);

                                // Data and color scale
                                var data = d3.map();
                                var colorScale = d3.scaleThreshold()
                                  .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
                                  .range(d3.schemeDark2[5]);

                                Axios.get('https://api.covid19india.org/data.json').then(function(res){
                                    Response={
                                      ...res
                                    }
                                })
                                d3.json("./india.geojson").then(function(data){
                                    // console.log(data,"delhi")
                                    ready(data)
                                })

                                        function ready(todo) 
                                        {

                                                  let mouseOver = function(d) {
                                                    d3.selectAll(".State")
                                                      .transition()
                                                      .duration(200)
                                                      .style("opacity", .5)
                                                    d3.select(this)
                                                      .transition()
                                                      .duration(200)
                                                      .style("opacity", 1)
                                                      .style("stroke", "black")
                                                    // console.log(d.properties.st_nm)
                                                    // stat = d.properties.st_nm
                                                    var [state,Active,confirm,deat,recoverd]=MapNavigation(d.properties,Response)
                                                    // ChangeState(stateNames)
                                                    // console.log(deat)
                                                    SetState_Name({
                                                      state_Name:state,
                                                      Confrim:confirm,
                                                      Recoverd:recoverd,
                                                      ActiveCases:Active,
                                                      Death:deat})

                                                    // console.log(state,"==",Active)
                                                  }
                                                  
                                                  // console.log("error","topo",todo)
                                                  let mouseLeave = function(d) 
                                                                    {
                                                                      d3.selectAll(".State")
                                                                        .transition()
                                                                        .duration(200)
                                                                        .style("opacity", .8)
                                                                      d3.select(this)
                                                                        .transition()
                                                                        .duration(200)
                                                                        .style("stroke", "transparent")
                                                                    }
                                                  let onClick = function(d)
                                                                    {
                                                                      d3.selectAll('.State')
                                                                      .transition()
                                                                      .duration(200)
                                                                      .style("opacity", .8)
                                                                      d3.select(this)
                                                                      .transition()
                                                                      .duration(200)
                                                                      .style("stroke",'red')
                                                                      console.log(d)
                                                                    }
                                                  // Draw the map
                                                  svg.append("g")
                                                    .selectAll("path")
                                                    .data(todo.features)
                                                    .enter()
                                                    .append("path")
                                                      // draw each country
                                                      .attr("d", d3.geoPath()
                                                        .projection(projection)
                                                      )
                                                  // set the color of each country
                                                  .attr("fill", function (d) {
                                                    d.total = data.get(d.id) || 0;
                                                    return colorScale(d.total);
                                                  })
                                                  .style("stroke", "transparent")
                                                  .attr("class", function(d){ return "State" } )
                                                  .style("opacity", .8)
                                                  .on("mouseover", mouseOver )
                                                  .on("mouseleave", mouseLeave )
                                                  .on("click",onClick)
                                                
                                        }
                              }
  // console.log(this.state.stateName,"stafdcg")
  return(
    <div id='map'>
      <button onClick={map}>click</button>
      <div style={{border:'2px solid black',width:'250px',height:'200px'}}>
      <div>State:-{state_Name.state_Name}</div>
      <div>Confrim:-{state_Name.Confrim}</div>
      <div>Recoverd:-{state_Name.Recoverd}</div>
      <div> ActiveCases:-{state_Name.ActiveCases}</div>
      <div>Death:-{state_Name.Death}</div>

      </div>
    </div>
  )



}
  


export default TestMap