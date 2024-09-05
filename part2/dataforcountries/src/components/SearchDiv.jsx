const SearchDiv = ({ onChange, value, info }) => {
    return (
      <div>
        find country <br />
        <input type="text" value={value} onChange={onChange} />
        <p>{info}</p>
      </div>
    );
  };

  export default SearchDiv