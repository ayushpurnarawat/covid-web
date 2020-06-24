import React, { useEffect ,useState} from 'react'
import * as d3 from 'd3' 
import Axios from 'axios'
import MapNavigation from './MapNavigation'
import updateMap from './updateMap'
import Classes from './TestMap.module.css'
import { svg } from 'd3'
import DataSection from './DataSection'
import * as topojson from 'topojson'
// var stat= null
var Response = {}
function TestMap (props){
          
          const [state_Name,SetState_Name] = useState({
            state_Name:'India',
            ActiveCases:'',
            Confrim:'',
            Death:'',
            Recoverd:''
          
          });

          const [ToggleMap,SetToggleMap]=useState({
            ChangeMap:false
          })
          const [Region,SetRegion]=useState({
            Region_Name:'india'
          })

          useEffect(()=>{
            console.log(Region.Region_Name)
            SetToggleMap({
              ChangeMap:true
            })
            map(Region.Region_Name)
            
            
          },[Region])
         
          const [ChangeRegion,SetChangeRegion]=useState({
            Region:'india',
            ChangeJsonData:'',
            DistrictName:'',
            ActiveCases:'',
            ConfirmCases:'',
            Deaths:'',
            ChangeMap:false
          })
          useEffect(()=>{
            console.log(ToggleMap.ChangeMap)
          },[ChangeRegion.ActiveCases])
            // useEffect(()=>{
            // },[state_Name])  

            // useEffect(()=>{
            //   console.log(ChangeRegion.Region)
            //   map(ChangeRegion.Region)
            // },[ChangeRegion])
  
                function map(region){
                                const winWidth =window.innerWidth
                                const MAP_BUFFER_MARGINS = 42;
                                const MAP_LEGEND_HEIGHT = 50;
                                const INDIA_ASPECT_RATIO = 0.885;
                                var widths =0
                                const ScallingFactor = winWidth > 769 ? 0.9:1
                                if(1)
                                widths=winWidth >769 ? 480 : winWidth
                                const mapHeight = (ScallingFactor * 500) / INDIA_ASPECT_RATIO;
                                const height= MAP_BUFFER_MARGINS + MAP_LEGEND_HEIGHT+mapHeight
                                console.log(`WindowInner=${winWidth} and width ${widths} scalingFactor ${ScallingFactor} ==${mapHeight}}`)
                                console.log(region)
                                var MapType = 'MapSection'
                                var scale=530
                                var scale_width=-580
                                var scale_height=450
                                console.log(ToggleMap.ChangeMap,"MapFuncrtion")
                                // if(Region.Region_Name!=='india')
                                // {
                                  
                                //   SetToggleMap({
                                //     ChangeMap:true
                                //   })
                                // }
                                // var width = 550
                                // var height = 400
                                if(Region.Region_Name!=='india'){
                                  console.log("toggle")
                                  // d3.selectAll(`#${MapType} > *`).remove()
                                d3.selectAll("svg").remove()
                                
                                MapType='MapSection'
                                  // SetToggleMap({
                                  //   ChangeMap:false
                                  // })
                                  scale=900
                                  scale_width=-2050
                                  scale_height=1200
                                  // d3.select("#MapSection")
                                  // .remove('svg')
                                }
                                
                                // .attr('viewBox','0 0 632 800')
                                // .attr('transform','translate(10,30)')

                                // var path = d3.geoPath();
                                
                                // var projection = d3.geoMercator()
                                //     .scale(scale)  

                               // .center([0,0])

                                // .translate([scale_width, scale_height]);

                                // Data and color scale
                                var data = d3.map();
                                var colorScale = d3.scaleThreshold()
                                  .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
                                  .range(d3.schemeDark2[5]);
                                if(region==='india')
                                Axios.get('https://api.covid19india.org/data.json').then(function(res){
                                    Response={
                                      ...res
                                    }
                                })
                                else{
                                  Axios.get('https://api.covid19india.org/state_district_wise.json').then(function(res){
                                    Response={
                                      ...res
                                    }
                                })
                                }
                                d3.json(`./Maps/${region}.geojson`).then(function(data){
                                    // console.log(data,"delhi")
                                    ready(data)
                                })
                                d3.json(`./Maps/india.json`).then(function(data){
                                  console.log(data,"delhi")
                                  const topology = topojson.feature(
                                    data,
                                    data.objects["india-districts-2019-734"|| "india-states"]
                                  );
                                  console.log(topology)
                              })

                              
                          
                                        function ready(todo) 
                                        {
                                          // const topology = topojson.feature({
                                          //   todo,
                                          //   todo.objects
                                          // })
                                    //       var projection = d3.geoMercator()
                                    // .scale(scale)  
                                    // .translate([scale_width, scale_height]);
                                          var projection = d3.geoMercator()
                                            .fitSize([320,450],todo)
                                          var path = d3.geoPath(projection)

                                          console.log(todo)
                                          var svg = d3.select(`#${MapType}`)
                                          .append('svg')
                                          // .attr('width','500px')
                                          // .attr('height','600px')
                                          .attr('viewBox',"0 0 400 400")
                                          .attr("margin-left","5px")
                                          .attr("id",`the_SVG_ID_${MapType}`)
                                          // .style('position','absolute')
                                          
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
                                                    if(region==='india')
                                                    {
                                                      // console.log(d)
                                                    var [state,Active,confirm,deat,recoverd]=MapNavigation(d.properties,Response,region)
                                                    SetState_Name({
                                                      state_Name:state,
                                                      Confrim:confirm,
                                                      Recoverd:recoverd,
                                                      ActiveCases:Active,
                                                      Death:deat
                                                    })
                                                  }
                                                    else{
                                                    // console.log(d.properties,"mouseOver")
                                                    var [districtName,active,Confirm,death] = MapNavigation(d.properties,Response,region)
                                                      SetChangeRegion({
                                                        DistrictName:districtName,
                                                        ActiveCases:active,
                                                        ConfirmCases:Confirm,
                                                        Deaths:death,
                                                        Region:region
                                                      })
                                                    }
                                                    
                                                  }
                                                  
                                                  // console.log("error","topo",todo)
                                                  let mouseLeave = function(d) 
                                                                    {
                                                                      d3.selectAll(".State")
                                                                        .transition()
                                                                        .duration(100)
                                                                        .style("opacity", 1)
                                                                      d3.select(this)
                                                                        .transition()
                                                                        .duration(100)
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
                                                                      .style("stroke",'transparent')
                                                                      console.log((d.properties.st_nm).replace(" ","").toLowerCase())
                                                                      // SetChangeRegion({
                                                                      //   Region:(d.properties.st_nm).replace(" ","").toLowerCase(),
                                                                      //   ChangeMap:true
                                                                      // })
                                                                      svg.selectAll("*").remove()
                                                                      SetRegion({
                                                                        Region_Name:(d.properties.st_nm).replace(" ","").toLowerCase()
                                                                
                                                                      })
                                                                    }
                                                    let onTouch= function(d){
                                                      d3.select('.State')
                                                      .transition()
                                                      .duration(200)
                                                      .style("opacity",.8)
                                                      d3.select(this)
                                                      .transition()
                                                      .duration(200)
                                                      .style('stroke','orange')
                                                    }
                                                  // Draw the map
                                                  svg.append("g")
                                                  .style('margin-left',10)
                                                    .selectAll("path")
                                                    .data(todo.features)
                                                    .enter()
                                                    .append("path")
                                                    
                                                      // draw each country
                                                      // .attr("d", d3.geoPath()
                                                      //   .projection(projection)
                                                      // )
                                                      .attr("d",path)
                                                  // set the color of each country
                                                  .attr("fill", function (d,i) {
                                                    
                                                    d.total = data.get(d.id) || 0;
                                                    // return colorScale(d.total);
                                                    // console.log(Response.data)
                                                    return d3.interpolatePRGn(d.properties.st_code/100)
                                                  })
                                                  .style("stroke", "transparent")
                                                  .attr("class", function(d){ return "State" } )
                                                  .style("opacity", .8)
                                                  .on("mouseover", mouseOver )
                                                  .on("mouseleave", mouseLeave )
                                                  .on("click",onClick)
                                                  .on('touchstart',onTouch)

                                                  
                                        }
                        
                                     
                              }
  // console.log(this.state.stateName,"stafdcg")
  if(Region.Region_Name==='india'){
  return(
    <div data={state_Name.Confrim}>
      <h2 style={{color:'white'}}>{state_Name.state_Name}</h2>
      <DataSection data={state_Name.Recoverd}/>

    <div style={{display:'flex',flexDirection:'row'}} data={"ayush"} id="ayush">
      
      <div className={Classes.Map_Data_Confirm} id="confirm">
          <div className={Classes.Map_Data_Confirm_focus}>
            <h5>Confirmed</h5>
          </div>
          <div className={Classes.Map_Data_Confirm_Number}>
          <h3>{state_Name.Confrim}</h3>
          </div>
          
      </div>
      <div className={Classes.Map_Data_Active}>
          <div className={Classes.Map_Data_Confirm_focus}>
            <h5>Active</h5>
          </div>
          <div className={Classes.Map_Data_Confirm_Number}>
          <h3>{state_Name.ActiveCases}</h3>
          </div>
      </div>
      
      <div className={Classes.Map_Data_Recover}>
          <div className={Classes.Map_Data_Confirm_focus}>
            <h5>Recoverd</h5>
          </div>
          <div className={Classes.Map_Data_Confirm_Number}>
          <h3>{state_Name.Recoverd}</h3>
          </div>
      </div>
      <div className={Classes.Map_Data_Death}>
          <div className={Classes.Map_Data_Confirm_focus}>
            <h5>Deceased</h5>
          </div>
          <div className={Classes.Map_Data_Confirm_Number}>
          <h3>{state_Name.Death}</h3>
          </div>
      </div>
      
    </div>
    </div>
  )}
    else {
      return(
        <div>
          <h2 style={{color:'white'}}>{ChangeRegion.DistrictName}</h2>
        
        <div id='map' style={{display:'flex',flexDirection:'row'}}>
                

          <div style={{display:'flex',flexDirection:'row'}} data={"ayush"} id="ayush">
      
      <div className={Classes.Map_Data_Confirm} id="confirm">
          <div className={Classes.Map_Data_Confirm_focus}>
            <h5>Confirmed</h5>
          </div>
          <div className={Classes.Map_Data_Confirm_Number}>
          <h3>{ChangeRegion.ConfirmCases}</h3>
          </div>
          
      </div>
      <div className={Classes.Map_Data_Active}>
          <div className={Classes.Map_Data_Confirm_focus}>
            <h5>Active</h5>
          </div>
          <div className={Classes.Map_Data_Confirm_Number}>
          <h3>{ChangeRegion.ActiveCases}</h3>
          </div>
      </div>
      
      {/* <div className={Classes.Map_Data_Recover}>
          <div className={Classes.Map_Data_Confirm_focus}>
            <h5>Recoverd</h5>
          </div>
          <div className={Classes.Map_Data_Confirm_Number}>
          <h3>{ChangeR}</h3>
          </div>
      </div> */}

      <div className={Classes.Map_Data_Death}>
          <div className={Classes.Map_Data_Confirm_focus}>
            <h5>Deceased</h5>
          </div>
          <div className={Classes.Map_Data_Confirm_Number}>
          <h3>{ChangeRegion.Deaths}</h3>
          </div>
      </div>
      
    </div>
        
        {/* <div style={{border:'2px solid black',width:'250px',height:'200px'}}>
        <div className={Classes.Detail}>DistrictName:-{ChangeRegion.DistrictName}</div>
        <div className={Classes.Detail}>Confrim:-{ChangeRegion.ConfirmCases}</div>
        {/* <div>Recoverd:-{ChangeRegion.r}</div> */}
        {/* <div className={Classes.Detail}> ActiveCases:-{ChangeRegion.ActiveCases}</div>
        <div className={Classes.Detail}>Death:-{ChangeRegion.Deaths}</div> */}
  
        {/* </div> */}
      </div>
      </div>
      )
    }


}
  


export default TestMap