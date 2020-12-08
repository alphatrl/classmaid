import { string } from 'prop-types';
import React, {useState, useEffect} from 'react';
import './styles.scss';

const Tick: React.FC = () => {
  const [ticker, setTicker] = useState([
    {
      title: "",
      content: ""
    }
  ]);
  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {    
    const load = async () => {
      const tickerList: {title: string, content: string}[] = [];
      await fetch(`https://smulibraries.southeastasia.cloudapp.azure.com/public/count.json`)
        .then((r: Response) => r.json())
        .then((data: any) => {
          tickerList.push({
            title: "Occupancy Level",
            content: `Li Ka Shing Library: ${data.lks.inside} / 1000`,
          });

          tickerList.push({
            title: "Occupancy Level",
            content: `Kwa Geok Choo Law Library: ${data.kgc.inside} / 300`,
          })
        });

      setTicker(tickerList);
    };
    load();
  }, []);

  const Message = () => {

    const [message, setMessage] = useState(ticker[tickerIndex]);
    const [index, setIndex] = useState(tickerIndex);
    const repeatTime = 5000;

    useEffect(() => {
      const timer = setInterval(() => {
        setMessage(ticker[tickerIndex]);
        // reset index to 0 if we overshot the array count
        setTickerIndex((tickerIndex) => tickerIndex + 1 >= ticker.length ? 0 : tickerIndex + 1);
      }, repeatTime);

      return (() => clearInterval(timer));
    }, []) 
    

    return ticker.length > 0 ? (
      <div
        className="ticker-container"
        // style={{animation: "fadeInOut 5s ease-out 0s 1"}}
      >
        <span className="ticker-header">
          {message.title}
        </span>
        <span className="ticker-info">
          {message.content}
        </span>
      </div>
    ) : (
      <div className="ticker-container">
        <span className="ticker-info">
          "No announcements"
        </span>
      </div>
    );
  }

  return (
    <div className="ticker">
      <Message />
    </div>
  );
}

export default Tick;
