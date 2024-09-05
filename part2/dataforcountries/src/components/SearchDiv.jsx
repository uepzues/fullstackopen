const SearchDiv = ({ onChange, value, info }) => {
    return (
      <div className="searchDiv">
        <p>find country</p>
        <input type="text" value={value} onChange={onChange} />
        <p>{info}</p>
      </div>
    );
  };

  export default SearchDiv