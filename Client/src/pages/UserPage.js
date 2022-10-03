import BirdList from "../components/registration/birds/birdList/BirdList.tsx";
import UserInfo from "../components/registration/user/UserInfo.tsx";
import styled from "@emotion/styled";

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const UserPage = () => {
  return (
    <div>
      <PageContainer>
        <UserInfo />
        <BirdList />
      </PageContainer>
    </div>
  );
};

export default UserPage;
