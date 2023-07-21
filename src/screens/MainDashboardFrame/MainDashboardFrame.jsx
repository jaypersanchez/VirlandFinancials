import React, { useMemo, useState } from "react";
import {Modal} from 'react-bootstrap'
import "./style.css";
import { dotenv } from 'react-dotenv'
import {Bar} from 'react-chartjs-2';

export const MainDashboardFrame = () => {

  const [headlines, setHeadlines] = useState([])
  const [isheadlinesloading, setisheadlinesloading] = useState(false)
  const [abouttooltip, setAboutToolTip] = useState("Virland Financials is a finance research and analysis tool.  It provides data intelligence gathered from different financial sources in order for traders and investors to make intelligent decisions on where to invest.")
  const [forexpairs, setForexPairs] = useState([])
  const [isforexpairsloading, setisforexpairsloading] = useState(false)
  const [selectedforexpair, setselectedforexpair] = useState()
  const [cryptocoin, setcryptocoin] = useState([])
  const [selectedcrypto, setselectedcrypto] = useState()
  const [iscryptocoinloading, setiscryptocoinloading] = useState(false)
  const [tickersymbol, settickersymbol] = useState([])
  const [istickersymbolloading, setistickersymbolloading] = useState(false)
  const [selectedtickersymbol, setselectedtickersymbol] = useState()
  const [pairpriceprice, setpairprice] = useState()
  const [pairpricesymbol, setpairpricesymbol] = useState()
  const [cryptochart, setcryptochart] = useState()
  const [country, setcountry] = useState()
  const [commodityprice, setcommodityprice] = useState()
  const [stockquoteprice, setstockquoteprice] = useState()
  
  //get user's geolocation
  useMemo(() => {
    fetch('http://localhost:1234/')
    .then(res => res.headers.get('User-Agent'))
    .then(userAgent => {
      // Parse user-agent to get country
      if (userAgent) {
        const countryRegex = /\(([^)]+)\)/;
        const matches = userAgent.match(countryRegex);
        const country = matches && matches[1];
        // Do something with the country
        console.log(`country ${country}`)
        setcountry(country)
      }
    });
  })

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
        //console.log(`${article.title}::${article.url}::${article.urlToImage}`)
        setHeadlines(headlines => [...headlines, {title:article.title, url:article.url, urlimage: article.urlToImage}])
        count += 1;
       })
    })
    .catch(console.log)
  },[])

  //Get Forex pairs
  useMemo(() => {
    fetch('http://localhost:5000/default/forex')
    .then(res => res.json())
    .then((data) => {
        setisforexpairsloading(true)
       data.forEach(pair => {
        //console.log(pair)
        //console.log(`${article.title}::${article.url}::${article.urlToImage}`)
        setForexPairs(forexpairs => [...forexpairs, pair])
       })
       setisforexpairsloading(false)
    })
    .catch(console.log)
  },[])

  //Get Crypto list
  useMemo(() => {
    const ninjasapikey = process.env.NINJAS_API_KEY
    console.log("ninjaapi " + ninjasapikey)
    fetch('https://api.api-ninjas.com/v1/cryptosymbols', {
      headers : {
          'X-Api-Key': ninjasapikey
      }
    })
    .then(res=>res.json())
    .then((data) => {
       setiscryptocoinloading(true)
       
       data.symbols.map(symbolpair => {
          //console.log(symbolpair)
          setcryptocoin(cryptocoin => [...cryptocoin, symbolpair])
       })
       setiscryptocoinloading(false)
    })
    .catch(console.log)
  },[])

  //Get Ticker Symbols
  useMemo(() => {
    fetch('http://localhost:5000/default/stocks')
    .then(res => res.json())
    .then((data) => {
        setistickersymbolloading(true)
       data.forEach(pair => {
        //console.log(pair)
        //console.log(`${article.title}::${article.url}::${article.urlToImage}`)
        settickersymbol(tickersymbol => [...tickersymbol, pair])
       })
       setistickersymbolloading(false)
    })
    .catch(console.log)
  },[])

  const handleSelectedForexPair = async(e) => {
    console.log("forex quote")
    let selected = e.target.value;
    setselectedforexpair(selected)
    console.log(`Forex Pair Selected ${selectedforexpair}`)
    fetch(`http://127.0.0.1:5000/forex/quote?symbol=${selectedforexpair}`)
    .then(res => res.json())
    .then(pairprice => {
      let date = pairprice[0]["0"];
      let price = pairprice[1]["0"];
      console.log(`The date is ${date} and the price is ${price}`)
      setcommodityprice(`${selectedforexpair} price to date ${date}: ${price}`)
    })
  }
 
  const graphCryptoSymbol = async() => {
    fetch(`http://localhost:5000/crypto/graph?symbol=btc`)
    .then(res => res.json())
    .then((chart_df) => {
          //console.log(chart_df)
              //Create a chart object
              var chart = new Chart(ctx, {
                type: 'line',
                data: chart_df, 
                options: {
                    scales: {
                        xAxes: [{
                            type: 'time',
                            display: true,
                            min: chart_df.labels[0],
                            max: chart_df.labels[chart_df.length - 1],
                        }],
                        yAxes: [{
                            ticks: {
                                suggestedMin: chart_df.min,
                                suggestedMax: chart_df.max
                            } 
                        }]
                    }
                }
              });
              //Render the chart
              chart.render();
              setcryptochart(chart)
    })
  }

  const handleSelectedCrypto = async(e) => {
    let selected = e.target.value;
    setselectedcrypto(selected)
    console.log(`Crypto Selected ${selectedcrypto}`)
    fetch(`http://127.0.0.1:5000/crypto/pair?symbol=${selected}`)
    .then(res => res.json())
    .then(pairprice => {
      console.log(`${pairprice.symbol}::${pairprice.price}`)
      setpairprice(pairprice.price)
      setpairpricesymbol(pairprice.symbol)

    })
    /*.then( 
      graphCryptoSymbol()
  )*/
    .catch(console.log())
  }

  const handleSelectedTickerSymbol = async(e) => {
    let selected = e.target.value;
    setselectedtickersymbol(selected)
    console.log(`Ticker Selected ${selectedtickersymbol}`)
    fetch(`http://127.0.0.1:5000/stocks/stockeodquote?symbol=${selectedtickersymbol}`)
    .then(res => res.json())
    .then(pairprice => {
      console.log(pairprice)
      setstockquoteprice(pairprice)
    })
  }

  return (
    <div className="main-dashboard-frame">
      <div className="div">
        <div className="text-wrapper"  title={abouttooltip}>About</div>
        <div className="text-wrapper-2">Virland Fiinancials</div>
        <div className="main-menu">
          <div className="text-wrapper-3" title="Crypto Currency Page"><a href="">Crypto</a></div>
          <div className="text-wrapper-4" title="Commodity Page"><a href="">Forex</a></div>
          <div className="overlap-group">
            <div className="text-wrapper-5" title="Fixed Income Page"><a href="">Fixed Income</a></div>
            <div className="text-wrapper-6" title="Mutual Funds Page"><a href="">Funds</a></div>
          </div>
          <div className="text-wrapper-7" title="Futures Commodity Page"><a href="">Futures</a></div>
        </div>
        <div className="news-headline-frame">
          <div className="text-wrapper-8">HEADLINES AND BREAKING NEWS</div>
          <div className="group">
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
            <div>Commodities</div>
          <select onChange={(e) => handleSelectedForexPair(e)}>
            {
              forexpairs.map((pair, index) => (
                <option key={index}>{pair}</option>
              ))
            }
          </select>
          </div>
          <div className="coin-group">
            <div>Stablecoins</div>
            <select onChange={(e) => handleSelectedCrypto(e)}>
              {
                cryptocoin.map((pair, index) => (
                  <option key={index}>{pair}</option>
                ))
              }
            </select>
          </div>
          <div className="stocks-group">
            <div>Equities</div>
            <select onChange={(e) => handleSelectedTickerSymbol(e)}>
              {
                tickersymbol.map((pair, index) => (
                  <option key={index}>{pair}</option>
                ))
              }
            </select>
          </div>
        </div>
        <img
          className="VIRLAN-CHAINWORKS-YT"
          alt="Virlan CHAINWORKS YT"
          src="/img/virlan-chainworks-yt-branding-1.png"
        />
        <div className="frame">
          <div className="text-wrapper-21"><p>{pairpricesymbol} :: {pairpriceprice}</p></div>
          <div className="text-wrapper-22"><p>{commodityprice}</p></div>
          <div className="text-wrapper-23"><p>{selectedtickersymbol} Stock Price {stockquoteprice}</p></div>
          
          <div>
            <canvas ref={cryptochart} />
          </div>
        </div>
      </div>
    </div>
  );
};

