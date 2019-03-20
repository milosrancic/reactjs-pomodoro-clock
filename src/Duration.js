import React from 'react';
import './Duration.css';

const Duration = props => {

  const { increaseTime, decreaseTime, increaseBreakTime, decreaseBreakTime } = props;

   return (
     <div id="duration">
       
       <h4 id="session-label">
        {props.sessionLabel}
       </h4>

       <div className="row"> {/* new row */}
         <div className="col d-none d-md-block"></div>
         <div className="col">
           <button
             type="button"
             className="btn btn-outline-secondary plus_minus"
             id="session-increment"
             onClick={increaseTime}
           >
             +
           </button>
         </div>

         <div className="col">
           <h3 id="session-length">
             {props.sessionLength} {props.calculateTime}
           </h3>
         </div>

         <div className="col">
           <button
             type="button"
             className="btn btn-outline-secondary plus_minus"
             id="session-decrement"
             onClick={decreaseTime}
           >
             -
           </button>
         </div>
         <div className="col d-none d-md-block"></div>
       </div> {/* end of row */}
     

       <h4 id="break-label">
         {props.breakLabel}
       </h4>

       <div className="row"> {/* new row */}
         <div className="col d-none d-md-block"></div>
         <div className="col">
           <button
             type="button"
             className="btn btn-outline-secondary plus_minus"
             id="break-increment"
             onClick={increaseBreakTime}
           >
             +
           </button>
         </div>
         <div className="col">
           <h3 id="break-length">
             {props.breakLength} {props.calculateTime}
           </h3>
         </div>
         <div className="col">
           <button
             type="button"
             className="btn btn-outline-secondary plus_minus"
             id="break-decrement"
             onClick={decreaseBreakTime}
           >
             -
           </button>
         </div>
         <div className="col d-none d-md-block"></div>
       </div> {/* end of row */}
      
     </div>
   ); 
  }
  export default Duration;
