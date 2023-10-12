//APP.JS
import { Button} from 'antd';
import {BrowserRouter , Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/homePage';
import Items from './pages/items';
import Cart from './pages/cartPage';
import Register from './pages/register';
import Login from './pages/login';
import Bills from './pages/bills';
import Customers from './pages/customers';
function App() {
  return (
    <>
    <BrowserRouter>
   <Routes>
    <Route exact path='/home' element={ <ProtectedRoute> <HomePage/> </ProtectedRoute> } />
    <Route exact path='/items' element={ <ProtectedRoute> < Items /> </ProtectedRoute> }/>
    <Route exact path='/cart' element={<ProtectedRoute> < Cart /> </ProtectedRoute> }/>
    <Route exact path='/bills' element={<ProtectedRoute> < Bills /> </ProtectedRoute> }/>
    <Route exact path='/customers' element={<ProtectedRoute> < Customers /> </ProtectedRoute> }/> 
    <Route exact path='/register' element={ < Register /> }/>
    <Route exact path='/login' element={< Login /> }/>
    <Route exact path='/' element={< Login /> }/> 
     </Routes>
   </BrowserRouter>
    </>
  );
}

export default App;
export function ProtectedRoute({children}){
  if(localStorage.getItem('pos-user')){
    return children
  }
  else{
    return <Navigate to='/login' />
  }
}
