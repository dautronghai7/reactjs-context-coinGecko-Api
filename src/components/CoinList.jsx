import React, {useState, useEffect, useContext, } from 'react'
import Coin from '../components/Coin'

import coinGecko from './apis/coinGecko'
import { WatchListContext } from './context/WatchListContext';

// const api = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&order=market_cap_desc&per_page=100&page=1&sparkline=false';
const CoinList = () => { 
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false)

    const {watchList, deleteCoin} = useContext(WatchListContext)
    
    //console.log(watchList);
    useEffect(()=>{
            const fetchData = async ()=>{
                setLoading(true)
                if(watchList.length <= 0){
                    return {data:[]};
                }
                return await coinGecko.get(
                    '/coins/markets/',
                    {
                        params:{
                            vs_currency: 'usd',
                            ids: watchList.join(',') //'bitcoin, ethereum';
                        },
                    }
                )
                
            }
            fetchData().then(data=>{                
                setCoins(data.data)
            })
            .catch(err => console.log(err))
            .finally(()=>{setLoading(false)})
        }, [watchList]);
    const renderCoins = ()=>{
        if(loading){
            return <p>Loading</p>
        }else{
            return (
                <ul className="list-group center mt-2">
                    {coins.map((coin)=>{
                        return (<Coin className='coin' key={coin.id} coin={coin} deleteCoin={deleteCoin} />)
                    })}
                </ul>
            )
        }
    }
    return (
        <div className="coinlist">
            {renderCoins()}
        </div>
    )
}

export default CoinList
