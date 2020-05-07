import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { handleAddTweet } from "../actions/tweets";

class NewTweet extends Component {
  state = {
    text: "",
    toHome: false,
  };

  handleChange = (e) => {
    const { value: text } = e.target;
    this.setState(() => ({ text }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { text } = this.state;
    const { dispatch, id } = this.props;

    dispatch(handleAddTweet(text, id));

    this.setState(() => ({ text: "", toHome: !id }));
  };

  render() {
    const { text, toHome } = this.state;
    const MAX_LENGTH = 100;
    const tweetLeft = MAX_LENGTH - text.length;

    if (toHome) return <Redirect to="/" />;

    return (
      <div>
        <h3 className="center">Add new Tweet</h3>
        <form className="new-tweet" onSubmit={this.handleSubmit}>
          <textarea
            className="textarea"
            placeholder="What's hapenning?"
            value={text}
            onChange={this.handleChange}
            maxLength={MAX_LENGTH}
          />
          {tweetLeft <= MAX_LENGTH && <div className="tweet-length">{tweetLeft}</div>}
          <button className="btn" type="submit" disabled={!text}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(NewTweet);
