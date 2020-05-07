import { saveLikeToggle, saveTweet } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";

export const RECEIVE_TWEETS = "RECEIVE_TWEETS";
export const TOGGLE_TWEET = "TOGGLE_TWEET";
export const ADD_TWEET = "ADD_TWEET";

const toggleTweet = (payload) => ({
  type: TOGGLE_TWEET,
  ...payload,
});

const addTweet = (tweet) => ({
  type: ADD_TWEET,
  tweet,
});

export const receiveTweets = (tweets) => ({
  type: RECEIVE_TWEETS,
  tweets,
});

export const handleToggleTweet = (payload) => {
  return (dispatch) => {
    dispatch(toggleTweet(payload));

    return saveLikeToggle(payload).catch((e) => {
      console.error("handleToggleTweet", e);
      dispatch(toggleTweet(payload));

      alert("Error while liking this tweet. Please, try again.");
    });
  };
};

export const handleAddTweet = (text, replyingTo) => {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());

    return saveTweet({
      text,
      author: authedUser,
      replyingTo,
    })
      .then((tweet) => dispatch(addTweet(tweet)))
      .then(() => dispatch(hideLoading()));
  };
};
