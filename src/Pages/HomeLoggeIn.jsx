import React, { useRef } from "react";
import AboutUs from "../Components/Home/AboutUs";
import Brainylingo from "../Components/Home/Brainylingo";
import Faq from "../Components/Home/Faq";
import HowitWork from "../Components/Home/HowitWork";
import Learners from "../Components/Home/Learners";
import OurKey from "../Components/Home/OurKey";
import Revolutionize from "../Components/Home/Revolutionize";
import SelectPlan from "../Components/Home/Select-Plan";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Home/Footer";

function HomeLoggeIn({
  revolutionizeRef,
  brainylingoRef,
  howitWorkRef,
  aboutUsRef,
  learnersRef,
  selectPlanRef,
  faqRef,
  scrollToRef,
}) {
  const navigate = useNavigate();

  const scrollToRefLoggedIn = () => {
    navigate("/", { replace: true });
    setTimeout(() => {
      selectPlanRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  return (
    <div>
      <div ref={revolutionizeRef} id="revolutionize">
        <Revolutionize scrollToRef={scrollToRefLoggedIn} />
      </div>

      <div ref={brainylingoRef} id="brainylingo">
        <Brainylingo scrollToRef={scrollToRefLoggedIn} />
      </div>
      <div>
        <OurKey />
      </div>
      <div ref={howitWorkRef} id="howitWork">
        <HowitWork scrollToRef={scrollToRefLoggedIn} />
      </div>
      <div ref={aboutUsRef} id="aboutUs">
        <AboutUs />
      </div>
      <div ref={learnersRef} id="learners">
        <Learners />
      </div>
      <div ref={selectPlanRef} id="selectPlan">
        <SelectPlan />
      </div>
      <div ref={faqRef} id="faq">
        <Faq />
      </div>
      {/* <FloatingButton/> */}
      <div>
        <Footer scrollToRef={scrollToRef} ref={faqRef} />
      </div>
    </div>
    // <div>
    //   <Revolutionize />

    //   <Brainylingo />

    //   <OurKey />

    //   <HowitWork />

    //   <AboutUs />

    //   <Learners />

    //   <SelectPlan />

    //   <Faq />
    // </div>
  );
}

export default HomeLoggeIn;
