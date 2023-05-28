import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { API } from "../utils/constants";
import CreateArticleField from "../components/CreateArticleField";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ArticleCategoryField from "../components/ArticleCategoryField";
import { useNavigate } from "react-router";

function Create() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { token } = userData;
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

  const [cover, setCover] = useState(null);
  const [query, setQuery] = useState("");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
      content: "",
      country: "",
      category: "",
      url: "",
      keywords: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      content: Yup.string().required("Required"),
      country: Yup.string().required("Required"),
      category: Yup.object().required("Required"),
      url: Yup.string(),
      keywords: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const { category, content, country, keywords, title, url } = values;
      const body = {
        title,
        url,
        keywords,
        country,
        content,
        CategoryId: category.id,
      };
      const data = new FormData();
      data.append("data", JSON.stringify(body));
      data.append("file", cover);
      axios
        .post(API + "/blog", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => {
          console.log(data);
          navigate("/article/" + data.data.id, { replace: true });
        })
        .catch((err) => {
          if (err.response) {
            console.log("ERROR", err.response, API + "/blog");
          }
        });
    },
  });

  useEffect(() => {
    if (token) {
      axios
        .get(API + "/blog/allCategory")
        .then((res) => {
          setCategories(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token]);

  useEffect(() => {
    if (query) {
      const filtered = categories.filter((category) =>
        category.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(categories);
    }
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col px-20 py-10">
      <div className="flex flex-row justify-between items-center mb-10">
        <p className="text-[28px] font-bold">
          Let&apos;s write something right now!
        </p>

        <button
          type="submit"
          className="bg-[#FFB800] text-white px-10 py-2 rounded-lg"
          onClick={() => {
            formik.handleSubmit();
          }}
        >
          Publish
        </button>
      </div>
      <div className="flex flex-col">
        <CreateArticleField
          title="Title"
          fieldName={"title"}
          formik={formik}
          placeholder={"Write your title here"}
        />
        <div className="flex flex-row items-center mb-10">
          <label className="w-[200px] font-medium text-[20px]">
            Categories
          </label>
          <ArticleCategoryField
            categories={query ? filteredCategories : categories}
            query={query}
            setQuery={setQuery}
            selected={formik.values.category}
            setSelected={(value) => {
              formik.setFieldValue("category", value);
            }}
          />

          {/* Show error when category is not selected */}
          {formik.touched.category && formik.errors.category ? (
            <p className="text-red-500 text-sm ml-5">
              {formik.errors.category}
            </p>
          ) : null}
        </div>
        <CreateArticleField
          title="Country"
          fieldName={"country"}
          formik={formik}
          placeholder={"Country"}
        />
        <CreateArticleField
          title="Url"
          fieldName={"url"}
          formik={formik}
          placeholder={"url"}
        />
        <CreateArticleField
          title="Keywords"
          fieldName={"keywords"}
          formik={formik}
          placeholder={"Keywords"}
        />
        {/* Cover Image */}
        <div className="flex flex-row items-center">
          <label className="w-[162px] font-medium text-[20px]">
            Cover Image
          </label>

          <div className="flex flex-col bg-white">
            <input
              type="file"
              onChange={(e) => {
                setCover(e.target.files[0]);
              }}
            />
          </div>
        </div>
        {cover && (
          <img
            src={URL.createObjectURL(cover)}
            className="w-[300px] h-[300px] object-cover my-10 ml-[162px]"
          />
        )}
        <div className="bg-white p-5 min-h-[590px] rounded-lg mt-10">
          <ReactQuill
            theme="snow"
            className="h-[500px]"
            value={formik.values.content}
            onChange={(e) => {
              formik.setFieldValue("content", e);
            }}
          />
        </div>
        <div className="flex justify-center mt-10 w-full">
          <button
            type="submit"
            className="bg-[#FFB800] text-white px-40 py-4 text-[20px] rounded-lg"
            onClick={() => {
              formik.handleSubmit();
            }}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}

export default Create;
