import React from "react";
import "./CategoryForm.css";

export default function CategoryForm({ handleSubmit, value, setValue }) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
    setValue("");
  };

  return (
    <>
      <form className="form-container" onSubmit={handleFormSubmit}>
        <div>
          <input
            type="text"
            className="form-input"
            placeholder="Enter new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <button type="submit" className="form-submit">
          Submit
        </button>
      </form>
    </>
  );
}
