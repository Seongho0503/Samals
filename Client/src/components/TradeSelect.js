import "../styles/TradeSelect.css";
// import styles from "../styles/TradeSelect.module.css";

const TradeSelect = () => {
  function onClick() {
    console.log("Hi there, user!");
    window.location.replace("/create");
  }
  return (
    <div className='animal-container'>
      <button className='register' id='register' onClick={onClick}>
        NFT 등록
      </button>
      {/* <div className='animal-control-group'> */}
      {/* <h1>Price</h1> */}
      {/* <label className="control control--checkbox">
          First checkbox
          <input type="checkbox" checked="checked" />
          <div className="control__indicator"></div>
        </label> */}
      {/* <label className='control control--checkbox'>
          최저가순
          <input type='checkbox' />
          <div className='control__indicator'></div>
        </label>
        <label className='control control--checkbox'>
          최고가순
          <input type='checkbox' />
          <div className='control__indicator'></div>
        </label> */}
      {/* <label className="control control--checkbox">
          Disabled
          <input type="checkbox" disabled="disabled" />
          <div className="control__indicator"></div>
        </label>
        <label className="control control--checkbox">
          Disabled & checked
          <input type="checkbox" disabled="disabled" checked="checked" />
          <div className="control__indicator"></div>
        </label> */}
      {/* </div> */}
      <div className='animal-control-group'>
        <h1>PRICE</h1>

        <label className='control control--radio'>
          최저가순
          <input type='radio' name='radio' checked='checked' />
          <div className='control__indicator'></div>
        </label>
        <label className='control control--radio'>
          최고가순
          <input type='radio' name='radio' />
          <div className='control__indicator'></div>
        </label>
        {/* <label className="control control--radio">
          Disabled
          <input type="radio" name="radio2" disabled="disabled" />
          <div className="control__indicator"></div>
        </label>
        <label className="control control--radio">
          Disabled & checked
          <input
            type="radio"
            name="radio2"
            disabled="disabled"
            checked="checked"
          />
          <div className="control__indicator"></div>
        </label> */}
        {/* </div>
      <div className='animal-control-group'>
        <h1>아이템</h1>
        <div className='select'>
          <select>
            <option>산타모</option>
            <option>캡</option>
            <option>밀집모자</option>
          </select>
          <div className='select__arrow'></div>
        </div> */}
        {/* <div className="select">
          <select>
            <option>Second select</option>
            <option>Option</option>
            <option>Option</option>
          </select>
          <div className="select__arrow"></div>
        </div>
        <div className="select">
          <select disabled="disabled">
            <option>Disabled</option>
            <option>Option</option>
            <option>Option</option>
          </select>
          <div className="select__arrow"></div> */}
      </div>
      {/* </div> */}
    </div>
  );
};

export default TradeSelect;
