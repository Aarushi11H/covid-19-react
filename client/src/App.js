import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import NavBar from './screens/component/navbar'
import Body_html from './screens/component/body_html'
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <NavBar/>
    <Body_html/>
    </BrowserRouter>
    
  );
}

export default App;
