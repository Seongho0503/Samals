import "../styles/MyPage.css";
import UserProfile from "../assets/userprofile.png";
import Tiger from "../assets/card/Tiger.png";
import Toad from "../assets/card/Toad.png";
import Shark from "../assets/card/Shark.png";
import Elephant from "../assets/card/Elephant.png";
import Toco from "../assets/card/Toco.png";
import ProfileEdit from "../components/MyPage/ProfileEdit";

const MyPage = () => {
  return (
    <div>
      <main>
        {/* <div id="device-bar-1">
          <button></button>
          <button></button>
          <button></button>
        </div> */}

        <div id="profile-upper">
          <div id="profile-banner-image">
            <img
              //   src="https://imagizer.imageshack.com/img921/9628/VIaL8H.jpg"
              alt="Banner image"
            />
          </div>
          <div id="profile-d">
            <div id="profile-pic">
              <img id="person" src={UserProfile} />
            </div>
            <div id="u-name">UnKnown</div>

            {/* <div className="tb" id="m-btns">
              <div className="td">
                <div className="m-btn">
                  <i className="material-icons">format_list_bulleted</i>
                  <span>Activity log</span>
                </div>
              </div>
              <div className="td">
                <div className="m-btn">
                  <i className="material-icons">lock</i>
                  <span>Privacy</span>
                </div>
              </div>
            </div> */}
            {/* <div id="edit-profile">
              <i className="material-icons">camera_alt</i>
            </div> */}
          </div>
          <div id="black-grd"></div>
        </div>
        <div id="main-content">
          <div className="tb">
            <div className="td" id="l-col">
              {/* <div className="l-cnt">
                    <div className="cnt-label">
                    <i className="l-i" id="l-i-i"></i>
                    <span>Intro</span>
                    <div className="lb-action">
                        <i className="material-icons">edit</i>
                    </div>
                     </div>
                <div id="i-box">
                  <div id="intro-line">Front-end Engineer</div>
                  <div id="u-occ">I love making applications with Angular.</div>
                  <div id="u-loc">
                    <i className="material-icons">location_on</i>
                    <a href="#">Bengaluru</a>, <a href="#">India</a>
                  </div>
                </div>
              </div> */}
              <div className="l-cnt l-mrg">
                <div className="cnt-label">
                  <i className="l-i" id="l-i-k"></i>
                  <span>멸종위기 동물들은 내가 지킨다</span>
                </div>
                <div>
                  <div className="q-ad-c">
                    <a href="#" className="q-ad">
                      {/* <img src="https://imagizer.imageshack.comm/img923/1849/4TnLy1.png" /> */}
                      {/* <span>프로필 수정</span> */}
                      <ProfileEdit></ProfileEdit>
                    </a>
                  </div>
                  {/* <div className="q-ad-c">
                    <a href="#" className="q-ad" id="add_q">
                      <i className="material-icons">add</i>
                      <span>Add Answer</span>
                    </a>
                  </div> */}
                </div>
              </div>
              {/* 왼쪽 사이드 이미지모음 레이아웃 */}
              <div className="l-cnt l-mrg">
                <div className="cnt-label">
                  <i className="l-i" id="l-i-p"></i>
                  <span>보유 뱃지</span>
                </div>
                <div id="photos">
                  <div className="tb">
                    <div className="tr">
                      <div className="td"></div>
                      <div className="td"></div>
                      <div className="td"></div>
                    </div>
                    {/* <div className="tr">
                      <div className="td"></div>
                      <div className="td"></div>
                      <div className="td"></div>
                    </div> */}
                    {/* <div className="tr">
                      <div className="td"></div>
                      <div className="td"></div>
                      <div className="td"></div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="td" id="m-col">
              <div className="m-mrg" id="p-tabs">
                <div className="tb">
                  <div className="td">
                    <div className="tb" id="p-tabs-m">
                      <div className="td active">
                        <i className="material-icons">보유 NFT</i>
                        {/* <span>TIMELINE</span> */}
                      </div>
                      <div className="td">
                        <i className="material-icons">찜한 NFT</i>
                        {/* <span>FRIENDS</span> */}
                      </div>
                      <div className="td">
                        <i className="material-icons">기부 내역</i>
                        {/* <span>PHOTOS</span> */}
                      </div>
                      {/* <div className="td">
                        <i className="material-icons">explore</i>
                        <span>ABOUT</span>
                      </div>
                      <div className="td">
                        <i className="material-icons">archive</i>
                        <span>ARCHIVE</span>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="l-cnt l-mrg">
                  <div className="cnt-label">
                    <i className="l-i" id="l-i-p"></i>
                    <span>보유 NFT</span>
                  </div>
                  <div id="photos">
                    <div className="tb">
                      <div className="tr">
                        <div className="td">{/* <img className="td" src={Toco} /> */}</div>
                        <div className="td">{/* <img className="photo-aml" src={Toco} /> */}</div>
                        <div className="td"> {/* <img className="photo-aml" src={Toco} /> */}</div>
                      </div>
                      <div className="tr">
                        <div className="td"></div>
                        <div className="td"></div>
                        <div className="td"></div>
                      </div>
                      <div className="tr">
                        <div className="td"></div>
                        <div className="td"></div>
                        <div className="td"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="device-bar-2">
          <i className="fab fa-apple"></i>
        </div>
      </main>
    </div>
  );
};

export default MyPage;
