import React, { useEffect, useState } from "react";
import Comments from "../Comments/Comments";

function Posts() {
  const [input, setInput] = useState("");
  const [post, setPost] = useState([]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (localStorage.getItem("post")) {
      setPost(JSON.parse(localStorage.getItem("post")));
    }
  }, []);

  const changeHandler = (e) => {
    const newInput = e.target.value;
    setInput(newInput);
  };

  const submitForm = (e) => {
    e.preventDefault();
    var userPost = {
      postId: count,
      postContent: input,
    };
    if (localStorage.getItem("post")) {
      let arr = JSON.parse(localStorage.getItem("post"));
      arr.push(userPost);
      localStorage.setItem("post", JSON.stringify(arr));
    } else {
      localStorage.setItem("post", JSON.stringify([userPost]));
    }
    localStorage.setItem("count", JSON.stringify(count + 1));
    setCount(count + 1);
    setPost([...post, userPost]);
    setInput("");
  };

  return (
    <div className="w-2/4 flex flex-col justify-center items-center mt-32 m-auto">
      <form className="sm:w-[400px] md:w-3/4 mb-10">
        <div className="flex gap-4 w-full">
          <input
            type="text"
            placeholder="Type a post ...."
            onChange={changeHandler}
            value={input}
            className="border border-gray-400 rounded-lg p-2 w-full"
          />
          <button
            className="px-4 py-1 ring-2 ring-gray-300 bg-gray-100 rounded-3xl"
            onClick={submitForm}
          >
            Post
          </button>
        </div>
      </form>

      {post.map((posts, index) => (
        <div
          key={index}
          className="sm:w-[400px] md:w-3/4 mb-10 bg-opacity-50 bg-blue-400 p-5 "
        >
          <div className="p-10">
            <div className="">
              <div className="w-full text-2xl">{posts.postContent}</div>
            </div>
            <div className="mt-10 ">
              <div className=""></div>
              <Comments key={Date.now()} postId={posts.postId} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Posts;
