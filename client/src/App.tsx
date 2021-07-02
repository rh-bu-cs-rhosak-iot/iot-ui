import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NotFoundView from './views/NotFoundView';
import HomeView from './views/HomeView';
import Nav from './components/Nav';

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen justify-between">
        <Nav />
        <main className="mb-auto h-10">
          <Switch>
            <Route exact path={'/'} component={HomeView} />
            <Route component={NotFoundView} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
