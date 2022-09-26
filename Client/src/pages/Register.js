import Header from "../components/Header";
import React, { useEffect, useRef, useState } from "react";

// reactstrap components
import { Card, CardHeader, CardBody } from "reactstrap";
import fileImg from "../assets/create-insert-file.jpg";
// import { minting, getContract } from "../models/create/erc721/index.js";
// import { getMetaMask, getKaikas } from "../models/getWallet";
// import "../styles/custermized.css";
import "../styles/Register.css";
// core components
import PanelHeader from "../components/PanelHeader.js";
// import ipfs from "../controllers/ipfs";
import axios from "axios";

const Register = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [chain, setChain] = useState("");
  // const [collection, setCollection] = useState("");
  const blockChainList = ["Ethereum", "Klaytn"];
  const ethereumTypeList = ["ERC-721", "ERC-1155"];
  const klaytnTypeList = ["KIP-17"];

  const fileUploader = useRef(null);

  const handleClick = (e) => {
    fileUploader.current.click();
  };
  const handleChange = (e) => {
    const maxSize = 100 * 1024 * 1024;

    if (e.target.files[0].size > maxSize) {
      alert("첨부파일 사이즈는 100MB 이내로 등록 가능합니다.");
    } else {
      //add file handler
      //console.log(e.target.files[0]);
      setFile(e.target.files[0]);
    }
  };

  const checkElement = () => {
    if (name && file && type && chain) {
      return true;
    }
    return false;
  };

  const onClickBtn = async (e) => {
    e.preventDefault();
    if (checkElement()) {
      //minting.
      // const account = await getMetaMask();
      // const nftContract = getContract();
      // 내가 const newNftTokenURI = await minting(account, nftContract);
      //console.log(newNftTokenURI.split("erc721/")[1]);
      // if (newNftTokenURI) {
      //   try {
      //     let reader = new window.FileReader();
      //     reader.readAsArrayBuffer(file);
      //     reader.onloadend = () => {
      //       const buffer = Buffer.from(reader.result);
      //       ipfs.add(buffer, (err, ipfsHash) => {
      //         try {
      //           axios // ipfs 이부분 수정! 서버로 통신
      //             .post("https://mttm1.herokuapp.com/create", {
      //               name: name,
      //               external_url: link,
      //               description: description,
      //               chain: chain,
      //               type: type,
      //               imgURI: `https://ipfs.io/ipfs/${ipfsHash[0].hash}`,
      //               sale: "false",
      //               price: "1",
      //               account: account,
      //               tokenId: newNftTokenURI.split("erc721/")[1],
      //             })
      //             .then((res) => {
      //               //console.log(res);
      //               alert("성공적으로 발행되었습니다.");
      //               setFile(null);
      //               setName("");
      //               setLink("");
      //               setDescription("");
      //               setType("");
      //               setChain("");
      //             })
      //             .catch((err) => {
      //               console.log(err);
      //             });
      //         } catch (error) {
      //           return console.log(error);
      //         }
      //       });
      //     };
      //   } catch (error) {
      //     return console.log(error);
      //   }
      // }
      /*
        1. ipfs에 이미지 파일 등록
        2.heroku요청을 tokenURI로 nft입력정보 db에 넣음
        
      */
    } else {
      alert("필수항목을 모두 채워주세요.");
    }
  };
  return (
    <>
      {/* <div className="register" /> */}
      {/* <body className="createnft" /> */}
      <Header></Header>
      <PanelHeader size="sm" />
      <div className="nft-content">
        <Card>
          <CardHeader>
            <h5 className="title">Create New Item</h5>
            <div>
              Image, Video, Audio, or 3D Model<sup className="sup-red">*</sup>
            </div>
          </CardHeader>
          <CardBody>
            <div className="item-data-form">
              File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV,
              OGG, GLB, GLTF. Max size: 100 MB
            </div>
            <div className="input-box">
              <div className="input-box-file" onClick={handleClick}>
                <img
                  src={file ? URL.createObjectURL(file) : fileImg}
                  alt="no img"
                  className={
                    file ? "input-box-file-img-change" : "input-box-file-img"
                  }
                />
                <input
                  type="file"
                  ref={fileUploader}
                  onChange={handleChange}
                  accept="image/*, audio/*, video/*"
                  style={{ display: "none" }}
                />
              </div>
            </div>
            <div className="item-element">
              <div className="element-label">
                Name<sup className="sup-red">*</sup>
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="element-input"
              />
            </div>

            <div className="item-element">
              <div className="element-label">External Link</div>
              <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="element-input"
              />
            </div>

            <div className="item-element">
              <div className="element-label">Description</div>
              <textarea
                className="element-input element-textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="item-element">
              <div className="element-label">
                Block chain<sup className="sup-red">*</sup>
              </div>
              <select
                name="blockchain"
                value={chain}
                onChange={(e) => setChain(e.target.value)}
                className="element-input"
              >
                <option value=""> </option>
                {blockChainList.map((el, index) => {
                  return (
                    <option key={index} value={el}>
                      {el}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="item-element">
              <div className="element-label">
                Type<sup className="sup-red">*</sup>
              </div>
              <select
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="element-input"
              >
                <option value=""> </option>
                {chain === "" ? (
                  <option value=""> </option>
                ) : chain === "Ethereum" ? (
                  ethereumTypeList.map((el, index) => {
                    return (
                      <option key={index} value={el}>
                        {el}
                      </option>
                    );
                  })
                ) : (
                  klaytnTypeList.map((el, index) => {
                    return (
                      <option key={index} value={el}>
                        {el}
                      </option>
                    );
                  })
                )}
              </select>
            </div>
            {/*
                <div className="item-element">
              <div className="element-label">Collection<sup className="sup-red">*</sup></div>
              <select name="collection" value={collection} onChange={(e) => setCollection(e.target.value)} className="element-input" >
                <option value=""></option>
                <option value="testSet">testSet</option>
              </select>
            </div>
                */}

            <div className="item-element">
              <input
                type="button"
                value="create"
                className="element-btn"
                onClick={onClickBtn}
              />
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Register;
