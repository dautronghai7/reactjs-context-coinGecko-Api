import { createContext, useState } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider =  props=>{
    const [watchList, setWatchList] = useState(['bitcoin', 'ethereum', 'ripple', 'litecoin'])
    const deleteCoin = (coin)=>{
        setWatchList(watchList.filter(el=>{
            return el !== coin;
        }))
    }
    const addCoin = (coin )=>{
        if(watchList.indexOf(coin) === -1){
            setWatchList([...watchList, coin])
        }   
    }
    return (
        <WatchListContext.Provider value={{watchList, deleteCoin, addCoin}} >
            {props.children}
        </WatchListContext.Provider>
    )
}