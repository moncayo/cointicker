# CoinTicker
CoinTicker is a web app that tracks cryptocurrency prices across all major exchanges. For a given coin, the site will display the top 10 exchanges in volume, sorted from highest price to lowest, and a 24 hour range chart using the CoinGecko API. Clicking the exchange name will send you to the coin/USD pairing on that exchange (if available).

Sell high, buy low!

## Running it

Clone the repository, run `npm install`, and then `npm run dev` to run the program locally. 

## Questionnaire
1.  Are there any sub-optimal choices (or short cuts taken due to limited time) in your implementation?<br/>
I believe that I made the implementation simple enough that changes can be made easily to the UI but that the styling can be improved upon by displaying more data without making the page feel cluttered.
2.  Is any part of it over-designed?  <br/>
I compared ten exchanges instead of two and pulled a lot of data that doesn't end up being used - however I think that this leaves room for improvement in the future.
3.  If you have to scale your solution to 100 users/second traffic what changes would you make, if any?<br/>
I believe that my solution would be able to handle that traffic as is since not many API calls are being made other than a 24 hour range of the price and the info of the coins on the exchanges.
4.  What are some other enhancements you would have made, if you had more time to do this implementation?<br/>
Allow the user to view different ranges of time for the graph (daily, weekly, monthly), have a live price tracker for each coin, show different currency pairings, and add the feature to add more cryptocurrencies to the list.