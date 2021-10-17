import { useEffect, useState } from "react"
import axios from "axios"
import { Line } from 'react-chartjs-2'

import './CoinTracker.css'
import { BiBitcoin } from 'react-icons/bi'
import { FaEthereum } from 'react-icons/fa'

const options = {
    responsive: true,
    spanGaps: true,
    interaction: {
        mode: 'nearest'
    },
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            titleAlign: 'center',
            callbacks: {
                label: () => {},
                beforeBody: (item) => { return '$' + item[0].formattedValue }
            } }

    },
    scales: {
        y: {
            ticks: {
                callback: (value, idx, values) => {
                    return '$' + value
                }
            }
        },
        x: {
            ticks: {
                callback: () => {} 
            }
        }
    },
    elements: {
        line: {
            borderCapStyle: 'round'
        },
    },
}

const CoinTracker = (props) => {
    const [tickers, setTickers] = useState([])
    const [prices, setPrices] = useState([])

    const fetchData = () => {
        axios.get('/coin_data', { 
            params: {
                coin: props.coin
            }
        })
        .then(res => {
            const filter = res.data.tickers
                .filter(t => t.target === 'USD')    // [coin]/USD
                .sort((a,b) => b.volume - a.volume) // sorts by highest vol
                .sort((a,b) => b.last - a.last) // sorts high to low
            
            setTickers(filter.slice(0, 10))
        })


        axios.get('/coin_history', {
            params: {
                coin: props.coin
            }
        })
        .then(res => {
            setPrices(res.data.prices)
        })
    }

    const switchRender = (icon) => {
        const SIZE = 30
        const style = {
            paddingRight: 10
        }

        switch (icon) {
            case 'bitcoin':
                return <BiBitcoin size={SIZE} style={style}/>
            case 'ethereum':
                return <FaEthereum size={SIZE} style={style}/>
            default:
                return;
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return(
        <div className='coin-tracker-container'>
            
            <div className='coin-name' style={{color: `rgb(${props.rgb.red},${props.rgb.green},${props.rgb.blue})` }}>
                {switchRender(props.coin)}
                {props.coin}
            </div>
            <div className='line-chart-container'> 
            <Line 
                className='line-chart'
                options={options}
                data={{
                    labels: prices.map(price => 
                        new Date(price[0]).toLocaleString('en-US', {timeStyle: 'short'})
                    ),
                    datasets: [{
                        data: prices, 
                        hoverBorderWidth: 15,
                        hoverBorderColor: '#FAFAFA',  
                        fill: true,
                        pointRadius: 0,
                        backgroundColor: `rgba(${props.rgb.red}, ${props.rgb.green}, ${props.rgb.blue}, 0.65)`,
                        borderColor: `rgb(${props.rgb.red + 20}, ${props.rgb.green + 20}, ${props.rgb.blue + 20})`,
                        borderWidth: 1,
                        tension: 0.1
                    }]
                }}
            />
            </div>

            <div className='ticker-container'>
                <div className='ticker-header'>
                    <div className='market-name'>Exchange</div>
                    <div>Price</div>
                </div>
                {
                    tickers.map((ticker,idx) => {
                        return (
                            <div key={idx}
                                className='ticker-item' 
                                onClick={() => ticker.trade_url 
                                            ? window.open(ticker.trade_url, '_blank') 
                                            : null}>
                                <div className='market-name'>{ticker.market.name}</div>
                                <div className='coin-price'>${ticker.last.toFixed(2)}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CoinTracker;