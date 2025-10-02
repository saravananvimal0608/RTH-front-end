import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './components/login'
import Master from './components/Master'
import ListAllProperty from './components/ListAllProperty'
import Layout from "./components/Layout"
import ShareDetails from './components/ShareDetails'
import AddProperty from './components/AddProperty'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* layout for all pages SideBar */}
        <Route element={<Layout />}>
          <Route path="/master" element={<Master />} />
          <Route path="/listallproperty" element={<ListAllProperty />} />
          <Route path="/addproperty" element={<AddProperty />} />
          <Route path="/editproperty/:id" element={<AddProperty />} />
          <Route path="/share/:id" element={<ShareDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
