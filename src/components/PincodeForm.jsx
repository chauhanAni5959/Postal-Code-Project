function PincodeForm({ pincode, setPincode, onLookup, error }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onLookup();
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <label className="label">Enter Pincode</label>
      <input
        type="text"
        placeholder="Pincode"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
        className="input"
      />
      <button type="submit" className="button">
        Lookup
      </button>
      {error && <p className="error-text">{error}</p>}
    </form>
  );
}

export default PincodeForm;
