// src/App.jsx
import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [bucket1, setBucket1] = useState(["Item 1", "Item 2", "Item 3", "Item 5"]);
  const [bucket2, setBucket2] = useState(["Item 4", "Item 6"]);
  const [selectedBucket1, setSelectedBucket1] = useState([]);
  const [selectedBucket2, setSelectedBucket2] = useState([]);

  const handleSelect = (bucket, item) => {
    if (bucket === "bucket1") {
      setSelectedBucket1((prev) =>
        prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
      );
    } else {
      setSelectedBucket2((prev) =>
        prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
      );
    }
  };

  const addItems = () => {
    setBucket2((prev) => [...prev, ...selectedBucket1]);
    setBucket1((prev) => prev.filter((item) => !selectedBucket1.includes(item)));
    setSelectedBucket1([]);
  };

  const removeItems = () => {
    setBucket1((prev) => [...prev, ...selectedBucket2]);
    setBucket2((prev) => prev.filter((item) => !selectedBucket2.includes(item)));
    setSelectedBucket2([]);
  };

  const addAll = () => {
    setBucket2((prev) => [...prev, ...bucket1]);
    setBucket1([]);
    setSelectedBucket1([]);
  };

  const removeAll = () => {
    setBucket1((prev) => [...prev, ...bucket2]);
    setBucket2([]);
    setSelectedBucket2([]);
  };

  const renderItems = (items, bucket) => {
    return items.map((item) => (
      <div
        key={item}
        className={`item ${bucket === "bucket1" ? (selectedBucket1.includes(item) ? "selected" : "") : (selectedBucket2.includes(item) ? "selected" : "")}`}
        onClick={() => handleSelect(bucket, item)}
      >
        {item}
      </div>
    ));
  };

  return (
    <div className="container">
      <div className="bucket">
        <h3>Bucket 1</h3>
        {renderItems(bucket1, "bucket1")}
      </div>
      <div className="buttons">
        <button onClick={addItems}>Add</button>
        <button onClick={removeItems}>Remove</button>
        <button onClick={addAll}>Add All</button>
        <button onClick={removeAll}>Remove All</button>
      </div>
      <div className="bucket">
        <h3>Bucket 2</h3>
        {renderItems(bucket2, "bucket2")}
      </div>
    </div>
  );
};

export default App;
