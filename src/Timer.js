import React from 'react';
import './Timer.css';

const Timer = props => {
    return(
         <div id="timer" className="row">
          <div className="col buttons-column">

          <button 
              id="start_stop"
              onClick={props.handleStart}
              className="btn btn-secondary">
              Start
            </button>

            <button 
              onClick={props.pauseBtn}
              className="btn btn-secondary">
              {props.condition}
            </button>

            <button 
              id="reset"
              onClick={props.handleReset}
              className="btn btn-secondary">
              Reset
            </button>

          </div> 
        </div> 
    ) 
}
export default Timer;
