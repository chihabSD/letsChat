import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import NotLoggedInRoutes from './routes/LoggedInRoutes';
import LoggedInRoutes from './routes/NotLoggedInRoutes';
function App() {
  return (
    
<div>
  <BrowserRouter>
  <Routes>
    <Route element={<LoggedInRoutes/>}>
    <Route path='/' element={<Home/>}/> 
    </Route>
    {/* Public */}
    <Route element={<NotLoggedInRoutes/>}>
    <Route path='/login' element={<Login/>}/> 
    <Route path='/register' element={<Register/>}/> 
    </Route>
  </Routes>
  </BrowserRouter>
</div>
  );
}

export default App;
