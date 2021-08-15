import React from 'react'
import {BrowserRouter, Route } from 'react-router-dom'
import Header from './components/Header'
import CoinDetailPage from './pages/CoinDetailPage'
import CoinSummaryPage from './pages/CoinSummaryPage'

import './App.css'
import { WatchListContextProvider } from './components/context/WatchListContext'
function App() {
  return (
    <div className='container'>
      <WatchListContextProvider>
        <BrowserRouter>
          <Header />
          <Route exact path='/' component={CoinSummaryPage} />        
          <Route exact path='/coins/:id' component={CoinDetailPage} />        
        </BrowserRouter>
      </WatchListContextProvider>
    </div>
  );
}

export default App;
