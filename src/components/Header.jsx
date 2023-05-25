import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/userReducer/userSlice";
import ProfileDropdown from "./ProfileDropdown";
import SearchDropdown from "./SearchDropdown";
import { API } from "../utils/constants";

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, userData } = useSelector((state) => state.user);
  const [searchType, setSearchType] = useState("Title");
  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredCategory = categories.filter((category) => {
    return category.name.toLowerCase().includes(searchText.toLowerCase());
  });

  console.log(filteredCategory);

  const dispatch = useDispatch();

  useEffect(() => {
    if (searchType === "Categories") {
      axios
        .get(API + "/blog/allCategory")
        .then((res) => {
          setCategories(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [searchType]);

  const handleSearch = () => {
    navigate("/search?type=" + searchType + "&value=" + searchText);
  };

  return (
    <div className="bg-[#F1C831] flex flex-row justify-between items-center px-10 py-4">
      <div className="flex flex-row items-center">
        <Link to={"/"}>
          <button className="flex flex-row items-center">
            <img src={Logo} className="w-10" />
            <span className="text-[#1B3044]">BORA</span>
          </button>
        </Link>

        <div className="w-[350px] flex flex-row items-center h-8 border border-black rounded-md ml-4">
          <SearchDropdown
            searchType={searchType}
            setSearchType={setSearchType}
          />
          <div className="relative h-full w-full rounded-tr-md rounded-br-md bg-white">
            <input
              placeholder="Search"
              className="h-full w-full rounded-tr-md rounded-br-md pl-3"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                if (searchType === "Categories") {
                  setShowDropdown(true);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            {showDropdown && searchText !== "" && (
              <div className="absolute top-10 bg-white rounded-md z-30">
                {filteredCategory.map((category) => {
                  return (
                    <div
                      className="flex flex-row items-center px-3 py-2 hover:bg-[#F1C831] cursor-pointer"
                      onClick={() => {
                        setSearchText(category.name);
                        setShowDropdown(false);
                      }}
                    >
                      <span className="text-[#1B3044]">{category.name}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-56 text-right">
        {isLoggedIn ? (
          <ProfileDropdown
            user={userData}
            onLogout={() => {
              dispatch(logout());
            }}
          />
        ) : (
          <Link to="/login">
            <button className="border-2 shadow-md shadow-black border-[#9B3838] bg-[#9B3838] rounded-[20px] px-3 py-1 text-[#F3ECD7]">
              Login/Register
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
