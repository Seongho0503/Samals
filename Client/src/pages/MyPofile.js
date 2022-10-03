import "../styles/MyPage.scss";
import UserProfile from "../assets/userprofile.png";
//import { donate } from "../utils/event";

const MyPofile = (props) => {
  return (
    <div>
      <div class='my-wrapper'>
        <div class='profile-card js-profile-card'>
          <div class='profile-card__img'>
            <img src={UserProfile} alt='profile card' />
          </div>

          <div class='profile-card__cnt js-profile-cnt'>
            <div class='profile-card__subtitle'>닉네임</div>
            <div class='profile-card__name'>{props.userNickname}</div>
            <div class='profile-card__subtitle'>지갑 번호</div>
            <div class='profile-card__name'>{props.address}</div>
            <div class='profile-card__subtitle'>가입 날짜</div>
            <div class='profile-card__name'>{props.createdTime}</div>

            {/* <div class="profile-card__txt">
              Front-end Developer from <strong>Mesopotamia</strong>
            </div> */}
            <div class='profile-card-loc'>
              <span class='profile-card-loc__icon'>
                <svg class='icon'>
                  <use xlinkhref='#icon-location'></use>
                </svg>
              </span>

              {/* <span class="profile-card-loc__txt">Istanbul, Turkey</span> */}
            </div>

            <div class='profile-card-inf'>
              <div class='profile-card-inf__item'>
                <div class='profile-card-inf__title'>{props.nftCount}</div>
                <div class='profile-card-inf__txt'>보유 NFT 수</div>
              </div>

              <div class='profile-card-inf__item'>
                <div class='profile-card-inf__title'>{props.likeCount}</div>
                <div class='profile-card-inf__txt'>찜한 목록</div>
              </div>

              <div class='profile-card-inf__item'>
                <div class='profile-card-inf__title'>{props.donate}</div>
                <div class='profile-card-inf__txt'>총 기부 금액(W)</div>
              </div>

              {/* <div class="profile-card-inf__item">
                <div class="profile-card-inf__title">85</div>
                <div class="profile-card-inf__txt">Works</div>
              </div> */}
            </div>

            {/* <div class="profile-card-social">
              <a
                href="https://www.facebook.com/iaMuhammedErdem"
                class="profile-card-social__item facebook"
                target="_blank"
              >
                <span class="icon-font">
                  <svg class="icon">
                    <use xlinkhref="#icon-facebook"></use>
                  </svg>
                </span>
              </a>

              <a
                href="https://twitter.com/iaMuhammedErdem"
                class="profile-card-social__item twitter"
                target="_blank"
              >
                <span class="icon-font">
                  <svg class="icon">
                    <use xlinkhref="#icon-twitter"></use>
                  </svg>
                </span>
              </a>

              <a
                href="https://www.instagram.com/iamuhammederdem"
                class="profile-card-social__item instagram"
                target="_blank"
              >
                <span class="icon-font">
                  <svg class="icon">
                    <use xlinkhref="#icon-instagram"></use>
                  </svg>
                </span>
              </a>

              <a
                href="https://www.behance.net/iaMuhammedErdem"
                class="profile-card-social__item behance"
                target="_blank"
              >
                <span class="icon-font">
                  <svg class="icon">
                    <use xlinkhref="#icon-behance"></use>
                  </svg>
                </span>
              </a>

              <a
                href="https://github.com/muhammederdem"
                class="profile-card-social__item github"
                target="_blank"
              >
                <span class="icon-font">
                  <svg class="icon">
                    <use xlinkhref="#icon-github"></use>
                  </svg>
                </span>
              </a>

              <a
                href="https://codepen.io/JavaScriptJunkie"
                class="profile-card-social__item codepen"
                target="_blank"
              >
                <span class="icon-font">
                  <svg class="icon">
                    <use xlinkhref="#icon-codepen"></use>
                  </svg>
                </span>
              </a>

              <a
                href="http://muhammederdem.com.tr/"
                class="profile-card-social__item link"
                target="_blank"
              >
                <span class="icon-font">
                  <svg class="icon">
                    <use xlinkhref="#icon-link"></use>
                  </svg>
                </span>
              </a>
            </div> */}

            <div class='profile-card-ctr'>
              <button class='profile-card__button button--blue js-message-btn'>Message</button>
              <button class='profile-card__button button--orange'>Follow</button>
            </div>
          </div>

          <div class='profile-card-message js-message'>
            <form class='profile-card-form'>
              <div class='profile-card-form__container'>
                <textarea placeholder='Say something...'></textarea>
              </div>

              <div class='profile-card-form__bottom'>
                <button class='profile-card__button button--blue js-message-close'>Send</button>

                <button class='profile-card__button button--gray js-message-close'>Cancel</button>
              </div>
            </form>

            <div class='profile-card__overlay js-message-close'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPofile;
