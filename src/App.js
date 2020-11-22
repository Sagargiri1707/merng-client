import { BrowserRouter, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import "./App.css";
import MenuBar from "./component/menuBar";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { AuthProvider } from "./context/auth";
import AuthRoute from "./utils/AuthRoute";
import SinglePost from "./pages/SinglePost";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Container>
          <MenuBar />
          <Route exact path="/" component={Home} />
          <Route exact path="/posts/:postId" component={SinglePost} />
          <AuthRoute exact path="/login" component={Signin} />
          <AuthRoute exact path="/register" component={Signup} />
        </Container>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
