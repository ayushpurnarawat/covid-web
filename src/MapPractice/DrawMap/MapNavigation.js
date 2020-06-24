import React, { useRef } from 'react'
import * as d3 from 'd3'
function MapNavigation(Region,response,MapName){
    
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(getPosi)
    }
    function getPosi(position){
        // console.log(position)
    }
    // console.log(response)
    var data= {
        ...response.data.statewise
    }
    // var svg = useRef(null)
    //     console.log(svg)
    
    // console.log(MapName)
    if(MapName==='india'){
    for(var key in data)
    {
        if(Region.st_nm===response.data.statewise[key].state)
        {
            // console.log("Active Cases in-> ",response.data.statewise[key].state,"is-> ",response.data.statewise[key].deaths)
            return  [response.data.statewise[key].state,
            response.data.statewise[key].active,
            response.data.statewise[key].confirmed,
            response.data.statewise[key].deaths,
            response.data.statewise[key].recovered
            ]
        }
    }
    }
    else{
        var state_name_response = Region.st_nm 
        var district_name_response = Region.district
        var DistrictData={
            ...response.data[state_name_response].districtData
        }
        
        // console.log(DistrictData)

        
        // console.log(response.data[state_name_response].districtData[district_name_response])
        return[
            district_name_response,
            response.data[state_name_response].districtData[district_name_response].active,
            response.data[state_name_response].districtData[district_name_response].confirmed,
            response.data[state_name_response].districtData[district_name_response].deceased
        ]
    }
    
}

export default MapNavigation