import React from "react";
import moment from "moment";
import LoveButton from "./LoveButton";

function ArticleCard({ data, onLove, onClick }) {
  return (
    <div className="relative z-0 bg-[#F1C831] border border-[#B6C2D9] rounded-md">
      <img
        src={`https://minpro-blog.purwadhikabootcamp.com/${data.imageURL}`}
        className="w-full h-56 object-cover rounded-t-[5px] hover:cursor-pointer"
        onClick={onClick}
      />
      <div className="flex flex-col justify-between">
        <p
          className="text-[#1B3044] font-semibold pt-2 pl-2 hover:cursor-pointer"
          onClick={onClick}
        >
          {data.title}
        </p>
        <div className="flex flex-row justify-between">
          <div className="relative text-[#1B3044] text-[14px] py-2 pl-2 flex flex-row">
            {data.User.username} •{" "}
            {moment(data.createdAt).format("MMMM D, YYYY")}
            <LoveButton
              loveCount={0}
              onClick={() => {
                onLove(data.id);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
