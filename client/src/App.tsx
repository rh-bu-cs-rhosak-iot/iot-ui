import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NotFoundView from './views/NotFoundView';
import HomeView from './views/HomeView';
import Nav from './components/Nav';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import MetersListView from './views/MetersList';

const client = new ApolloClient({
  uri: getGraphqlHost(),
  cache: new InMemoryCache()
});
console.log('connecting to graphql service at', getGraphqlHost());

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex flex-col h-screen justify-between">
          <Nav />
          <main className="mb-auto h-10">
            <Switch>
              <Route exact path={'/'} component={HomeView} />
              <Route exact path={'/meters'} component={MetersListView} />
              <Route component={NotFoundView} />
            </Switch>
          </main>
        </div>
      </Router>
    </ApolloProvider>
  );
}

function getGraphqlHost(): string {
  return (
    window.location.protocol +
    '//' +
    window.location.host +
    '/meters-graphql/graphql'
  );
}

export default App;
