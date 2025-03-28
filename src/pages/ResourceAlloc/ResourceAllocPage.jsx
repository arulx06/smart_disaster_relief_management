import React, { useState, useEffect } from "react";
import { fetchResourceAllocations } from "../../services/apiService";
import ResourceAllocTable from "../../components/ResourceAllocTable";
import SearchBar from "../../components/SearchBar";
import FilterDropdown from "../../components/FilterDropdown";
import "./ResourceAllocPage.css";
import { CgFlag } from "react-icons/cg";

const ResourceAllocPage = ({ userRole }) => {
    
  const [allocations, setAllocations] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({});
  const [filters, setFilters] = useState([]);

  const fetchData = async () => {
    const data = await fetchResourceAllocations(search, filter);
    setAllocations(data);

    if (filters.length === 0) {
      const uniqueTeamIds = [...new Set(data.map(allocation => allocation.team_id))];
      setFilters([
        {
          key: "team_id",
          label: "Team ID",
          options: uniqueTeamIds,
        },
      ]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, filter]);

  return (
    <div>
      <br /><br /><br />
      <SearchBar onSearch={setSearch} placeholder_value={'Search Details with Allocation ID'}/>
      <FilterDropdown
        filters={filters}
        onFilter={(newFilter) => setFilter(newFilter)}
      />
      <div className="table-container">
        <ResourceAllocTable 
          resourceAllocations={allocations} 
          refreshAllocations={fetchData} 
          userRole={userRole} 
        />
      </div>
    </div>
  );
};

export default ResourceAllocPage;
