import React, { useMemo, useState } from "react";
import "./style.css";

export const MainDashboardFrame = () => {

  const [headlines, setHeadlines] = useState([])
  const [isheadlinesloading, setisheadlinesloading] = useState(false)

  
  //Get headlines
  useMemo(() => {
    //Intl.DateTimeFormat().resolvedOptions().timeZone //to get country so news headline will be based on country
    fetch('http://localhost:5000/news-headlines')
    .then(res => res.json())
    .then((data) => {
        let count = 0
       setisheadlinesloading(true)
       data.articles.forEach(article => {
        if (count === 15) {
          setisheadlinesloading(false)
          return;
        }
        console.log(`${article.title}::${article.url}::${article.urlToImage}`)
        setHeadlines(headlines => [...headlines, {title:article.title, url:article.url, urlimage: article.urlToImage}])
        count += 1;
       })
    })
    .catch(console.log)
  },[])

  return (
    <div className="main-dashboard-frame">
      <div className="div">
        <div className="text-wrapper">About</div>
        <div className="text-wrapper-2">Virland Fiinancials</div>
        <div className="main-menu">
          <div className="text-wrapper-3">Crypto</div>
          <div className="text-wrapper-4">Forex</div>
          <div className="overlap-group">
            <div className="text-wrapper-5">Fixed Income</div>
            <div className="text-wrapper-6">Funds</div>
          </div>
          <div className="text-wrapper-7">Futures</div>
        </div>
        <div className="news-headline-frame">
          <div className="text-wrapper-8">HEADLINES AND BREAKING NEWS</div>
          <div className="group" >
              <ul className="headlines-list" style={{listStyleType: 'none', display: 'flex', flexWrap: 'wrap'}}>
              {
                
                headlines.map((headline,i) => (
                  <li key={headline.title} style={{marginLeft: '1rem', backgroundColor: i % 2 === 0 ? '#AED6F1' : '#5DADE2'}}>
                    <p><a href={headline.url} target="_blank">{headline.title}</a></p></li>
                    
                ))
                
              }
              </ul>
          </div>
        </div>
        <div className="favorites">
          <div className="text-wrapper-11">Favorites</div>
          <div className="forex-group">
            <div className="text-wrapper-12">USDCAD</div>
            <div className="text-wrapper-13">EURUSD</div>
          </div>
          <div className="coin-group">
            <div className="text-wrapper-14">BTCUSD</div>
            <div className="text-wrapper-15">ETHUSD</div>
            <div className="text-wrapper-16">BTCUSDC</div>
            <div className="text-wrapper-17">ETHUSDC</div>
          </div>
          <div className="stocks-group">
            <div className="text-wrapper-18">IBM</div>
            <div className="text-wrapper-19">APPL</div>
            <div className="text-wrapper-20">AMZN</div>
          </div>
        </div>
        <img
          className="VIRLAN-CHAINWORKS-YT"
          alt="Virlan CHAINWORKS YT"
          src="/img/virlan-chainworks-yt-branding-1.png"
        />
        <div className="frame">
          <div className="text-wrapper-21">Symbol Detail</div>
          <img className="candle" alt="Candle" src="/img/candle-1.png" />
        </div>
      </div>
    </div>
  );
};

