import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import PhotoProfile from "../components/PhotoProfile";
import ArticlesWithPagination from "../components/ArticlesWithPagination";
import useAuth from "../hooks/useAuth";
import EditPhotoProfile from "../components/EditPhotoProfile";
import UserInformation from "../components/UserInformation";
import ChangePassword from "../components/ChangePassword";
import { API } from "../utils/constants";
import DeleteModal from "../components/DeleteModal";

function Profile() {
  const { userData } = useSelector((state) => state.user);
  const { username, email, phone, imgProfile, token } = userData;
  const { logout } = useAuth({ token });
  const navigate = useNavigate();

  const [tabIndex, setTabIndex] = useState(0);
  // My Articles
  const [myArticles, setMyArticles] = useState([]);
  const [myArticlePage, setMyArticlePage] = useState(0);
  const [myArticleCurrentPage, setMyArticleCurrentPage] = useState(0);

  // Liked Blog
  const [likedArticles, setLikedArticles] = useState([]);
  const [likedArticlePage, setLikedArticlePage] = useState(0);
  const [likedArticleCurrentPage, setLikedArticleCurrentPage] = useState(0);

  // Edit Profile
  const [previewImg, setPreviewImg] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isShowModal, setIsShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  // User Information Form
  const usernameForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: username ?? "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Don't leave it blank")
        .min(5, "Minimum 5 characters"),
    }),
    onSubmit: () => {
      if (username !== usernameForm.values.username) {
        apiHandler(API + "/auth/changeUsername", {
          currentUsername: username,
          newUsername: usernameForm.values.username,
        })
          .then(() => {
            handleSuccessEdit(
              "Username has been changed, please check your email"
            );
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  });

  const emailForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: email ?? "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Don't leave it blank"),
    }),
    onSubmit: () => {
      if (email !== emailForm.values.email) {
        apiHandler(API + "/auth/changeEmail", {
          currentEmail: email,
          newEmail: emailForm.values.email,
        })
          .then(() => {
            handleSuccessEdit(
              "Email has been changed, please check your email"
            );
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  });
  const phoneForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      phone: phone ?? "",
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .required("Don't leave it blank")
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(10, "Minimum 10 characters")
        .max(12, "Maximum 12 characters"),
    }),
    onSubmit: () => {
      if (phone !== phoneForm.values.phone) {
        apiHandler(API + "/auth/changePhone", {
          currentPhone: phone,
          newPhone: phoneForm.values.phone,
        })
          .then((res) => {
            console.log(res);
            handleSuccessEdit(
              "Phone has been changed, please check your email"
            );
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  });

  // Change Password Form
  const passwordForm = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Don't leave it blank"),
      newPassword: Yup.string()
        .required("Don't leave it blank")
        .min(8, "Minimum 8 characters"),
      confirmPassword: Yup.string()
        .required("Don't leave it blank")
        .oneOf([Yup.ref("newPassword"), null], "Password must match"),
    }),
    onSubmit: (values) => {
      console.log("password form", values);
      apiHandler(API + "/auth/changePass", {
        currentPassword: values.oldPassword,
        password: values.newPassword,
        confirmPassword: values.confirmPassword,
      })
        .then((res) => {
          console.log(res);
          handleSuccessEdit("Password has been changed, please login again");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  // Utils
  const apiHandler = async (url, data) => {
    await axios.patch(url, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  };

  const handleSuccessEdit = (message) => {
    alert(message);
    logout();
    navigate("/", { replace: true });
  };

  // Initialize Data when page rendered
  useEffect(() => {
    if (token) {
      // wait until all data is fetched
      Promise.all([getMyBlog(), getLikedBlog()])
        .then(() => {
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token]);

  const getMyBlog = async () => {
    return await axios
      .get(API + "/blog/pagUser", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(({ data }) => {
        console.log(data);
        setMyArticlePage(data.page);
        setMyArticleCurrentPage(data.blogPage);
        setMyArticles(data.result);
        return true;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLikedBlog = async () => {
    return await axios
      .get(API + "/blog/pagLike", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(({ data }) => {
        setLikedArticlePage(data.blogPage);
        setLikedArticleCurrentPage(data.blogPage);
        setLikedArticles(data.result);
        return true;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Handle Change Profile Picture
  const handleChangeProfilePicture = (image) => {
    setPreviewImg(URL.createObjectURL(image));

    const file = new FormData();
    file.append("file", image);

    axios
      .post(API + "/profile/single-uploaded", file, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        // reload window
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteArticle = () => {
    axios
      .patch(API + `/blog/remove/${selectedArticle}`, null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        getMyBlog();
        setIsShowModal(false);
      })
      .catch((err) => console.log(err));
  };

  return isLoading ? (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="h-32 w-32 border-black border-t-2 border-l-2 animate-spin  rounded-full mt-10" />
    </div>
  ) : (
    <div className="p-20 min-h-screen">
      <DeleteModal
        isOpen={isShowModal}
        setIsOpen={setIsShowModal}
        onDelete={deleteArticle}
      />
      <div className="flex flex-row">
        <div className="flex flex-col items-center justify-center w-[350px] h-[400px] p-5 rounded-lg bg-blue-400 mt-10 mr-10">
          <PhotoProfile image={imgProfile} className={"w-40 h-40 mb-5"} />
          <p className="text-[32px] font-semibold">{username}</p>
          <p className="text-[18px] my-1">{email}</p>
          <p className="text-[18px]">{phone}</p>
        </div>
        <Tabs
          selectedIndex={tabIndex}
          onSelect={(index) => setTabIndex(index)}
          className={"w-full"}
        >
          <TabList>
            <Tab>My Blog</Tab>
            <Tab>Liked Blog</Tab>
            <Tab>Edit Profile</Tab>
          </TabList>
          <TabPanel className={"p-3"}>
            <ArticlesWithPagination
              articles={myArticles}
              page={myArticlePage}
              currentPage={myArticleCurrentPage}
              setCurrentPage={setMyArticleCurrentPage}
              isMyBlog
              deleteArticle={(id) => {
                setSelectedArticle(id);
                setIsShowModal(true);
              }}
            />
          </TabPanel>
          <TabPanel className={"p-3"}>
            <ArticlesWithPagination
              articles={likedArticles}
              page={likedArticlePage}
              currentPage={likedArticleCurrentPage}
              setCurrentPage={setLikedArticleCurrentPage}
            />
          </TabPanel>
          <TabPanel>
            <div className="flex flex-col w-full">
              {/* Photo Profile */}
              <EditPhotoProfile
                previewImg={previewImg}
                handleChangeProfilePicture={handleChangeProfilePicture}
                imgProfile={imgProfile}
              />
              {/* User Information */}
              <UserInformation
                usernameForm={usernameForm}
                emailForm={emailForm}
                phoneForm={phoneForm}
              />

              <ChangePassword passwordForm={passwordForm} />
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default Profile;
