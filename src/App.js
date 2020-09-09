import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import PrintBook from './PrintBook';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInput: "harry potter",
      books: [],
      errorMessage: null,
      loading: true
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getBooks = this.getBooks.bind(this);
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  componentDidMount() {
    this.getBooks();
  }

  getBooks() {
    const promise = axios.get('https://www.googleapis.com/books/v1/volumes?q=' + this.state.userInput);
    promise.then((response) => {
      if (response.data.totalItems !== 0) {
        this.setState({
          books: response.data.items,
          loading: false
        });
      } else {
        this.setState({
          books: [],
          errorMessage: "No books found for " + this.state.userInput,
          loading: false
        });
      }
    })
    .catch(() => {
      this.setState({
        errorMessage: "Error: Failed to get a response.",
        loading: false
      });
    });
  }

  handleClick(e) {
    e.preventDefault();

    if(this.state.userInput !== "") {
      this.setState({
        errorMessage: null,
        loading: true
      });

      this.getBooks();
    }
  }

  render() {
    return (
      <form className="App">
        <h1>Books App</h1>
        <input
          name="userInput"
          value={this.state.userInput}
          onChange={this.handleInputChange}
          style={{marginRight: "10px"}}
        />
        <button onClick={this.handleClick}>
          Submit
        </button>
        {this.state.loading && <div style={{textAlign: "center"}}>Loading...</div>}
        {this.state.errorMessage && <div style={{textAlign: "center"}}>{this.state.errorMessage}</div>}
        <ul style={{listStyle: "none"}}>
          {this.state.books.map(book => {
            return (
              <PrintBook
                id={book.id}
                thumbNail={book.volumeInfo.imageLinks === undefined ? "" : book.volumeInfo.imageLinks.smallThumbnail}
                link={book.volumeInfo.previewLink}
                title={book.volumeInfo.title}
                category={book.volumeInfo.categories}
                description={book.volumeInfo.description}
              />
            )
          })}
        </ul>
      </form>
    );
  }
}

export default App;
