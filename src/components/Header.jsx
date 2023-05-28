import { useState, useEffect } from "react";
import Logo from "../assets/logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { BsPencil } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/userReducer/userSlice";
import ProfileDropdown from "./ProfileDropdown";
import SearchDropdown from "./SearchDropdown";
import { API } from "../utils/constants";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuth = ["/login", "/register", "/forget-password"].includes(
    location.pathname
  );
  const { isLoggedIn, userData } = useSelector((state) => state.user);
  const [searchType, setSearchType] = useState("Title");
  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredCategory = categories.filter((category) => {
    return category.name.toLowerCase().includes(searchText.toLowerCase());
  });

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
    } else {
      setSearchText("");
    }
  }, [searchType]);

  useEffect(() => {
    if (location.pathname !== "/search") {
      setSearchText("");
    }
  }, [location]);

  const handleSearch = () => {
    const value = searchType === "Title" ? searchText : selectedCategory;
    navigate("/search?type=" + searchType + "&value=" + value);
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

        {!isAuth && (
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
                        key={category.name}
                        className="flex flex-row items-center px-3 py-2 hover:bg-[#F1C831] cursor-pointer"
                        onClick={() => {
                          setSearchText(category.name);
                          setSelectedCategory(category.id);
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
        )}
      </div>

      {!isAuth && (
        <div className="text-right">
          {isLoggedIn ? (
            <div className="flex flex-row items-center">
              <Link to="/create">
                <button className="border-2 flex flex-row items-center shadow-md shadow-black border-[#9B3838] bg-[#9B3838] rounded-[20px] px-3 py-1 text-[#F3ECD7] mr-5">
                  <BsPencil color={"#FFF"} />
                  <p className="ml-3 text-sm">Write Something!</p>
                </button>
              </Link>
              <ProfileDropdown
                user={userData}
                onLogout={() => {
                  dispatch(logout());
                  navigate("/");
                }}
              />
            </div>
          ) : (
            <Link to="/login">
              <button className="border-2 shadow-md shadow-black border-[#9B3838] bg-[#9B3838] rounded-[20px] px-3 py-1 text-[#F3ECD7]">
                Login/Register
              </button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default Header;
