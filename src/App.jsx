import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MyNav from "./components/MyNav";
import MyFooter from "./components/MyFooter";
import Welcome from "./components/Welcome";
// import AllTheBooks from './components/AllTheBooks'
import { Col, Container, Row } from "react-bootstrap";
import BookList from "./components/BookList";

import fantasy from "./data/fantasy.json";
import CommentArea from "./components/CommentArea";
import { Component } from "react";

class App extends Component {
  state = {
    selected: false,
  };
  handleBookSelected = (asin) => {
    this.setState({
      selected: asin,
    });
  };

  render() {
    return (
      <>
        <MyNav />
        <Container>
          <Welcome />
          <Row>
            <Col md={8}>
              <BookList books={fantasy} onBookSelected={this.handleBookSelected} selected={this.state.selected} />
            </Col>
            <Col md={4}>
              <CommentArea asin={this.state.selected ? this.state.selected : false} />
            </Col>
          </Row>
        </Container>
        <MyFooter />
      </>
    );
  }
}

export default App;
