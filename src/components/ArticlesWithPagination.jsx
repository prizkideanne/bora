import ReactPaginate from "react-paginate";
import ArticleCard from "./ArticleCard";
import { useNavigate } from "react-router";

function ArticlesWithPagination({
  articles,
  page,
  setCurrentPage,
  isMyBlog = false,
  deleteArticle,
}) {
  const navigate = useNavigate();
  return articles.length === 0 ? (
    <div className="flex w-full items-center justify-center flex-col">
      <img src="https://c-cl.cdn.smule.com/rs-s-sf-2/sing_google/performance/cover/95/7a/14473f05-1c23-4bae-b604-4e6b5168fd37.jpg" />
      <p className="text-center font-bold text-[52px]">HAHH? KOSONGG??</p>
    </div>
  ) : (
    <div className="flex flex-col">
      <div className="grid grid-cols-3 gap-5">
        {articles.map((article) => {
          return (
            <ArticleCard
              key={article.id}
              data={article}
              onClick={() => navigate(`/article/${article.id}`)}
              isMyBlog={isMyBlog}
              deleteArticle={() => deleteArticle(article.id)}
            />
          );
        })}
      </div>
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={page}
        onPageChange={(res) => {
          setCurrentPage(res.selected + 1);
        }}
        onClick={(selected) => setCurrentPage(selected + 1)}
        containerClassName={
          "flex flex-row justify-around items-center w-full mt-10"
        }
        disabledClassName={"text-gray-400 flex justify-center items-center"}
        activeClassName={
          "bg-white text-black w-10 h-10 rounded-full flex justify-center items-center"
        }
      />
    </div>
  );
}

export default ArticlesWithPagination;
