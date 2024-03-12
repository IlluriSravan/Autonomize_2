import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Products from './components/Products'
import SelectedItem from './components/SelectedItem'
import './App.css'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Products/>}/>
      <Route exact path="/:id" element={<SelectedItem/>}/>
    </Routes>
  </BrowserRouter>
)

export default App