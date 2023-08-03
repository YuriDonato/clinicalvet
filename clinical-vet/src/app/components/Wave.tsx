import React from 'react';

const Wave: React.FC = () => {
  return (
    <div className="wave-container">
      <svg
        className="wave-svg"
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#FFFFFF"
          fillOpacity="0.7"
          d="M0,64L1440,288L1440,0L0,0Z"
        ></path>
      </svg>
    </div>
  );
};

export default Wave;
