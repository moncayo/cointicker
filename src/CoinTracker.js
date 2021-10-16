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
    const [buyExchange, setBuyExchange] = useState('')
    const [sellExchange, setSellExchange] = useState('')


    const fetchData = () => {
        axios.get('http://localhost:5000/coin_data', { 
            params: {
                coin: props.coin
            }
        })
        .then(res => {
            const filter = res.data.tickers
                .filter(t => t.target === 'USD')    // [coin]/USD
                .sort((a,b) => b.volume - a.volume) // sorts by highest vol
                .sort((a,b) => b.last - a.last) // sorts high to low
            
            //const SIZE = filter.length
            
            //setBuyExchange(filter[SIZE - 1].trade_url)
            //setSellExchange(filter[0].trade_url)
            setTickers(filter.slice(0, 10))
        })


        axios.get('http://localhost:5000/coin_history', {
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
            case 'btc':
                return <BiBitcoin size={SIZE} style={style}/>
            case 'eth':
                return <FaEthereum size={SIZE} style={style}/>
            default:
                return;
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return(
        <div class='coin-tracker-container'>
            
            <div class='coin-name' style={{color: `rgb(${props.rgb.red},${props.rgb.green},${props.rgb.blue})` }}>
                {switchRender(props.short)}
                {props.short}
            </div>
            <div class='line-chart-container'> 
            <Line 
                class='line-chart'
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

            <div class='ticker-container'>
                <div class='ticker-header'>
                    <div class='market-name'>Exchange</div>
                    <div>Price</div>
                </div>
                {
                    tickers.map(ticker => {
                        return (
                            <div 
                                class='ticker-item' 
                                onClick={() => ticker.trade_url 
                                            ? window.open(ticker.trade_url, '_blank') 
                                            : null}>
                                <div class='market-name'>{ticker.market.name}</div>
                                <div class='coin-price'>${ticker.last.toFixed(2)}</div>
                            </div>
                        )
                    })
                }
            </div>

            {/* <div class='buy-sell-button-container'>
                <button 
                    class='buy-button' 
                    onClick={() => {
                        window.open(buyExchange, '_blank')
                    }}>BUY</button>
                <button 
                    class='sell-button' 
                    onClick={() => {
                        window.open(sellExchange, '_blank')
                    }}>SELL</button>
            </div> */}
        </div>
    )
}

export default CoinTracker;