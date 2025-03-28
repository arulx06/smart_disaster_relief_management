import React, { useState, useEffect } from "react";
import { fetchReliefTeams } from "../../services/apiService";
import ReliefTeamTable from "../../components/ReliefTeamTable";
import SearchBar from "../../components/SearchBar";
import FilterDropdown from "../../components/FilterDropdown";
import "./ReliefTeamsPage.css";

const ReliefTeamsPage = ({ userRole }) => {
  const [teams, setReliefTeams] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({});
  const [filters, setFilters] = useState([]);

  const fetchData = async () => {
    const data = await fetchReliefTeams(search, filter);
    setReliefTeams(data);

    if (filters.length === 0) {
      const uniqueDisasterIds = [...new Set(data.map(team => team.disaster_id))];
      setFilters([
        {
          key: "disaster_id",
          label: "Disaster ID",
          options: uniqueDisasterIds,
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
      <SearchBar onSearch={setSearch} placeholder_value={'Search Details with Team ID'}/>
      <FilterDropdown
        filters={filters}
        onFilter={(newFilter) => setFilter(newFilter)}
      />
      <div className="table-container">
        <ReliefTeamTable reliefTeams={teams} refreshReliefTeams={fetchData} userRole={userRole}/>
      </div>
    </div>
  );
};

export default ReliefTeamsPage;