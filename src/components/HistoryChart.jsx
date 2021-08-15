/* eslint-disable default-case */
import React,{useRef, useEffect, useState} from 'react'
import ChartJs from 'chart.js/auto';
import 'chartjs-adapter-moment';
import {historyOptions} from '../components/chartConfigs/chartConfigs'
const HistoryChart = ({data}) => {
    const {day, week, year, detail} = data;    
    const [timeFormat, setTimeFormat] = useState('24h');
    const [chart, updateChart] = useState(null);
    const chartRef = useRef();
console.log(year);
    const detectermineTimeFormat = ()=>{
        switch(timeFormat){
            case '24h':
                console.log('24')
                return {                    
                        labbels: day.map((d)=>{return d.t.toTimeString()}),
                        data: day.map(d=>{
                            return {x: d.t.toTimeString(), y: d.y }
                        })
                        };
            case '7d': 
            console.log('7')
                return {                    
                    labbels: week.map((d)=>{return d.t.toDateString()}),
                    data: week.map(d=>{
                        return {x: d.t.toDateString(), y: d.y }
                    })
                    };
            case '1y':
                return {                    
                    labbels: year.map((d)=>{return d.t.toDateString()}),
                    data: year.map(d=>{
                        return {x: d.t.toDateString(), y: d.y }
                    })
                    };
        }
    }
    
    useEffect(()=>{   
        if(chart != null){
            chart.destroy();
        }
        renderChart();
    },[timeFormat]);
    const renderChart = ()=>{
        if(chartRef && chartRef.current && detail){
            const chartInstance = new ChartJs(chartRef.current, {
              type: "line",
              data: {
                labels: detectermineTimeFormat().lables,
                datasets: [
                  {
                    label: `${detail.name} price`,
                    data: detectermineTimeFormat().data,
                    borderColor: "rgb(75, 192, 192)",
                    backgroundColor: "rgba(174,305,194, 0.5)",
                    fill: "start",
                    // smooth: true,
                    tension: 0.4,
                    borderWidth: 1,
                    pointRadius: 0,
                  },
                ],
              },
              options: {historyOptions}
            });
            updateChart(chartInstance);
        }    
    }
    const renderPrice = ()=>{
        if(detail){
            return (
                <>
                    <p className='my-0'>$ {detail.current_price.toFixed(2)}</p>
                    <p className={
                        detail.price_change_24 < 0 ? 
                        'text-dangermy-0' : 
                        'text-success my-0'
                        }>
                    {detail.price_change_percentage_24h.toFixed(2)}%
                    </p>
                </>
            )
        }
    }
    return (
        <div className='bg-white border mt-2 rounded p-3'>
            <div> {renderPrice()} </div>
            <div>

                <canvas className='myCanvas' ref={chartRef} id="myChart" width="250" height="250"></canvas>
            </div>
            <div className='chart-button mt-1'>
                <button onClick={()=>{setTimeFormat('24h')}} className='btn btn-outline-secondary btn-sm'>24H</button>
                <button onClick={()=>{setTimeFormat('7d')}}  className='btn btn-outline-secondary btn-sm'>Week</button>
                <button onClick={()=>{setTimeFormat('1y')}}  className='btn btn-outline-secondary btn-sm'>1 Year</button>
            </div>
        </div>
    )
}

export default HistoryChart
