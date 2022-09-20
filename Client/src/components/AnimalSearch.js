import "../styles/AnimalSearch.css";

const AnimalSearch = () => {
  return (
    <div>
      <div className="search">
        <h1>Search this site</h1>
        <h3>Click on search icon, 찾으시는 동물명을 검색해주세요.</h3>
        <div>
          <input type="text" placeholder="Search . . ." required />
        </div>
      </div>
    </div>
  );
};

export default AnimalSearch;
