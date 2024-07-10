import React, { useState } from "react";
import "../../Styles/Footer.css";
import ContactUs from "../contactUs";
import { useNavigate } from "react-router-dom";

const Footer = ({ faqRef, scrollToRef, id }) => {
  const navigate = useNavigate();
  const [ContactusPopup, setContactusPopup] = useState(false);

  const handleConatctus = () => {
    setContactusPopup(true);
    console.log("hit------------");
  };

  console.log(ContactusPopup, "ContactusPopup----");

  //
  const handleTerm = () => {
    navigate("/TermsOfUse");
  };

  const handlePrivacy = () => {
    navigate("/PolicyPrivacy");
  };

  return (
    // <div className="Main_Footer_div">
    //   <div className="Footer_div_line border-b-[1px] pb-2 border-dotted border-slate-600 text-left "></div>
    //   <div className="Footer_header_div">
    //     {/* <div className="Footer_image_div"></div> */}
    //     <img
    //       src="https://ik.imagekit.io/xhdikl4j8/logo2_vfXiDTPTx.png"
    //       alt="Logo"
    //     />
    //     <h3 className="Footer_header_h3">BrainyLingo</h3>
    //   </div>
    //   <div className="Footer_link_div">
    //     <button
    //       className="Footer_link_div_button"
    //       smooth={true}
    //       duration={500}
    //       onClick={() => scrollToRef("faq")}
    //     >
    //       FAQ's
    //     </button>
    //     <button className="Footer_link_div_button">Contact us</button>
    //     <button className="Footer_link_div_button">Privacy Policy</button>
    //     <button className="Footer_link_div_button">Terms & Conditions</button>
    //   </div>
    // </div>
    <>
      <div className="Main_Footer_div">
        <div
          className="border-b-[1px] pb-2 border-dotted border-slate-600 text-left"
          style={{ height: "2px", width: "100%" }}
        ></div>
        <div className="Footer_header_div">
          {/* <div className="Footer_image_div"></div> */}
          <img
            src="https://ik.imagekit.io/xhdikl4j8/logo2_vfXiDTPTx.png"
            alt="Logo"
          />
          <h3 className="Footer_header_h3">BrainyLingo</h3>
        </div>
        <div className="Footer_link_div">
          <button
            className="Footer_link_div_button"
            smooth={true}
            duration={200}
            onClick={() => scrollToRef("faq")}
          >
            FAQ's
          </button>
          {/* <button className="Footer_link_div_button" onClick={handleConatctus}>
            Contact us
          </button> */}
          <ContactUs />
          <button className="Footer_link_div_button" onClick={handlePrivacy}>
            Privacy Policy
          </button>
          <button className="Footer_link_div_button" onClick={handleTerm}>
            Terms & Conditions
          </button>
        </div>
        {ContactusPopup && <ContactUs />}
      </div>
    </>
  );
};

export default Footer;
