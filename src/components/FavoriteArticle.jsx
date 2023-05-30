import { Link } from "react-router-dom";
import LoveButton from "./LoveButton";
import TopicButton from "./TopicButton";

function FavoriteArticle({ data }) {
  return (
    <Link to={"/article/" + data.id}>
      <div className="flex flex-col justify-between bg-red-300 rounded-lg p-3">
        <p className="font-semibold mb-2 text-[18px] text-[#1B3044]">
          {data.title}
        </p>
        <div className="flex flex-row items-center">
          <TopicButton name={data.Category.name} isDisabled />
          <LoveButton isDisabled loveCount={data.total_fav} />
        </div>
      </div>
    </Link>
  );
}

export default FavoriteArticle;
