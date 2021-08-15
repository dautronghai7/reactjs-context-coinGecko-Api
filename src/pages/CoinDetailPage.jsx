import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import HistoryChart from '../components/HistoryChart';
import CoinData from '../components/CoinData';
import coinGecko from '../components/apis/coinGecko';

const CoinDetailPage = () => {
    const {id} = useParams()
    const [loading, setLoading] = useState(true)
    const [coinData, setCoinData]=useState([])

    const formatData = (data)=>{
        return data.map((el)=>{
            return {
                t: (new Date(el[0])),//time
                y: el[1].toFixed(2) //price
            }
        })
    }
    useEffect(()=>{
        const fetchData = async ()=>{        
            const [day, week, year, detail] = await Promise.all([
                coinGecko.get(
                    `/coins/${id}/market_chart`,
                    {
                        params: {
                            vs_currency: 'usd',
                            days: '1'
                        }
                    }
                ),
                coinGecko.get(
                    `/coins/${id}/market_chart`,
                    {
                        params: {
                            vs_currency: 'usd',
                            days: '7'
                        }
                    }
                ),
                coinGecko.get(
                    `/coins/${id}/market_chart`,
                    {
                        params: {
                            vs_currency: 'usd',
                            days: '365'
                        }
                    }
                ),
                coinGecko.get(
                    `/coins/markets`,
                    {
                        params: {
                            vs_currency: 'usd',
                            ids: id
                        }
                    }
                )
            ]);//.then(d=>{setLoading(false)});
            //console.log(day);

            setCoinData({
                day: formatData(day.data.prices),
                week: formatData(week.data.prices),
                year: formatData(year.data.prices),
                detail: detail.data[0]
            });   
            setLoading(false);
        }
    fetchData();
    },[]);
    const renderData = ()=>{        
        if(loading){
            console.log('loading');
            return <p>Loading</p>
        }        
        return (            
            <div className='coinlist'>                
                {/* {console.log('coin data', coinData)} */}
                <HistoryChart data={coinData} />
                <CoinData data={coinData.detail}/>
            </div>
        )
    }
    return renderData();
    
}

export default CoinDetailPage
