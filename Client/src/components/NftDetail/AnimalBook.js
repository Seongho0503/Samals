import * as React from "react";
import "../../styles/NftDetail/AnimalBook.scss";
// import "../styles/Animal.scss";
import { $, jQuery } from "jquery";
import dictionary from "../../assets/dictionary.png";
import Wobble from "react-reveal/Wobble";

// const AnimalBook = () => {
class AnimalBook extends React.Component {
  render() {
    return (
      <div>
        {/* <div className="imgLoader"></div> */}
        <img className="subTitle" src={dictionary} />

        <div className="container">
          {/* <h1 className="title">멸종 위기 동물 도감</h1> */}

          {/* <div className="credit">
                    {/* * Images loaded randomly from Picsum.photos }
                    </div> */}

          <div className="book">
            <div className="gap"></div>
            <div className="pages">
              <div className="page"></div>
              <div className="page"></div>
              <div className="page"></div>
              <div className="page"></div>
              <div className="page"></div>
              <div className="page"></div>
            </div>
            <div className="flips">
              <div className="flip flip1">
                <div className="flip flip2">
                  <div className="flip flip3">
                    <div className="flip flip4">
                      <div className="flip flip5">
                        <div className="flip flip6">
                          <div className="flip flip7"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <a target="_top"></a> */}
      </div>
    );
  }
}
export default AnimalBook;
