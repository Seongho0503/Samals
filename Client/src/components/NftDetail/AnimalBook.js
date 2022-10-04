import * as React from "react";
import "../../styles/NftDetail/AnimalBook.scss";
import { $, jQuery } from "jquery";
import dictionary from "../../assets/dictionary.png";
import Wobble from "react-reveal/Wobble";
import { getDescription } from "../../api.js";
import { useState, useEffect } from "react";
import styled from "styled-components";
import BookImage from "./BookImage.js";

// const BookImage = styled.div`
//   $images: url("https://cdn.newspenguin.com/news/photo/202110/5634_19658_3146.jpg");
//   background-image: nth($images, ($i + 1));
// `;
//   $images: url("https://cdn.newspenguin.com/news/photo/202110/5634_19658_3146.jpg"),
//     url("https://cdn.newspenguin.com/news/photo/202110/5634_19658_3146.jpg"),
//     url("https://image.ytn.co.kr/general/jpg/2020/0706/202007061415011609_d.jpg"),
//     url("https://cdn.newspenguin.com/news/photo/202110/5634_19658_3146.jpg"),
//     url("https://w.namu.la/s/77d598cc999a66a027ff8605ae171e53f12d6efd4976b0085d07db67019bdf6b5fd653704c6ff26d30d237f1b1ff7d7929b5f097a03cad8544c2dc7339f91374bc04430aedcd5f157195554fd8d641ff864823370635abd70c021a5dfdbbb784"),
//     url("http://newsteacher.chosun.com/site/data/img_dir/2017/11/08/2017110800380_0.jpg"); //#1

// const AnimalBook = () => {
// class AnimalBook extends React.Component {
const AnimalBook = ({ animal }) => {
  const [animals, setAnimals] = useState([]);
  const [imgs, setImgs] = useState([]);
  useEffect(() => {
    getDescription(animal).then(({ data }) => {
      // console.log("사전: ", data);
      setAnimals(data);
      // console.log(data.img1);
      // console.log(data.img2);
      setImgs([data.img1, data.img2]);
      // console.log(data.img1);
      // console.log(data.img1);
      // console.log(data.img1);
      // console.log(data.img1);
    });
  }, []);
  // console.log(imgs, "imgs");
  // render() {
  return (
    <div>
      <div className='imgLoader'></div>
      <Wobble>
        <img className='subTitle' src={dictionary} />
      </Wobble>
      <div className='book'>
        <div className='gap'></div>
        <div className='pages'>
          <div className='page'></div>
          <div className='page'></div>
          <div className='page'></div>
          <div className='page'></div>
          <div className='page'></div>
          <div className='page'></div>
        </div>
        <div className='flips'>
          <div className='flip flip1'>
            <div className='flip flip2'>
              <div className='flip flip3'>
                <div className='flip flip4'>
                  <div className='flip flip5'>
                    <div className='flip flip6'>
                      <div className='flip flip7'></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalBook;
