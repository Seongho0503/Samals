import React, { useState, useEffect } from "react";
import "../../styles/MainTeam.css";
import title from "../../assets/our-team.png";
import { useNavigate } from "react-router-dom";
import profile1 from "../../assets/profile-1.png";
import profile2 from "../../assets/profile-2.png";
import profile3 from "../../assets/profile-3.png";
import profile4 from "../../assets/profile-4.png";
import profile5 from "../../assets/profile-5.png";
import profile6 from "../../assets/profile-6.png";
import Header from "../Header";

const MainTeam = () => {
  return (
    <div id="hero2">
      <img width="500px" src={title} />

      <div className="container">
        <div className="at-grid" data-column="3">
          <div className="at-column">
            <div className="at-user">
              <div className="at-user__avatar">
                <img src={profile1} />
              </div>
              <div className="at-user__name">Kwon Sungho</div>
              <div className="at-user__title">Front-End</div>
            </div>
          </div>
          <div className="at-column">
            <div className="at-user">
              <div className="at-user__avatar">
                <img src={profile2} />
              </div>
              <div className="at-user__name">Kim Chaeri</div>
              <div className="at-user__title">Front-End</div>
            </div>
          </div>
          <div className="at-column">
            <div className="at-user">
              <div className="at-user__avatar">
                <img src={profile3} />
              </div>
              <div className="at-user__name">Han Yubin</div>
              <div className="at-user__title">Unity</div>
            </div>
          </div>
          <div className="at-column">
            <div className="at-user">
              <div className="at-user__avatar">
                <img src={profile4} />
              </div>
              <div className="at-user__name">Yang Joseph</div>
              <div className="at-user__title">Back-End</div>
            </div>
          </div>
          <div className="at-column">
            <div className="at-user">
              <div className="at-user__avatar">
                <img src={profile5} />
              </div>
              <div className="at-user__name">Lee Jaehwan</div>
              <div className="at-user__title">Back-End</div>
            </div>
          </div>
          <div className="at-column">
            <div className="at-user">
              <div className="at-user__avatar">
                <img src={profile6} />
              </div>
              <div className="at-user__name">Lee Chung</div>
              <div className="at-user__title">Back-End</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainTeam;
