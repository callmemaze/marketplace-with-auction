import React from "react";

const PreviousBidsComponent = ({ previousBids }) => {
  return (
    <div className="previous-bids">
      <h5>Previous bids</h5>
      <div className="content">
        {previousBids.map((bid, index) => (
          <div key={index}>
            <p>{bid.address}</p>
            <h6>{`${bid.price}$`}</h6>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviousBidsComponent;
