import { Routes,Route } from 'react-router-dom'
import Home from './Pages/Home'
import SearchResults from './Pages/SearchResult'
import SeatSelection from './Pages/SeatSelection'
import PassengerDetails from './Pages/PassengerDetails'
import Payment from './Pages/Payment'
import BookingConfirmation from './Pages/BookingConfirmation'



const App = () => {
  return (
    
    <Routes>

      <Route path="/" element={<Home />} />

      <Route
        path="/search-results"
        element={<SearchResults />}
      />

      <Route
        path='/seat-selection'
        element={<SeatSelection/>}
      />

      <Route
        path="/passenger-details"
        element={<PassengerDetails/>}
      />

      <Route
        path="/payment"
        element={<Payment/>}
      />

      <Route
        path="/booking-confirmation"
        element={<BookingConfirmation/>}
      />





    </Routes>
    
  )
}

export default App
