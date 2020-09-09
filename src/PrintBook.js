import React, { Component } from 'react';

class PrintBook extends Component {
  render() {
    return (
      <li key={this.props.id}>
        <img src={this.props.thumbNail} style={{ width: 200 }} alt="Cover of book" />
        <h3><a href={this.props.link}>{this.props.title}</a></h3>
        <p>Category: {this.props.category}</p>
        <p>{this.props.description}</p>
        <br />
      </li>
    );
  }
}

export default PrintBook;
