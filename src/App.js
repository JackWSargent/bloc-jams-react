import React from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import Library from './components/Library';
import Landing from './components/Landing';
import Album from './components/Album';
function App() {
  return (
    <div className="App">
      <header>
        <nav>
          <Link to='/'>Landing</Link>
          <Link to='/library'>Library</Link>
        </nav>
        <h1>Bloc Jams</h1>
      </header>
      <main>
        <Route exact path="/" component={Landing} />
        <Route path="/library" component={Library} />
        <Route path="/album" component={Album} />
      </main>
    </div>
  );
}

export default App;
