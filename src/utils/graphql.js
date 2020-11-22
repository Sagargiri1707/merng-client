import gql from "graphql-tag";

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      body
      id
      createdAt
      username
      comments {
        id
        createdAt
        username
        body
      }
      likes {
        createdAt
        id
        username
      }
      likeCount
      commentCount
    }
  }
`;
