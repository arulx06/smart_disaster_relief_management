import React from "react";
import "./FilterDropdown.css";

const FilterDropdown = ({ filters, onFilter }) => {
  const handleChange = (event, key) => {
    const value = event.target.value;

    onFilter((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      if (value === "") {
        // If value is empty, remove the filter
        delete updatedFilters[key];
      } else {
        // Otherwise, set the filter
        updatedFilters[key] = value;
      }

      return updatedFilters;
    });
  };

  return (
    <div className="filter-dropdown">
      {filters.map((filter) => (
        <select
          key={filter.key}
          onChange={(event) => handleChange(event, filter.key)}
        >
          <option value="">Select {filter.label}</option>
          {filter.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
};

export default FilterDropdown;
