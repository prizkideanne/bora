import moment from "moment";
import { API, imageLink } from "../utils/constants";
import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import PhotoProfile from "../components/PhotoProfile";
import { useSelector } from "react-redux";
import Loved from "../assets/loved.png";
import TopicButton from "../components/TopicButton";

function Article() {
  const { id } = useParams();
  const { userData } = useSelector((state) => state.user);
  const { token } = userData;
  const [article, setArticle] = useState(null);
  const [user, setUser] = useState(null);
  const [keywords, setKeywords] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoved, setIsLoved] = useState(true);

  // check if content is html or string
  const isHtml = (str) => {
    return /<[a-z][\s\S]*>/i.test(str);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    axios
      .get(API + "/blog/" + id)
      .then((res) => {
        const result = res.data[0];
        setArticle(result);
        setUser(result.User);
        setKeywords(result.Blog_Keywords);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  useEffect(() => {
    if (token && article) {
      getLikedBlog();
    }
  }, [token, article]);

  const loveArticle = () => {
    axios
      .post(
        API + "/blog/like",
        {
          BlogId: article.id,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setIsLoved(true);
      })
      .catch((err) => console.log(err));
  };

  const getLikedBlog = async () => {
    await axios
      .get(API + "/blog/pagLike", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(({ data }) => {
        const articles = data.result;
        console.log(articles, article.id);
        const checkIfAlreadyLoved = articles.some((item) => {
          return item.BlogId === article.id;
        });
        console.log(checkIfAlreadyLoved);
        setIsLoved(checkIfAlreadyLoved);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return isLoading ? (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="h-32 w-32 border-black border-t-2 border-l-2 animate-spin  rounded-full mt-10" />
    </div>
  ) : (
    <div className="min-h-screen">
      <div className="flex flex-col justify-center my-10 mx-20">
        <p className="font-bold text-[#1B3044] text-[30px]">{article.title}</p>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center mt-3">
            <PhotoProfile image={user.imgProfile} className={"w-8 h-8"} />
            <p className="font-semibold text-[#1B3044] text-[16px] ml-3">
              {user.username}
            </p>
            <p className="mx-1 text-[#1B3044] text-[16px]">•</p>
            <p className="text-[#1B3044] text-[16px]">
              {moment(article.createdAt).format("MMMM D, YYYY")}
            </p>
          </div>
          {token && (
            <button
              disabled={isLoved}
              className="bg-gray-400 p-3 rounded-lg flex flex-row items-center disabled:bg-red-400"
              onClick={loveArticle}
            >
              <img src={Loved} className="w-3 h-3 mr-3" />
              <p>Love!</p>
            </button>
          )}
        </div>
        <div className="flex flex-row mt-5">
          {keywords.map((keyword) => {
            return (
              <TopicButton
                key={keyword.id}
                name={keyword.Keyword.name}
                className={"-w-20"}
                isDisabled
              />
            );
          })}
        </div>
        <img
          src={imageLink + article.imageURL}
          className="my-10 w-full h-[600px] object-cover border rounded-lg"
        />
        {isHtml(article.content) ? (
          <div
            className="mt-5 text-left"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        ) : (
          <p className="mt-5 text-left">{article.content}</p>
        )}
      </div>
    </div>
  );
}

export default Article;
