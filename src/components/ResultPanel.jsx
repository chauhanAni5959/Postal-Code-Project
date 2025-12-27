import Loader from "./Loader.jsx";
import PostOfficeCard from "./PostOfficeCard.jsx";

function ResultPanel({
  pincode,
  data,
  postOffices,
  filterText,
  onFilterChange,
  loading,
  error,
}) {
  if (loading) {
    return (
      <div className="loader-wrapper">
        <Loader />
        <p>Loading...</p>
      </div>
    );
  }

  
  if (!data) return null;

  return (
    <>
      <div className="header-box">
        <p>
          <strong>Pincode:</strong> {pincode}
        </p>
        <p>
          <strong>Message:</strong> {data.Message}
        </p>
      </div>

      <div className="filter-row">
        <input
          type="text"
          placeholder="Filter"
          value={filterText}
          onChange={(e) => onFilterChange(e.target.value)}
          className="input"
        />
      </div>

      {error && postOffices.length === 0 ? (
        <p className="error-text">{error}</p>
      ) : (
        <div className="card-grid">
          {postOffices.map((po) => (
            <PostOfficeCard key={po.Name + po.Pincode} po={po} />
          ))}
        </div>
      )}
    </>
  );
}

export default ResultPanel;
