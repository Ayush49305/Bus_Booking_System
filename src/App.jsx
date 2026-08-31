import { Routes,Route } from 'react-router-dom'
import Home from './Pages/Home'
import SearchResults from './Pages/SearchResult'
import SeatSelection from './Pages/SeatSelection'



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

    </Routes>
    
  )
}

export default App
