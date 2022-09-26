import styled from "styled-components";
import ProfileImage from "./Profile/Profile";
import Username from "./Profile/Username";
import Search from "./Profile/Search";
import Address from "./Profile/Address";

const StyledTop = styled.div`
  margin-left: 70px;
  margin-right: 70px;
  margin-top: 78px;
  background: #fff;
`;

function Top({ address, keyword, changeHandler }) {
  return (
    <StyledTop>
      <div className="background"></div>
      <ProfileImage />
      <Username>Unnamed</Username>
      <Address address={address} />
      <div>
        <Search value={keyword} changeHandler={changeHandler} />
      </div>
    </StyledTop>
  );
}

export default Top;
