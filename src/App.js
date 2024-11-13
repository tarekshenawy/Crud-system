
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Addproduct from './Components/Addproduct/Addproduct';
import Updateproduct from './Components/Updateproduct/Updateproduct';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div>
     <Navbar/>

     <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home/>}></Route>
      <Route path='/createproduct' element={<Addproduct/>}></Route>
      <Route path='/updateproduct' element={<Updateproduct/>}>
      <Route path=':productId' element={<Updateproduct/>}></Route>
      </Route>
      </Routes>
      </BrowserRouter>
     
   
 
    </div>
  );
}

export default App;
