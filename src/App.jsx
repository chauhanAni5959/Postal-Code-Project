import { useState } from "react";
import "./App.css";
import PincodeForm from "./components/PincodeForm.jsx";
import ResultPanel from "./components/ResultPanel.jsx";

const API_BASE = "https://api.postalpincode.in/pincode/"; 

function App() {
  const [pincode, setPincode] = useState("");
  const [data, setData] = useState(null);             
  const [postOffices, setPostOffices] = useState([]); 
  const [filterText, setFilterText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLookup = async () => {
    if (!/^\d{6}$/.test(pincode)) {
      setError("Pincode must be a 6-digit number.");
      setData(null);
      setPostOffices([]);
      return;
    }

    setError("");
    setLoading(true);
    setFilterText("");
    setData(null);
    setPostOffices([]);

    try {
      const res = await fetch(API_BASE + pincode);
      if (!res.ok) throw new Error("Network error, please try again.");

      const json = await res.json(); 
      const result = json[0];

      if (!result || result.Status !== "Success" || !result.PostOffice) {
        setError(result?.Message || "No data found for this pincode.");
        setData(null);
        setPostOffices([]);
      } else {
        setData(result);
        setPostOffices(result.PostOffice);
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (value) => {
    setFilterText(value);
    if (!data || !data.PostOffice) return;

    const filtered = data.PostOffice.filter((po) =>
      po.Name.toLowerCase().includes(value.toLowerCase())
    );

    if (filtered.length === 0 && value.trim() !== "") {
      setError("Couldn’t find the postal data you’re looking for…");
    } else {
      setError("");
    }

    setPostOffices(filtered);
  };

  return (
    <div className="app">
      <div className="left-pane">
        <PincodeForm
          pincode={pincode}
          setPincode={setPincode}
          onLookup={handleLookup}
          error={!data ? error : ""}
        />
      </div>

      <div className="right-pane">
        <ResultPanel
          pincode={pincode}
          data={data}
          postOffices={postOffices}
          filterText={filterText}
          onFilterChange={handleFilterChange}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}

export default App;
