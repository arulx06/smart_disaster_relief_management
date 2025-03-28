import React from 'react';
import './Marquee.css'; // styling file

const Marquee = ({ items, speed = 20 }) => {
  return (
    <div className="marquee-container">
      <div className="marquee-track" style={{ animationDuration: `${speed}s` }}>
        {items.concat(items).map((item, index) => (
          <div key={index} className="marquee-item">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
