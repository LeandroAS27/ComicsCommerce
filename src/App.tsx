import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './page/home/Home'
import Product from './page/home/Product'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Product' element={<Product/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
