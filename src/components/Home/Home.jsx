import axios from "axios";
import Posts from "../Posts/Posts";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Loading from "./../Loading/Loading";
import CreatePost from "../CreatePost/CreatePost";

export default function Home() {
  const { token } = useContext(UserContext);
  async function getAllPosts() {
    const options = {
      url: `https://linked-posts.routemisr.com/posts?limit=50&sort=-createdAt`,
      method: "GET",
      headers: {
        token,
      },
    };
    return await axios.request(options);
  }

  let { data, isLoading } = useQuery({
    queryKey: ["getPosts"],
    queryFn: getAllPosts,
    refetchInterval: 60000,
    select: (data) => data.data.posts,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <CreatePost />
      <div className="w-full md:w-[80%] lg:w-[50%] px-5 mx-auto">
        {data?.map((post) => (
          <Posts postInfo={post} key={post._id} />
        ))}
      </div>
    </>
  );
}
