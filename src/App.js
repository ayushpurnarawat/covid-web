import React, { Suspense } from 'react';
import './App.css';
// import MapStates from './MapPractice/DrawMap/MapStates';
const MapStates = React.lazy(()=>import('./MapPractice/DrawMap/MapStates'))
function App(props) {

  

  return (
    <div className="App" >
      
        {/* <Main/>
        <LineChart/> */}
        {/* <BackGroundMap/> */}
        {/* <HoverMap/> */}
        {/* <TestMap/> */}
        {/* <MapVisulizer/> */}
        <Suspense fallback={<div>Loading.........</div>}>
              <MapStates/>
        </Suspense>
    </div>
  );
}

export default App;
