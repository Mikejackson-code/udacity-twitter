import { RECEIVE_TWEETS, TOGGLE_TWEET, ADD_TWEET } from "../actions/tweets";

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_TWEETS:
      return {
        ...state,
        ...action.tweets,
      };
    case TOGGLE_TWEET:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          likes: action.hasLiked
            ? state[action.id].likes.filter((uid) => uid !== action.authedUser)
            : state[action.id].likes.concat([action.authedUser]),
        },
      };
    case ADD_TWEET:
      const { tweet } = action;

      const replyingTo = tweet.replyingTo
        ? {
            [tweet.replyingTo]: {
              ...state[tweet.replyingTo],
              replies: state[tweet.replyingTo].replies.concat([tweet.id]),
            },
          }
        : {};

      return { ...state, [tweet.id]: tweet, ...replyingTo };
    default:
      return state;
  }
};
