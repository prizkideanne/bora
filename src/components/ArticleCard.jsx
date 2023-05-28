import moment from "moment";
import { AiOutlineDelete } from "react-icons/ai";

function ArticleCard({ data, onClick, isMyBlog, deleteArticle }) {
  const articleData = data.Blog ? data.Blog : data;

  return (
    <div className="relative z-0 bg-[#F1C831] border border-[#B6C2D9] rounded-md">
      <img
        src={
          articleData.imageURL
            ? `https://minpro-blog.purwadhikabootcamp.com/${articleData.imageURL}`
            : "https://i.kym-cdn.com/photos/images/newsfeed/001/077/564/d5b.jpg"
        }
        className="w-full h-56 object-cover rounded-t-[5px] hover:cursor-pointer"
        onClick={onClick}
      />
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col justify-between">
          <p
            className="text-[#1B3044] font-semibold pt-2 pl-2 hover:cursor-pointer"
            onClick={onClick}
          >
            {articleData.title}
          </p>
          {articleData.User ? (
            <div className="flex flex-row justify-between">
              <div className="relative text-[#1B3044] text-[14px] py-2 pl-2 flex flex-row">
                {articleData.User.username} •{" "}
                {moment(articleData.createdAt).format("MMMM D, YYYY")}
              </div>
            </div>
          ) : (
            <div className="flex flex-row justify-between">
              <div className="relative text-[#1B3044] text-[14px] py-2 pl-2 flex flex-row">
                {moment(articleData.createdAt).format("MMMM D, YYYY")}
              </div>
            </div>
          )}
        </div>

        {isMyBlog && (
          <button className="mr-3 p-2" onClick={deleteArticle}>
            <AiOutlineDelete size={24} />
          </button>
        )}
      </div>
    </div>
  );
}

export default ArticleCard;
