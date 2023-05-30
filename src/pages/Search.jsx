import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { API } from "../utils/constants";
import ArticlesWithPagination from "../components/ArticlesWithPagination";

function Search() {
  const [searchParam] = useSearchParams();
  const type = searchParam.get("type");
  const value = searchParam.get("value");
  const [page, setPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [sort, setSort] = useState("DESC");
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const title = `&search=${value}`;
    const category = `&id_cat=${value}`;
    axios
      .get(
        API +
          `/blog?size=6&page=${currentPage}&sort=${sort}${
            type === "Title" ? title : category
          }`
      )
      .then(({ data }) => {
        setPage(data.page);
        setCurrentPage(data.blogPage);
        setBlogs(data.result);
      })
      .catch((err) => console.log(err));
  }, [type, value, sort, currentPage]);

  return (
    <div className="min-h-screen mx-20 my-10">
      <div className="flex flex-row justify-between items-center mb-10">
        <p className="text-[30px] text-[#1B3044] font-bold">Search Result</p>
        <div>
          <label className="mr-3 text-lg text-[#1B3044]">Sort by:</label>
          <select
            className="px-3 py-1 rounded-md border border-[#1B3044]"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="DESC">Newest</option>
            <option value="ASC">Oldest</option>
          </select>
        </div>
      </div>
      <ArticlesWithPagination
        articles={blogs}
        page={page}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Search;
