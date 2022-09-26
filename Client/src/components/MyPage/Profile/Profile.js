import styled from "styled-components";
//import UserProfile from "../../assets/userprofile.png";
import UserProfile from "./userprofile.png";

const StyledImg = styled.img`
  width: 170px;
  height: 170px;
  margin-bottom: 30px;
`;

function Profile() {
  return <StyledImg src={UserProfile} alt="유저" />;
}

export default Profile;
