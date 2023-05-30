import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { API } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUserData } from "../store/userReducer/userSlice";

function Verification() {
  let { token } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isSucceed, setIsSucceed] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleLoginByToken = () => {
      axios
        .get(API + "/auth", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then(({ data }) => {
          const { id, username, email, phone, imgProfile } = data;
          dispatch(
            addUserData({ id, username, email, phone, imgProfile, token })
          );

          setTimeout(() => {
            navigate("/", { replace: true });
          }, 2000);
        })
        .catch((err) => console.log(err));
    };

    setTimeout(() => {
      axios
        .patch(API + "/auth/verify", null, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then(() => {
          setIsLoading(false);
          setIsSucceed(true);
          setMessage("Verification Success");
          if (location.pathname.includes("email")) {
            setTimeout(() => {
              navigate("/login", { replace: true });
            }, 2000);
          } else {
            handleLoginByToken();
          }
        })
        .catch(({ response }) => {
          setIsLoading(false);
          setIsSucceed(false);
          setMessage(response.data.message);
        });
    }, 3000);
  }, [token, navigate, dispatch]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center">
          <p>Please wait, while we&apos;re validating your registration...</p>
          <div className="h-10 w-10 border-black border-t-2 border-l-2 animate-spin  rounded-full mt-10" />
        </div>
      ) : (
        <div className="relative p-20 bg-yellow-300 rotate-[10deg]">
          <p
            className={`text-[68px] font-bold text-center ${
              isSucceed ? "text-green-500" : "text-red-500"
            }`}
          >
            {isSucceed ? (
              <span>{message}</span>
            ) : (
              <span>
                Verification Failed <br /> {message}
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}

export default Verification;
