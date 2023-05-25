import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { imageLink } from "../utils/constants";

function Article() {
  const { selectedArticle } = useSelector((state) => state.article);
  const user = selectedArticle.User;
  return (
    <div className="min-h-screen">
      <div className="flex flex-col justify-center my-20 mx-40">
        <p className="font-bold text-[30px]">{selectedArticle.title}</p>
        <div className="flex flex-row items-center mt-3">
          <img
            src={imageLink + user.imgProfile}
            className="w-8 h-8 rounded-full mr-2 border-2 border-black"
          />
          <p className="font-semibold">{user.username}</p>
          <p className="mx-1">•</p>
          <p>{moment(selectedArticle.createdAt).format("MMMM D, YYYY")}</p>
        </div>
        <p className="mt-5 text-left">{selectedArticle.content}</p>
      </div>
    </div>
  );
}

export default Article;
