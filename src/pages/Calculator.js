import React from 'react';
import Calculator from "awesome-react-calculator";

const CalculatorPage = ({ shouldShow, close }) => {
  if (shouldShow) {
    return <div id="calc" style={{ position: 'fixed', top: 0, left: 0, height: '100vh', width: '100vw', display: 'flex', justifyItems: 'center', alignItems: 'center', backgroundColor: 'rgba(50,50,50,0.3)', zIndex: 100, float: 'center' }} onClick={(e) => {
      if (e.target.id === "calc") {
        close();
      }
    }}>
      <div style={{ height: '24rem', width: '15rem', margin: 'auto' }}>
        <Calculator />
      </div>
    </div>
  } else {
    return <></>
  }
}

export default CalculatorPage;