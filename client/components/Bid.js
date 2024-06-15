import React, { useState } from "react";

const Bid = ({ currentItem, currentPrice, loggedInUser, sendBid }) => {
  const [bidAmount, setBidAmount] = useState(currentPrice + 1);

  const handleBidChange = (e) => {
    setBidAmount(parseInt(e.target.value));
  };

  return (
    <div className="add-bid" style={{ width: "80%", margin: "auto" }}>
      <h5>Add a bid</h5>
      <div className="form-inline">
        <input
          className="form-control"
          style={{ width: "80%" }}
          type="number"
          value={bidAmount}
          min={currentPrice + 1}
          onChange={handleBidChange}
        />
        <p style={{ position: "relative", top: "5px", left: "10px" }}>USD</p>
      </div>
      <p className="error" style={{ color: "red", margin: "10px 0px" }}></p>
      <button
        className="form-control btn btn-primary"
        onClick={() => sendBid(bidAmount)}
      >
        Add
      </button>
    </div>
  );
};

export default Bid;
