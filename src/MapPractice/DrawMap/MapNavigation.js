

function MapNavigation(state,response){
    


    var data= {
        ...response.data.statewise
    }
    // console.log(response)
    for(var key in data)
    {
        if(state.st_nm===response.data.statewise[key].state)
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

export default MapNavigation