// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AllReferrals } from "../../store/Actions/Authactions";

// function SalesDetails() {
//   const [userCountData, setUserCountData] = useState([]);
//   const [indexOfFilteredData, setIndexOfFilterData] = useState("");
//   const RefferalInformation = useSelector(
//     (state) => state.auth.Referral_AdminData
//   );
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(AllReferrals());
//   }, [dispatch, userCountData]);

//   console.log(RefferalInformation, "........................................admindata");
//   console.log(RefferalInformation?.All_Referral_links, "..........link");

//   // const [affiliatedLinks, setAffiliatedLinks] = useState(
//   //   RefferalInformation?.All_Referral_links
//   // );

//   const handleFilterUsers = (index) => {
//     // const token = affiliatedLinks[index].substring(
//     //   affiliatedLinks[index].lastIndexOf("/") + 1
//     // );

//     // const filteredReferrals = RefferalInformation?.Referral.filter(
//     //   (referral) => referral.token === token
//     // );
//     // setIndexOfFilterData(index);
//     // setUserCountData(filteredReferrals);
//   };

//   // const handleLinkChange = (index, value) => {
//   //   const updatedLinks = [...affiliatedLinks];
//   //   updatedLinks[index] = value;
//   //   console.log
//   //   setAffiliatedLinks(updatedLinks);
//   // };

//   return (
//     <>
//       <div>
//         <div className="relative overflow-x-auto">
//           <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//             <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
//               <tr>
//                 <th scope="col" className="px-6 py-3 rounded-s-lg">
//                   Link
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   Distributer Name
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   No of sales
//                 </th>
//                 <th scope="col" className="px-6 py-3 rounded-e-lg">
//                   List of users Created
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {RefferalInformation?.All_Referral_links?.map((link, index) => (
//                 <tr key={index} className="bg-white dark:bg-gray-800">
//                   <th
//                     scope="row"
//                     className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-[500px]"
//                   >
//                     <p className="w-[200px]">{link}</p>
//                   </th>
//                   <td className="px-6 py-4">Pragati</td>
//                   <td className="px-6 py-4">
//                     {indexOfFilteredData === index ? userCountData.length : "0"}
//                   </td>
//                   <td className="px-6 py-4">
//                     <ol>
//                       {indexOfFilteredData === index ? (
//                         <>
//                           {userCountData.map((item, idx) => (
//                             <li key={idx}>{item.New_user[0].Children_Name}</li>
//                           ))}
//                         </>
//                       ) : (
//                         " "
//                       )}
//                     </ol>
//                   </td>
//                   <td className="px-6 py-4">
//                     <button onClick={() => handleFilterUsers(index)}>
//                       Filter Users
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//             <tfoot>
//               <tr className="font-semibold text-gray-900 dark:text-white">
//                 <th scope="row" className="px-6 py-3 text-base">
//                   Total
//                 </th>
//                 <td className="px-6 py-3">3</td>
//                 <td className="px-6 py-3">21,000</td>
//               </tr>
//             </tfoot>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// }

// export default SalesDetails;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Create_AllReferral,
  Generate_token_for_admin,
} from "../../store/Actions/Authactions";
import { AllReferrals } from "../../store/Actions/Authactions";
function SalesDetails() {
  const [Link, setLink] = useState("");
  const [Distributer, setDistributer] = useState("");

  const dispatch = useDispatch();

  const Generate_token = useSelector(
    (state) => state.auth.Generate_token_for_admin
  );
  const RefferalInformation = useSelector(
    (state) => state.auth.Referral_AdminData
  );

  useEffect(() => {
    dispatch(AllReferrals());
  }, [dispatch]);

  const HandleLinkGenerator = async () => {
    await dispatch(Generate_token_for_admin());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      Link: Link,
      Distributer: Distributer,
    };
    dispatch(Create_AllReferral(formData));
  };

  const countSalesForToken = (token) => {
    // Count occurrences of token in Referral_AdminData
    return (
      RefferalInformation?.Referral?.filter((item) => item.token === token)
        ?.length || 0
    );
  };

  const uniqueDistributerCount =
    RefferalInformation?.All_Referral_links?.reduce((acc, curr) => {
      if (!acc.includes(curr.Distributer)) {
        acc.push(curr.Distributer);
      }
      return acc;
    }, []).length;

  const totalSalesCount = RefferalInformation?.All_Referral_links?.reduce(
    (acc, curr) => {
      const token = curr.Link.replace(/^https?:\/\/[^/]+\/[^/]+\/[^/]+\//, "");
      return acc + countSalesForToken(token);
    },
    0
  );
  const ExtractwholeReferral = (token) => {
    // Count occurrences of token in Referral_AdminData
    return (
      RefferalInformation?.Referral?.filter((item) => item.token === token) ||
      []
    );
  };

  const CountTotalAmount = (token) => {
    const SalesData = ExtractwholeReferral(token);
    // console.log(SalesData, "----------SalesData");

    let totalSalesCount = 0; // Initialize totalSalesCount to 0

    SalesData.forEach((Data) => {
      Data.New_user.forEach((user) => {
        totalSalesCount += user?.Active_Plan_Amount || 0; // Ensure Active_Plan_Amount is not undefined
      });
    });

    // console.log(totalSalesCount, "-----------Total Sales Count");
    return totalSalesCount; // Return the total amount
  };

  return (
    <div style={{ width: "100%" }}>
      <div>
        <div>Generate the Affiliated Link from here:-</div>
        <button
          onClick={HandleLinkGenerator}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 generateLink"
        >
          Generate Link
        </button>
        <br />
        <div className="flex items-center justify-center border-black border-2">
          <p className="w-[800px] break-all ">
            {Generate_token !== null ? Generate_token : null}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              style={{ border: "2px solid black" }}
              placeholder="Link"
              value={Link}
              onChange={(e) => setLink(e.target.value)}
            />
            <input
              type="text"
              placeholder="Distributer"
              style={{ border: "2px solid black" }}
              value={Distributer}
              onChange={(e) => setDistributer(e.target.value)}
            />
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <div>
        <div className="relative overflow-x-auto py-10">
          <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 rounded-s-lg">
                  Link
                </th>{" "}
                <th scope="col" className="px-6 py-3">
                  Distributer Name
                </th>
                <th scope="col" className="px-6 py-3">
                  No of sales
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Amount of sales
                </th>
              </tr>
            </thead>
            <tbody>
              {RefferalInformation?.All_Referral_links?.map((link, index) => {
                const token = link.Link.replace(
                  /^https?:\/\/[^/]+\/[^/]+\/[^/]+\//,
                  ""
                );

                return (
                  <tr key={index} className="bg-white dark:bg-gray-800">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 dark:text-white w-[250px]"
                    >
                      <p className="w-[200px] break-all">{link.Link}</p>
                    </th>
                    <td className="px-6 py-4">{link.Distributer}</td>
                    <td className="px-6 py-4">{countSalesForToken(token)}</td>
                    <td className="px-6 py-4">{CountTotalAmount(token)}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="font-semibold text-gray-900 dark:text-white">
                <th scope="row" className="px-6 py-3 text-base">
                  Total
                </th>
                <td className="px-6 py-3">{uniqueDistributerCount}</td>
                <td className="px-6 py-3">{totalSalesCount}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SalesDetails;
