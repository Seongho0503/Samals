import { useEffect } from "react";
import BirdList from "../components/registration/birds/birdList/BirdList.tsx";
import UserInfo from "../components/registration/user/UserInfo.tsx";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import { setHeaderClickSwitch } from "../redux/slice/UserInfoSlice";

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const UserPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeaderClickSwitch("mypage"));
    console.log("디스패치");
  }, []);

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
