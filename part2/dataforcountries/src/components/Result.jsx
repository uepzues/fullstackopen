import ShowCountry from "./ShowCountry";

const Result = ({ result, showCountry, location }) => {
    return (
      <div className="result">
        {/* {console.log("result", result)} */}
        {showCountry ? (
          <ShowCountry result={result} />
        ) : (
          <div>
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
  };

  export default Result