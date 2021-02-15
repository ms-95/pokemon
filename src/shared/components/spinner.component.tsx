import React from 'react';
import SpinnerGif from '../../assets/images/spinner.gif';
export default function Spinner() {
    return <React.Fragment>
        <div className="position-fixed" style={{ top: 0, bottom: 0, left: 0, right: 0,  zIndex: 8000, backdropFilter: 'blur(10px)' }}>
        </div>

        <div className="d-flex align-items-center justify-content-center position-fixed" style={{ top: 0, bottom: 0, left: 0, right: 0, zIndex: 9999 }}>
           <div>
            <img src={SpinnerGif} />
            <div className="text-center">Loading...</div>
           </div>
        </div>
        
    </React.Fragment>
    
    
}