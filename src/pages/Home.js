import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Transition } from "semantic-ui-react";
import PostCard from "../component/PostCard";
import { AuthContext } from "../context/auth";
import PostForm from "../component/PostForm";
import { FETCH_POSTS_QUERY } from "../utils/graphql";
import { Redirect } from "react-router-dom";
function Home(props) {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <Grid columns={3} divided>
        <Grid.Row className="page-title">
          <h2>Recent posts</h2>
        </Grid.Row>

        <Grid.Row>
          {user && (
            <Grid.Column>
              <PostForm />
            </Grid.Column>
          )}
          {loading ? (
            <h1>Loading posts...</h1>
          ) : (
            <Transition.Group>
              {data &&
                data.getPosts.map((post) => (
                  <Grid.Column key={post.id} style={{ marginBottom: "20px" }}>
                    <PostCard post={post} />
                  </Grid.Column>
                ))}
            </Transition.Group>
          )}
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Home;
