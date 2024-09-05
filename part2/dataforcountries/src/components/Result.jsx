import ShowCountry from "./ShowCountry";

const Result = ({ result, showCountry, location, search }) => {
  const resultModule = (
    <div className="result">
      {showCountry ? (
        <ShowCountry result={result} />
      ) : (
        <div className="resultMap">
          {result.map((c) => (
            <div key={c.cca2}>
              <p>{c.name.common}</p>
              <button onClick={() => location(c.capital[0], c.cca2)}>
                show
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return <div>{search !== "" ? resultModule : null}</div>;
};

export default Result;
