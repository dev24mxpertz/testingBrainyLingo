// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Activate_BuyPlan,
//   GetSessionDetails,
// } from "../../store/Actions/Authactions";
// import { useNavigate } from "react-router-dom";

// function SuccessPayment() {
//   const user = useSelector((state) => state.auth.user);
//   console.log(user, "user at successPage");
//   const loading = useSelector((state) => state.auth.loading);
//   const sessionDetails = useSelector((state) => state.auth.sessionDetails);
//   console.log(sessionDetails, "sessionDetails");

//   const sessionID = localStorage.getItem("SessionID");
//   console.log(sessionID, "sessionID from the localstorage");
//   const dispatch = useDispatch();
//   const navigate = useNavigate()

//   useEffect(() => {
//     if (sessionID) {
//       dispatch(GetSessionDetails(sessionID));
//     }
//   }, [sessionID, dispatch]);

//   useEffect(() => {
//     if (sessionDetails !== null) {
//       const formData = {
//         created: sessionDetails.created,
//         student_id: sessionDetails.metadata.student_id,
//         sessionID: sessionID,
//         Plan_Name: sessionDetails?.metadata?.Plan_Name,
//         isFree: sessionDetails?.metadata?.isFree,
//         Plan_Amount: sessionDetails.amount_total / 100,
//       };
//       dispatch(Activate_BuyPlan(formData));
//     }
//   }, [sessionDetails, dispatch, sessionID]);


//   if (loading) {
//     return <div>....Loading</div>;
//   } else {
//     return (
//       <div
//         className="flex items-center justify-center"
//       >
//         <div className="relative p-4 w-full max-w-md h-full md:h-auto">
//           <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
//             <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
//               <svg
//                 aria-hidden="true"
//                 className="w-8 h-8 text-green-500 dark:text-green-400"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   fill-rule="evenodd"
//                   d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                   clip-rule="evenodd"
//                 ></path>
//               </svg>
//               <span className="sr-only">Success</span>
//             </div>

//             <p className="mb-4 text-lg font-extrabold  text-gray-900 dark:text-white">
//               Payment Successfully
//             </p>

//             <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
//               Amount :{ £{sessionDetails?.amount_total }/100}
//             </p>
//             <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
//               Plan Name : {sessionDetails?.metadata?.Plan_Name}
//             </p>
//             <button
//               onClick={() => navigate("/DashBoard")}
//               data-modal-toggle="successModal"
//               type="button"
//               className="bg-transparent hover:dark:bg-green-900 text-green-400 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
//             >
//               Go To DashBoard
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }


// export default SuccessPayment;


import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Activate_BuyPlan,
  GetSessionDetails,
} from "../../store/Actions/Authactions";
import { useNavigate } from "react-router-dom";

function SuccessPayment() {
  const user = useSelector((state) => state.auth.user);
  // console.log(user, "user at successPage");
  const loading = useSelector((state) => state.auth.loading);
  const sessionDetails = useSelector((state) => state.auth.sessionDetails);
  // console.log(sessionDetails, "sessionDetails");

  const sessionID = localStorage.getItem("SessionID");
  // console.log(sessionID, "sessionID from the localstorage");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionID) {
      dispatch(GetSessionDetails(sessionID));
    }
  }, [sessionID, dispatch]);

  useEffect(() => {
    if (sessionDetails !== null) {
      const formData = {
        created: sessionDetails.created,
        student_id: sessionDetails.metadata.student_id,
        sessionID: sessionID,
        Plan_Name: sessionDetails.metadata.Plan_Name,
        isFree: sessionDetails.metadata.isFree,
        Plan_Amount: sessionDetails.amount_total / 100,
      };
      dispatch(Activate_BuyPlan(formData));
    }
  }, [sessionDetails, dispatch, sessionID]);

  if (loading) {
    return <div>....Loading</div>;
  } else {
    return (
      <div className="flex items-center justify-center">
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-green-500 dark:text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Success</span>
            </div>

            <p className="mb-4 text-lg font-extrabold text-gray-900 dark:text-white">
              Payment Successfully
            </p>

            <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Amount: £{sessionDetails?.amount_total / 100}
            </p>
            <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Plan Name: {sessionDetails?.metadata?.Plan_Name}
            </p>
            <button
              onClick={() => navigate("/DashBoard")}
              data-modal-toggle="successModal"
              type="button"
              className="bg-transparent hover:bg-green-900 text-green-400 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Go To DashBoard
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SuccessPayment;
