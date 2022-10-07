import { React, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { getDescription } from "../api.js";
import { useState } from "react";

const AnimalDetail = ({ animalDetail }) => {
  //prop을 정상적으로 받았는지 확인
  //prop을 부모 컴포넌트로부터 받음
  //console.log(animalDetail);
  const [detail, setDetail] = useState();
  const response = getDescription().then(({ res }) => {
    console.log("getDescription res: ", res);
    // const { elephant } = res.query;
    setDetail(res.data.animalNameKr);
  });
  console.log("response: ", response);

  useEffect(() => {
    response.then((res) => {
      console.log("res: ", res);
    });
  });

  response();
  return (
    <div className='AnimalDetail'>
      <h2>멸종위기동물 세부정보</h2>
      {/* <h4>{animalDetail.length} 개수 필요 없지 않나 개수 생략</h4> */}
      <div>
        {animalDetail.map((it) => (
          <div key={it.id}>
            <div> 개체명 : {it.nameKo} </div>
            <div> 멸종 위기 등급 : {it.gradeEn} </div>
            <div> 멸종 위기 급수: {it.gradeNo} </div>
            <div> 남은 개체수 : {it.count} </div>
            <div> 설명 : {it.detail} </div>
          </div>
        ))}
      </div>

      <Stack spacing={1}>
        {/* For variant="text", adjust the height via font-size */}
        <Skeleton variant='text' sx={{ fontSize: "1rem" }} />

        {/* For other variants, adjust the size with `width` and `height` */}
        <Skeleton variant='circular' width={40} height={40} />
        <Skeleton variant='rectangular' width={210} height={60} />
        <Skeleton variant='rounded' width={210} height={60} />
      </Stack>
    </div>
  );
};

// prop가 undefined로 내려왔을 때(전달 받았을 때) props의 기본 값을 설정 가능
AnimalDetail.defaultProps = {
  animalDetail: [],
};

export default AnimalDetail;
