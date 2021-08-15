/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import {Link} from 'react-router-dom'
import {FaSortDown, FaSortUp} from 'react-icons/fa'
import {TiDeleteOutline} from 'react-icons/ti'
const Coin = ({coin, deleteCoin}) => {
    return (
        <Link to={`/coins/${coin.id}`} className='text-decoration-none my-1 coin'>
            <li className='coinlist-item list-group-item list-group-item-action d-flex justify-content-between align-items-center text-dark'>
                <img src={coin.image} className='coinlist-image' />
                <span className="text-decoration-non">{coin.current_price}</span>
                <span className=
                    {coin.price_change_percentage_24h < 0 ?'text-danger mr-2' :'text-success mr-2'}
                >
                    {coin.price_change_percentage_24h < 0 ?( <FaSortDown />) : (<FaSortUp />)}
                    {coin.price_change_percentage_24h.toFixed(2)}% 
                </span>
                <TiDeleteOutline onClick={
                    (e)=>{
                        e.preventDefault();
                        deleteCoin(coin.id)
                    }}  className='delete-icon'/>
            </li>
        </Link>
    )
}

export default Coin
