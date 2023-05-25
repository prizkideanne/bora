import React from "react";
import { useSearchParams } from "react-router-dom";

function Search() {
  const [searchParam] = useSearchParams();
  const type = searchParam.get("type");
  const value = searchParam.get("value");
  console.log("search", type, value);
  return <div>Search</div>;
}

export default Search;
