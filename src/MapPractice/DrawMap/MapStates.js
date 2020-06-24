import React, { Component, useRef, useEffect, Suspense } from 'react'
import TestMap from './ma'
import classes from './MapStates.module.css'
import Axios from 'axios'
import LoliPopChart from '../../FinaleChart/LolliPopChart'
import BarPlot from '../../FinaleChart/BarPlot'
import * as d3 from 'd3'
import { timeDay, timeout } from 'd3'
import Sus from './SuspenseData'
const SuspenseComponent = React.lazy(()=>import('./SuspenseData'))
var totalconfirmed=0
var totalrecovered=0
var totaldeceased=0

class MapStates extends Component{
    state = {
        done:false,
        ref:0

    }
    
    componentDidMount(){
        Axios.get('https://api.covid19india.org/data.json').then(function(d){
            // console.log(d.data.cases_time_series)
            for(var key in d.data.cases_time_series)
            {
                // Data_Data_Section.push({
                //     totalconfirmed:totalconfirmed+d.data.cases_time_series[key].totalconfirmed,
                //     totalrecovered:d.data.cases_time_series[key].totalrecovered,
                //     totaldeceased:d.data.cases_time_series[key].totaldeceased
                // })
                totalconfirmed=d.data.cases_time_series[key].totalconfirmed
                totalrecovered=d.data.cases_time_series[key].totalrecovered
                totaldeceased=d.data.cases_time_series[key].totaldeceased
            }
            
        })
        
        
    }
    TimeOut=()=>{
        setTimeout(()=>{
            this.setState({ref:totalconfirmed})
        },5000)
        console.log("timeOut")
    }
    render()
    {
        // this.TimeOut()
        return(
            <div id="MapStates" className={classes.main}>
                <div id='DataSection' className={classes.DataSection} >
                    <div style={{display:'flex',flexDirection:'row',height:'200px',flex:'1'}}>
                                             
                    <div className={classes.Change_Country}>
                            <div className={classes.Change_Country_HighLight}>
                                    <h3 className={classes.ConfirmCases_p}>Country name</h3>
                            </div>
                    </div>
                    
                    <div className={classes.ConfirmCases}>
                            {/* <h3 className={classes.ConfirmCases_p}>Confirm</h3>
                            <h2 className={classes.ConfirmCases_p}>420000</h2> */}
                            <h2 >{this.state.ref}</h2>
                            <div className={classes.ConfirmCases_HighLight}>
                            
                                <h3 className={classes.ConfirmCases_p}>Confirm</h3>
                            </div>
                    </div>
                    <div className={classes.ActiveCases}>
                            {/* <h3 className={classes.ActiveCases_h}>Actice</h3>
                            <h2 className={classes.ActiveCases_h}>450003</h2> */}
                            <div className={classes.ActiveCases_HighLight}>
                            <h3 className={classes.ActiveCases_h}>Active</h3>
                            </div>
                    </div>
                    
                {/* <div style={{display:'flex',marginTop:'-210px'}}> */}
                    <div className={classes.Recover}>
                            {/* <h3 className={classes.Recover_h}>Recover</h3>
                            <h2 className={classes.Recover_h}>320000</h2> */}
                            <div className={classes.Recover_HighLight}>
                            <h3 className={classes.Recover_h}>Recover</h3>
                            </div>

                    </div>
                    <div className={classes.Deceased}>
                        {/* <h3 className={classes.Deceased_h}>Deceased</h3>
                        <h2 className={classes.Deceased_h}>1000</h2> */}
                        <div className={classes.Deceased_HighLight}>
                        <h3 className={classes.Deceased_h}>Deceased</h3>
                        </div>

                    </div>
                    </div>
                    {/* <div className={classes.LoliPopChart} id={LoliPopChart}> */}
                        <LoliPopChart/>
                    {/* </div> */}
                    <Suspense fallback={<div><h1>LOADING</h1></div>}>
                        <SuspenseComponent/>
                    </Suspense>
                    
                </div>
                <div id="MapSection" className={classes.MapSection}>
                
                    <div id="Map_data" className={classes.Map_data}>
                    <TestMap MapRegion={"india"}/>
                    </div>
                    
                        
                </div>
                {/* <LoliPopChart /> */}
                {/* <BarPlot/> */}
            </div>
        )
    }
}
export default MapStates