export default function SearchFilter({ onChange }) {
  return (
    <div className="searchFilter">
      search<input onChange={onChange} />
    </div>
  );
}
