import React, { useState, useEffect } from 'react'
import Axios from 'axios'
var total=''
function DataSection(props)
{
    const [ShowData,SetShowData] = useState({
        totalConfirm:''
    })
    Axios.get("https://api.covid19india.org/data.json").then(async function(d){
        total =''
        // for(var key in d.data.cases_time_series)
        // {
        //     total=d.data.cases_time_series[key].totalconfirmed
        // }
        await SetShowData({
            totalConfirm:ShowData.totalConfirm+total
        })
    })
    useEffect(()=>{
        console.log("showdata")
    },[total])
    return ShowData.totalConfirm
}

export default DataSection