import faker from "@faker-js/faker";
import { useState } from "react";
import moment from "moment";

export default function AddComment({postId, setComment }) {
  const [input, setInput] = useState("");
  const changeHandler = (e) => {
    const newInput = e.target.value;
    setInput(newInput);
  };

  const submitForm = (e) => {
    e.preventDefault();

    var userComment = {
      name: faker.name.firstName(),
      img: faker.image.avatar(),
      id: Math.random() * 1000,
      date: moment().calendar(),
      comment: input,
      postID: postId,
    };

    if (localStorage.getItem("comments")) {
      let arr = JSON.parse(localStorage.getItem("comments"));
      let commnets = arr.filter((comment) => {
        return comment.postID === postId;
      });
      arr.push(userComment);
      commnets.push(userComment);
      localStorage.setItem("comments", JSON.stringify(arr));
      setComment(commnets);
    } else {
      localStorage.setItem("comments", JSON.stringify([userComment]));
      setComment([userComment]);
    }

    setInput("");
  };

  return (
    <form>
      <div>
        <input
          type="text"
          placeholder="Add Comment..."
          className="border border-gray-400 rounded-lg p-2 w-full"
          onChange={changeHandler}
          value={input}
        />
        <button
          className="block w-2/4 m-auto px-4 py-2 text-sm bg-gray-100 text-gray-900 mt-2 rounded-lg"
          onClick={submitForm}
        >
          Add comment
        </button>
      </div>
    </form>
  );
}
