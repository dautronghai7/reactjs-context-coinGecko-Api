import React, {useState, useContext} from 'react'
import { WatchListContext } from './context/WatchListContext'
const AddCoin = () => {
    const availableCoins = [
        'bitcoin',
        'ethereum',
        'ripple',
        'tether',
        'bitcoin-cash',
        'litecoin',
        'eos',
        'okb',
        'tezos',
        'cardano'
    ]
    const [isActive, setIsActive] = useState(false)
    const { addCoin } = useContext(WatchListContext); 
    const handleClick = coin=>{
        addCoin(coin)
        setIsActive(false)
    }
    return (
        <div className={isActive ? 'dropdown show' : 'dropdown'}>
            <button type='button' onClick={()=>setIsActive(!isActive)} className='btn btn-primary dropdown-toggle'>
                Add Coin
            </button>
            <div className={isActive ? 'dropdown-menu show' : 'dropdown-menu'}>
                {availableCoins.map((el)=>{
                    return  (
                        <a onClick={()=>handleClick(el)} className='dropdown-item' href='#'>{el}</a>
                    )
                })}
            </div>
        </div>
    )
}

export default AddCoin
