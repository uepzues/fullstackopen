const SearchDiv = ({ onChange, value, info }) => {
  return (
    <div className="searchDiv">
      <h3>Search Country</h3>
      <input type="text" value={value} onChange={onChange} />
      {info && <p className="info">{info}</p>}
    </div>
  );
};

export default SearchDiv;
