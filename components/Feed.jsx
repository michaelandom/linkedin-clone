import { useEffect, useState } from "react";
import { handlePostState, useSSRPostsState } from "../atoms/postAtom";
import Input from "./Input";
import { useRecoilState } from "recoil";
import Post from "./Post";

function Feed({ posts }) {
  const [realTimePosts, setRealTimePost] = useState([]);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  const [useSSRPosts, setUseSSRPosts] = useRecoilState(useSSRPostsState);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/posts", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const responseData = await response.json();
      setRealTimePost(responseData);
      setHandlePost(false);
      setUseSSRPosts(false);
    };

    fetchPosts();
  }, [handlePost]);
  console.log(realTimePosts);
  return (
    <div className="space-y-6 pb-24 max-w-lg">
      <Input />
      {/* post */}
      
      {!useSSRPosts ? realTimePosts.map((post) => (
        <Post key={post._id} post={post}/>
      )):posts.map((post) => (<Post key={post._id} post={post}/>) )
    }
    </div>
  );
}

export default Feed;
