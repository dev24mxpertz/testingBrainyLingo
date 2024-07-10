import React, { useEffect, useRef, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import signInImg from "../../Assets/Images/signImg.png";
import Button from "../../Components/Button.jsx";
import "../../Styles/AuthPage.css";
import { SignUp_user, Signin_user } from "../../store/Actions/Authactions.js";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [UserName, setUserName] = useState("");
  const [childrenName, setchildrenName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [UserNameError, setUserNameError] = useState("");
  const [childrenError, SetChildrenError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [childNamewithGoogle, setChildNameWithGoogle] = useState(false);
  const [childNameFromGoogle, setChildNameFromGoogle] = useState("");
  const [submitChildNamePopup, setSubmitChildNamePopUp] = useState(false);
  const [decodedToken, setDecodedToken] = useState(null); // State to store decoded token
  const [ShowTermsViaGoogle, setShowTermsViaGoogle] = useState(false);
  const [isTermsViaGoogleChecked, setisTermsViaGoogleChecked] = useState(false);

    const googleLoginButtonRef = useRef(null);
  const handleTermsChange = () => {
    setTermsChecked(!termsChecked);
  };

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userType = useSelector((state) => state.auth.userType);

  useEffect(() => {
    if (isAuthenticated > 0) {
      switch (userType) {
        case "student":
          // navigate("/loggedInHome");
          navigate("/DashBoard");
          break;
        case "admin":
          navigate("/Admin");
          break;
        default:
          navigate("/SignUpPage");
      }
    } else {
      navigate("/SignUpPage");
    }
  }, [isAuthenticated, userType, navigate]);

  const validateInputs = () => {
    let isValid = true;

    // Normalize inputs to lower case for case-insensitive comparison
    const normalizedUserName = UserName.trim().toLowerCase();
    const normalizedEmail = email.trim().toLowerCase();

    if (UserName.trim() === "") {
      setUserNameError("Full name is required");
      isValid = false;
    } else if (normalizedUserName.includes("admin")) {
      setUserNameError(
        "You cannot sign up with this name. Please use a different name."
      );
      isValid = false;
    }

    if (childrenName.trim() === "") {
      SetChildrenError("Children is required");
      isValid = false;
    }

    if (email.trim() === "") {
      setEmailError("Email address is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email address is invalid");
      isValid = false;
    } else if (normalizedEmail.includes("admin")) {
      setEmailError(
        "You cannot sign up with this email. Please use a different email."
      );
      isValid = false;
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      isValid = false;
    } else if (
      !/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/.test(
        password
      )
    ) {
      setPasswordError(
        "Password must be 8 or more characters long and contain at least one letter, one number, and one special character"
      );
      isValid = false;
    }

    if (termsChecked === false) {
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateInputs()) {
      dispatch(
        SignUp_user({
          Username: UserName,
          Email: email,
          Password: password,
          Children_Name: childrenName,
        })
      ).then(() => {
        // navigate("/loggedInHome");
        navigate("/DashBoard");
      });
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onSuccess = (response) => {
    // console.log("Login Success:", response);
    const decoded = jwtDecode(response.credential);
    setDecodedToken(decoded); // Store decoded token
    setChildNameWithGoogle(true);
  };

  const SubmitChildName = () => {
    setSubmitChildNamePopUp(true);
    setChildNameWithGoogle(false);

    if (childNameFromGoogle.trim() !== "" && decodedToken) {
      dispatch(
        SignUp_user({
          Username: decodedToken.name,
          Email: decodedToken.email,
          Password: `${decodedToken.name}@12345`,
          Children_Name: childNameFromGoogle,
          FromGoogle: true,
        })
      ).then((result) => {
        if (result.payload === "Student Email already exists") {
          dispatch(
            Signin_user({
              Email: decodedToken.email,
              Password: `${decodedToken.name}@12345`,
            })
          )
            .then(() => {})
            .catch((error) => {
              toast.error(`Error: ${error.message}`);
            });
        }
      });
    }
  };

  const onFailure = (error) => {
    // console.log("Login Failed:", error);
    toast.error("Something Went Wrong in the Google Signin");
  };

  const handleShowTermsViaGoogle = (event) => {
    console.log("handleShowTermsViaGoogle clicker here /////////, ", event);
    // event.preventDefault();
    setShowTermsViaGoogle(true);
    if (googleLoginButtonRef.current) {
      googleLoginButtonRef.current.click();
    }
  };

  const handleCheckboxChanged = (e) => {
    setisTermsViaGoogleChecked(e.target.value);
    setShowTermsViaGoogle(false);
  };

  return (
    <div>
      <div>
        <div className="signInHd flex items-center justify-center flex-col p-6">
          <h1 className="font-semibold font-poppins learnWithUs ">
            Unlock the Power of Words
          </h1>
          <p className=" font-poppins font-light accessNew ">
            Play, Read, and Elevate Your Vocabulary!
          </p>
        </div>
        <div className="SignInContainer">
          <div className="signInBox1">
            <div className="signImgBox">
              <img src={signInImg} alt="illustration" />
            </div>
          </div>
          <div className="signInBox2">
            <h2 className="font-poppins font-normal text-white SignText">
              Sign up now
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col py-2 ">
                <label className=" font-poppins text-white userInfoText">
                  Full Name
                </label>
                <input
                  type="text"
                  value={UserName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                    setUserNameError("");
                  }}
                  required
                  className="userInfoBox"
                />
                {UserNameError && (
                  <span className="text-red-500">{UserNameError}</span>
                )}
              </div>
              <div className="flex flex-col py-2 ">
                <label className=" font-poppins text-white userInfoText">
                  Children Name
                </label>
                <input
                  type="text"
                  value={childrenName}
                  onChange={(e) => {
                    setchildrenName(e.target.value);
                    SetChildrenError("");
                  }}
                  required
                  className="userInfoBox"
                />
                {childrenError && (
                  <span className="text-red-500">{childrenError}</span>
                )}
              </div>
              <div className="flex flex-col py-2 ">
                <label className=" font-poppins text-white userInfoText">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                  required
                  className="userInfoBox"
                />
                {emailError && (
                  <span className="text-red-500">{emailError}</span>
                )}
              </div>
              <div className="flex flex-col py-2 ">
                <label className="flex justify-between font-poppins text-white userInfoText">
                  <p>Password</p>
                  <p className="flex gap-2 items-center">
                    <span onClick={togglePasswordVisibility}>
                      {passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                    </span>
                    Hide
                  </p>
                </label>
                <input
                  type={passwordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError("");
                  }}
                  required
                  className="userInfoBox"
                />
                <p className="font-poppins text-white text-left">
                  Use 8 or more characters with a mix of letters, numbers &
                  symbols
                </p>
                {passwordError && (
                  <span className="text-red-500">{passwordError}</span>
                )}
              </div>
              <div>
                <div className="checkbox-container py-4">
                  <input
                    type="checkbox"
                    id="termsCheckbox"
                    checked={termsChecked}
                    onChange={handleTermsChange}
                    className="checkItem"
                  />
                  <label
                    htmlFor="termsCheckbox"
                    className="font-poppins text-white checkbox-text"
                  >
                    By creating an account, I agree to our{" "}
                    <span className="underline text-sky-500">
                      <Link to="/TermsOfUse">Terms of use</Link>
                    </span>{" "}
                    and
                    <span className="underline text-sky-500">
                      <Link to="/PolicyPrivacy"> Privacy Policy</Link>
                    </span>
                  </label>
                </div>
              </div>
              {/* -------- Single Click  -----------*/}
              <div
                className="flex items-center justify-center"
                style={{
                  marginBottom: "20px",
                  width: "100%",
                  padding: "0px 80px",
                }}
              >
                <GoogleLogin
                  buttonText="Signup with Google"
                  // onSuccess={handleShowTermsViaGoogle}
                  theme="filled_black"
                  text="signup_with"
                  shape="rectangular"
                  onSuccess={onSuccess}
                  click_listener={handleShowTermsViaGoogle}
                  onError={onFailure}
                  ref={googleLoginButtonRef}
                />
              </div>
              {/* ---------------------------------------------------------------- */}
              <div className=" flex flex-col items-center text-white gap-4 ">
                <div className=" w-[100%] text-white">
                  <Button btnText="Sign Up" onClickFunction={handleSubmit} />
                </div>
                <div className="flex gap-6">
                  <p>Already have an account? </p>
                  <Link to="/SignInPage">
                    <p className="underline text-sky-500">Log in</p>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {childNamewithGoogle && (
        <>
          <div className="popup-backdrop flex">
            <div className="popup">
              <div>
                <h2 className="font-poppins font-normal text-white SignText">
                  Enter Child Name
                </h2>
                <form>
                  <div className="flex flex-col sm:py-4 py-2">
                    <label className=" font-poppins text-white userInfoText">
                      Enter Your Child's Name
                    </label>
                    <input
                      type="text"
                      value={childNameFromGoogle}
                      onChange={(e) => setChildNameFromGoogle(e.target.value)}
                      required
                      className="userInfoBox"
                    />
                  </div>
                </form>
                <button onClick={SubmitChildName}>Submit</button>
              </div>
            </div>
          </div>
        </>
      )}
      {ShowTermsViaGoogle && (
        <>
          <div style={{ zIndex: 9999 }} className="popup-backdrop flex">
            <div className="popup">
              <div>
                <h2 className="font-poppins font-normal text-white SignText">
                  Please Check the Terms and policy for Processed
                </h2>
                <form>
                  <div className="flex flex-row sm:py-4 py-2">
                    <input
                      type="checkbox"
                      value={isTermsViaGoogleChecked}
                      onChange={(e) => handleCheckboxChanged(e)}
                      required
                      // className=""
                      ref={googleLoginButtonRef}
                    />
                    <label
                      style={{ marginLeft: "10px" }}
                      className=" font-poppins text-white userInfoText"
                    >
                      Please Check the{" "}
                      <Link
                        style={{
                          marginRight: "7px",
                          color: "blue",
                          fontWeight: "700",
                        }}
                        to="/TermsOfUse"
                      >
                        Terms & Conditions
                      </Link>
                      {""}
                      and{" "}
                      <Link
                        style={{ color: "blue", fontWeight: "700" }}
                        to="/PolicyPrivacy"
                      >
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                </form>
                {/* <button onClick={handleeSubmitCheckbox}>Submit</button> */}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SignUpPage;
