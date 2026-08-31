import { Routes,Route } from 'react-router-dom'
import SearchResults from './Pages/SearchResult'
import Home from './Pages/Home'


const App = () => {
  return (
    
    <Routes>

      <Route path="/" element={<Home />} />

      <Route
        path="/search-results"
        element={<SearchResults />}
      />

    </Routes>
    
  )
}

export default App
