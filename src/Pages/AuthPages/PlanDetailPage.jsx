import React from 'react'
import { useSelector } from 'react-redux';
import SelectPlan from '../../Components/Home/Select-Plan';

function PlanDetailPage() {


  const user = useSelector((state) => state.auth.user);

  // console.log(user);

  return (
    <div className=" text-white">
      {user?.isFreePlan ? (
        user?.Active_Plan === "" ? (
          <>
            {/* Free PLAN ACTIVE */}
            <SelectPlan />
          </>
        ) : (
          <>
            {/* <p>{user?.Active_Plan} PLAN ACTIVE</p> */}
            <SelectPlan />
          </>
        )
      ) : (
        <>
          {/* Free PLAN ACTIVE */}
          <div>
            <SelectPlan />
          </div>
        </>
      )}
    </div>
  );
}

export default PlanDetailPage