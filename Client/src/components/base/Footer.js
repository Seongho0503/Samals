import React, { Component } from "react";

class Footer extends Component {
  scrollToTop = (event) => {
    document.getElementById("root").scrollTo(0, 0);
  };

  render() {
    return (
      <div>
        <div className="top">
          <a onClick={this.scrollToTop}>위로가기</a>
        </div>
      </div>
    );
  }
}

export default Footer;
