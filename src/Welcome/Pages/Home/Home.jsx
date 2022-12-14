import React, { useEffect } from "react";
import "./Home.css";
import courseVideo from "../../../assets/images/course-video.mp4";
import course01Image from "../../../assets/images/courses-01.jpg";
import course02Image from "../../../assets/images/courses-02.jpg";
import course03Image from "../../../assets/images/courses-03.jpg";
import course04Image from "../../../assets/images/courses-04.jpg";
import course05Image from "../../../assets/images/courses-05.jpg";
import dayLogo from "../../../assets/images/logoday.png";

import { useDispatch, useSelector } from "react-redux";
import { gotoDashboard } from "../../../Redux/action";

function Home() {
  document.title = "Dev Tech Education || Home";

  // handle user
  const { signinSuccessData } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    // handle user already signed in
    if (signinSuccessData === null) dispatch(gotoDashboard());
  }, [dispatch, signinSuccessData]);

  return (
    <>
      <div className="homePage_backgroundvideo">
        <video autoPlay={true} muted={true} loop={true} id="bg-video">
          <source src={courseVideo} type="video/mp4" />
        </video>
        <div className="homePage_backgroundvideoText">
          <p>YOUR CLASSROOM</p>
        </div>
      </div>
      <div className="homePage_course">
        <div className="homePage_course_title">
          <span>Choose Course</span>
        </div>
        <div className="homePage_course_list">
          <div className="homePage_course_listItem">
            <div className="homePage_course_listItemImage">
              <img src={course01Image} alt="" />
            </div>
            <div className="homePage_course_listItemInfo">
              <h4>Photography</h4>
              <p>
                Quisque cursus augue ut velit dictum, quis volutpat enim
                blandit. Maecenas a lectus ac ipsum porta.
              </p>
            </div>
            <div className="homePage_course_listItemBtn">
              <button>Read More</button>
            </div>
          </div>
          <div className="homePage_course_listItem">
            <div className="homePage_course_listItemImage">
              <img src={course03Image} alt="" />
            </div>
            <div className="homePage_course_listItemInfo">
              <h4>Learn HTML CSS</h4>
              <p>
                You can get free images and videos for your websites by visiting
                Unsplash, Pixabay, and Pexels.
              </p>
            </div>
            <div className="homePage_course_listItemBtn">
              <button>Read More</button>
            </div>
          </div>
          <div className="homePage_course_listItem">
            <div className="homePage_course_listItemImage">
              <img src={course04Image} alt="" />
            </div>
            <div className="homePage_course_listItemInfo">
              <h4>Social Media</h4>
              <p>
                Pellentesque ultricies diam magna, auctor cursus lectus pretium
                nec. Maecenas finibus lobortis enim.
              </p>
            </div>
            <div className="homePage_course_listItemBtn">
              <button>Read More</button>
            </div>
          </div>
          <div className="homePage_course_listItem">
            <div className="homePage_course_listItemImage">
              <img src={course02Image} alt="" />
            </div>
            <div className="homePage_course_listItemInfo">
              <h4>Web Development</h4>
              <p>
                Pellentesque ultricies diam magna, auctor cursus lectus pretium
                nec. Maecenas finibus lobortis enim.
              </p>
            </div>
            <div className="homePage_course_listItemBtn">
              <button>Read More</button>
            </div>
          </div>
          <div className="homePage_course_listItem">
            <div className="homePage_course_listItemImage">
              <img src={course05Image} alt="" />
            </div>
            <div className="homePage_course_listItemInfo">
              <h4>Digital Arts</h4>
              <p>
                Quisque cursus augue ut velit dictum, quis volutpat enim
                blandit. Maecenas a lectus ac ipsum porta.
              </p>
            </div>
            <div className="homePage_course_listItemBtn">
              <button>Read More</button>
            </div>
          </div>
        </div>
      </div>

      <div className="homePage_welcome_background">
        <img src={dayLogo} alt="Dev Tech Education" />
      </div>
    </>
  );
}

export default Home;
