import styled from "styled-components";

const Icon = styled.img`
  width: 15px;
  height: 15px;
`;

function Profile({ address }) {
  return (
    <div>
      <Icon></Icon>
      <Icon src={"ethericon.png"} />
      {/* <span className="address">{address}</span> */}
    </div>
  );
}

export default Profile;
