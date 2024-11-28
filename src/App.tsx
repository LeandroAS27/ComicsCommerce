import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './page/home/Home'
import Product from './page/home/Product'
import { Provider } from 'react-redux'
import store from './redux/store'


function App() {

  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Product' element={<Product/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
