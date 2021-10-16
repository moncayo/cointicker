import CoinTracker from "./CoinTracker";
import Header from "./Header";
import './App.css'

const currency = [
  {
    coin: 'bitcoin',
    short: 'btc',
    rgb: {
      red: 242,
      green: 170,
      blue: 0
    }
  },
  {
    coin: 'ethereum',
    short: 'eth',
    rgb: {
      red: 113,
      green: 107,
      blue: 148
    }
  },
]

const App = () => {
  return (
    <div className="app-container">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
      </style> 
      <Header />
      {
        currency.map(item => {
          return(
            <CoinTracker 
              coin={item.coin}
              short={item.short}
              rgb={item.rgb}
            />
          )
        })
      }
    </div>
  );
}

export default App;