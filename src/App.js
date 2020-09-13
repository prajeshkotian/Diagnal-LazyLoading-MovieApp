import React from 'react';
import './App.css';
import TopNavBar from './Navigation/TopNavBar/TopNavBar';
import MainPage from './Containers/MainPage/MainPage';



function App() {
    return (
        <div className="App">
      
          <TopNavBar />
          <MainPage />
      
    </div>
  );
}

export default App;
