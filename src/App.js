import React from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import Library from './components/Library';
import Landing from './components/Landing';
import Album from './components/Album';
function App() {
  return (
    <div className="App">
      <header className="nav-container d-flex h-100 p-3 mx-auto flex-column">
        <nav className="nav nav-masthead justify-content-center">
          <Link className="nav-link" to='/'>Home</Link>
          <Link className="nav-link" to='/library'>Library</Link>
        </nav>
        <h1 className="masthead-brand App-logo">Bloc Jams</h1>
      </header>
      <main>
        <Route exact path="/" component={Landing} />
        <Route path="/library" component={Library} />
        <Route path="/album/:slug" component={Album} />
      </main>
    </div>
  );
}

export default App;
