import React, { useEffect, useState } from "react";

import axios from "axios";
import Carousel from "../components/Carousel";
import Title from "../components/Title";

import ArticleCard from "../components/ArticleCard";
import CategoriesSlider from "../components/CategoriesSlider";
import TopicButton from "../components/TopicButton";
import LoveButton from "../components/LoveButton";
import { API } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addSelectedArticle } from "../store/articleReducer/articleSlice";

function LandingPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [carouselData, setCarouselData] = useState([]);
  const [articles, setArticles] = useState([]);
  const [mostFavoriteArticles, setMostFavoriteArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    id: 9999,
    name: "All",
  });
  const [selectedTopic, setSelectedTopic] = useState();

  useEffect(() => {
    getArticles().then((response) => {
      setTopics(response.filteredKeywords);
      setArticles(response.articles);
      if (selectedCategory.name === "All") {
        setCarouselData(response.articles);
      }
    });
  }, [selectedCategory.id]);

  useEffect(() => {
    getCategories();
    getMostFavoriteArticle();
  }, []);

  const getCategories = async () => {
    axios
      .get(`${API}/blog/allCategory`)
      .then((response) => {
        setCategories([{ id: 9999, name: "All" }, ...response.data]);
      })
      .catch((err) => console.log("categories error:", err));
  };

  const getArticles = async () => {
    const categoryId =
      selectedCategory.name !== "All" ? `&id_cat=${selectedCategory.id}` : "";
    return axios
      .get(`${API}/blog?page=1&sort=DESC${categoryId}`)
      .then((response) => {
        const articles = response.data.result;
        const keywords = [];

        articles.map((article) => {
          const blogKeywords = article.Blog_Keywords;
          blogKeywords.map((keyword) => {
            keywords.push(keyword);
          });
        });
        const filteredKeywords = Array.from(
          new Set(keywords.map((a) => a.KeywordId))
        ).map((id) => {
          return keywords.find((a) => a.KeywordId === id);
        });
        return {
          filteredKeywords,
          articles,
        };
      })
      .catch((err) => console.log(err));
  };

  const getMostFavoriteArticle = async () => {
    return axios
      .get(`${API}/blog/pagFav?listLimit=10`)
      .then((response) => {
        const articles = response.data.result;
        console.log(response);
        setMostFavoriteArticles(articles);
      })
      .catch((err) => console.log(err));
  };

  function loveArticle(id) {
    console.log("aku suka article dengan id ", id);
  }

  function handleSelectArticle(data) {
    dispatch(addSelectedArticle(data));
    navigate("/article");
  }

  return (
    <div>
      <div className="my-10 mx-20">
        <Title text={"Newest Blog"} />

        <Carousel carouselData={carouselData} />

        <div className="w-full grid grid-cols-4 mt-14">
          <div className="col-span-3">
            <CategoriesSlider
              categories={categories}
              selectedCategory={selectedCategory}
              className={"mb-5"}
              onClick={(category) => setSelectedCategory(category)}
            />

            <div className="mb-10">
              {articles.length === 0 ? (
                <div className="flex w-full items-center justify-center flex-col">
                  <img src="https://c-cl.cdn.smule.com/rs-s-sf-2/sing_google/performance/cover/95/7a/14473f05-1c23-4bae-b604-4e6b5168fd37.jpg" />
                  <p className="text-center font-bold text-[52px]">
                    HAHH? KOSONGG??
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-x-10 gap-y-5">
                  {articles.map((data) => {
                    return (
                      <ArticleCard
                        key={data.id}
                        data={data}
                        onLove={(id) => loveArticle(id)}
                        onClick={() => handleSelectArticle(data)}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="px-4 border-l border-[#9B3838] border-dashed ml-4">
            <p className="text-[#1B3044] font-bold text-[18px]">Topics</p>
            <div className="mt-3">
              {topics.map((data) => {
                return (
                  <TopicButton
                    key={data.id}
                    name={data.Keyword.name}
                    onClick={() => console.log("topic selected")}
                    className={"mb-3"}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-14">
          <Title text={"Most Favorite Article"} />
          {mostFavoriteArticles.length === 0 ? (
            <div className="flex w-full items-center justify-center flex-col">
              <img src="https://c-cl.cdn.smule.com/rs-s-sf-2/sing_google/performance/cover/95/7a/14473f05-1c23-4bae-b604-4e6b5168fd37.jpg" />
              <p className="text-center font-bold text-[52px]">
                HAHH? KOSONGG??
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-10 gap-y-5">
              {mostFavoriteArticles.map((data) => {
                return (
                  <div
                    className="flex flex-col justify-between bg-white rounded-lg p-3"
                    key={data.id}
                  >
                    <p className="font-semibold mb-2">{data.title}</p>
                    <div className="flex flex-row items-center">
                      <TopicButton name={data.Category.name} isDisabled />
                      <LoveButton isDisabled loveCount={data.total_fav} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
