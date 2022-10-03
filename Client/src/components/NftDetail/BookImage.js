import "../../styles/NftDetail/AnimalBook.scss";
const BookImage = ({ animal }) => {
  return (
    <div className='container'>
      {/* <h1 className="title">멸종 위기 동물 도감</h1> */}

      {/* <div className="credit">
                    {/* * Images loaded randomly from Picsum.photos }
                    </div> */}

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
export default BookImage;
