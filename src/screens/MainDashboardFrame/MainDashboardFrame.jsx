import React from "react";
import "./style.css";

export const MainDashboardFrame = () => {
  return (
    <div className="main-dashboard-frame">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="overlap-group">
            <div className="rectangle" />
            <div className="text-wrapper">Stocks</div>
            <div className="navbar">
              <div className="div">Crypto</div>
              <div className="text-wrapper-2">Forex</div>
              <div className="text-wrapper-3">Fixed Income</div>
              <div className="text-wrapper-4">Funds</div>
              <div className="text-wrapper-5">Futures</div>
            </div>
            <div className="symbols-view">
              <div className="text-wrapper-6">IBM: $200</div>
              <div className="text-wrapper-7">MSFT: $150</div>
              <div className="text-wrapper-8">AMZN: $175</div>
            </div>
            <div className="news-headline-frame">
              <div className="text-wrapper-9">HEADLINES AND BREAKING NEWS</div>
            </div>
          </div>
          <div className="frame">
            <div className="text-wrapper-10">Favorite Watch List</div>
            <div className="group">
              <div className="text-wrapper-11">USDCAD $1.73</div>
              <div className="text-wrapper-12">EURUSD $1.20</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
