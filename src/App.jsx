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
    comments: [],
    isLoading: false,
    isError: false,
  };
  handleBookSelected = (book) => {
    this.setState({
      selected: book,
      comments: [],
      isLoading: true,
      isError: false,
    });
  };
  componentDidUpdate(prevProps, prevState) {
    const { selected } = this.state;

    if (selected && selected !== prevState.selected) {
      this.fetchComments(selected.asin);
    }
  }
  componentDidMount = async () => {
    try {
      const { selected } = this.state;

      if (selected) {
        let response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${selected.asin}`, {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZDQ2MDBkOGEyMDAwMThhNDhhNTkiLCJpYXQiOjE3MDQ3MjIwMTQsImV4cCI6MTcwNTkzMTYxNH0.5oiC5NhFirbYT_EbWwpqzpgTapmACPZoCR8RX3knFi8",
          },
        });

        if (response.ok) {
          let comments = await response.json();
          this.setState({ comments: comments, isLoading: false, isError: false });
        } else {
          this.setState({ isLoading: false, isError: true });
        }
      }
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false, isError: true });
    }
  };
  render() {
    return (
      <>
        <MyNav />
        <Container>
          <Welcome />
          <Row>
            <Col md={8}>
              <BookList books={fantasy} onBookSelected={this.handleBookSelected} />
            </Col>
            <Col md={4}>
              <CommentArea
                comments={this.state.comments}
                asin={this.state.selected ? this.state.selected.asin : false}
              />
            </Col>
          </Row>
        </Container>
        <MyFooter />
      </>
    );
  }
}

export default App;
