import './App.css';
import Nav from "./components/Nav"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignUp from './components/SignUp';
import PrivateComponents from './components/PrivateComponents';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProducts';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponents />}>
            <Route path='/' element={<ProductList />} />
            <Route path='/add' element={<AddProduct />}></Route>
            <Route path='/update/:id' element={<UpdateProduct />}></Route>
            <Route path='/logout' element={<h1>Logout from web</h1>}></Route>
          </Route>
          <Route path='/signUp' element={<SignUp />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
