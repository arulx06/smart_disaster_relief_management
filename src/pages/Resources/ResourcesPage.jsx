import React, { useState, useEffect } from "react";
import { fetchResources } from "../../services/apiService";
import ResourceTable from "../../components/ResourceTable";
import SearchBar from "../../components/SearchBar";
import FilterDropdown from "../../components/FilterDropdown";
import "./ResourcesPage.css";

const ResourcesPage = ({ userRole }) => { // Receive userRole as a prop
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({});
  const [filters] = useState([
    {
      key: "disaster_id",
      label: "Disaster ID",
      options: ["1", "2", "3", "4", "5"], // Example disaster IDs
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchResources(search, filter);
      setResources(data);
    };

    fetchData();
  }, [search, filter]);

  return ( 
    <div>
      <br /><br /><br />
      <SearchBar onSearch={setSearch} placeholder_value={'Search Details with Resource ID'}/>
      <FilterDropdown
        filters={filters}
        onFilter={(newFilter) => setFilter(newFilter)}
      />
      <div className="table-container">
        <ResourceTable resources={resources} userRole={userRole} /> {/* Pass userRole to ResourceTable */}
      </div>
    </div>
  );
};

export default ResourcesPage;
