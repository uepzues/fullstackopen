const ShowCountry = ({ result }) => {
  const countries = Array.isArray(result) ? result : [result];

  const country = countries[0] || null;

  return (
    <div className="countryResult">
      <h1>{country?.name.common || null}</h1>
      <h2>{country?.region || null}</h2>
      <div>
        {country?.altSpellings
          ? country?.altSpellings.map((s) => <span key={s}>{s}, </span>)
          : null}
      </div>
      <h2> {country?.capital || ""}</h2>
      <div className="flag">
        {country?.flags?.png ? (
          <img src={country?.flags.png} alt={country?.flags.alt || ""} />
        ) : null}
      </div>
      <div>
        {country && <h3>Languages</h3>}
        <ul>
          {country?.languages
            ? Object.values(country?.languages).map((l) => <li key={l}>{l}</li>)
            : null}
        </ul>
      </div>
    </div>
  );
};

export default ShowCountry;
