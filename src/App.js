import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./pages/About";
import Article from "./pages/Article";
import Error from "./pages/Error";
import Navbar from "./pages/Navbar";
import ArticlesList from "./pages/ArticlesList";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route path="/" component={ArticlesList} exact />
          <Route path="/about" component={About} />
          <Route path="/article/:name" component={Article} />
          <Route path="/404notfound" component={Error} />
          <Route path="*" component={Error} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
