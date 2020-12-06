import React, {useState, useEffect} from 'react';
import './styles.scss';

const Ticker: React.FC = () => {
  const [ticker, setTicker] = useState([
    {
      title: "",
      content: ""
    }
  ]);

  useEffect(() => {
    const load = async () => {
      const tickerList: {title: string, content: string}[] = [];

      await fetch(`https://smulibraries.southeastasia.cloudapp.azure.com/public/count.json`)
        .then((r: any) => r.json())
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

  return (
    <div className="ticker">
      {ticker.map((obj, index)=> {
        return(
          <div className="ticker-container" key={index}>
            <p className="ticker-header">
              {obj.title}
            </p>
            <p className="ticker-info">
              {obj.content}
            </p>
          </div>
          
        );
      })}
    </div>
   );
}

export default Ticker;
