import React, { useState, useEffect } from "react";
import { fetchDisasters } from "../../services/apiService";
import DisasterTable from "../../components/DisasterTable";
import SearchBar from "../../components/SearchBar";
import FilterDropdown from "../../components/FilterDropdown";
import DisasterMap from "../../components/DisasterMap";
import "./DisastersPage.css"; 
import { color } from "framer-motion";

const DisastersPage = ({ userRole }) => {
  const [disasters, setDisasters] = useState([]);

  const [filters] = useState([
    {
      key: "region",
      label: "Region",
      options: ["Europe", "Oceania", "Americas", "Africa", "Asia"],
    },
    {
      key: "iso",
      label: "ISO Country",
      options: [
        "AFG", "AGO", "AIA", "ALB", "ANT", "ARE", "ARG", "ARM", "ASM", "ATG", "AUS", "AUT", "AZE", "BDI", "BEL", "BEN", "BFA", "BGD", "BGR", "BHR", "BHS", "BIH", "BLM", "BLR", "BLZ", "BMU", "BOL", "BRA", "BRB", "BTN", "BWA", "CAF", "CAN", "CHE", "CHL", "CHN", "CIV", "CMR", "COD", "COG", "COK", "COL", "COM", "CPV", "CRI", "CUB", "CUW", "CYM", "CYP", "CZE", "DEU", "DJI", "DMA", "DNK", "DOM", "DZA", "ECU", "EGY", "ERI", "ESP", "EST", "ETH", "FIN", "FJI", "FRA", "FSM", "GAB", "GBR", "GEO", "GHA", "GIN", "GLP", "GMB", "GNB", "GNQ", "GRC", "GRD", "GTM", "GUF", "GUM", "GUY", "HKG", "HND", "HRV", "HTI", "HUN", "IDN", "IMN", "IND", "IRL", "IRN", "IRQ", "ISL", "ISR", "ITA", "JAM", "JOR", "JPN", "KAZ", "KEN", "KGZ", "KHM", "KIR", "KNA", "KOR", "KWT", "LAO", "LBN", "LBR", "LBY", "LCA", "LIE", "LKA", "LSO", "LTU", "LUX", "LVA", "MAC", "MAF", "MAR", "MDA", "MDG", "MDV", "MEX", "MHL", "MKD", "MLI", "MLT", "MMR", "MNE", "MNG", "MNP", "MOZ", "MRT", "MSR", "MTQ", "MUS", "MWI", "MYS", "MYT", "NAM", "NCL", "NER", "NGA", "NIC", "NIU", "NLD", "NOR", "NPL", "NZL", "OMN", "PAK", "PAN", "PER", "PHL", "PLW", "PNG", "POL", "PRI", "PRK", "PRT", "PRY", "PSE", "PYF", "QAT", "REU", "ROU", "RUS", "RWA", "SAU", "SCG", "SDN", "SEN", "SGP", "SHN", "SLB", "SLE", "SLV", "SOM", "SPI", "SRB", "SSD", "STP", "SUR", "SVK", "SVN", "SWE", "SWZ", "SXM", "SYC", "SYR", "TCA", "TCD", "TGO", "THA", "TJK", "TKL", "TKM", "TLS", "TON", "TTO", "TUN", "TUR", "TUV", "TWN", "TZA", "UGA", "UKR", "URY", "USA", "UZB", "VCT", "VEN", "VGB", "VIR", "VNM", "VUT", "WLF", "WSM", "YEM", "ZAF", "ZMB", "ZWE"
      ]
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({});

  const fetchData = async () => {
    try {
      const data = await fetchDisasters(search, filter);
      setDisasters(data || []); // Ensure disasters is always an array
    } catch (error) {
      console.error("Error fetching disasters:", error);
      setDisasters([]); // Fallback to empty array in case of error
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, filter]);

  return (
    <div className="disasters-page">
      <div className="padd"></div>
      <div className="header">
        <h1>Disasters</h1>
      </div>
      <div>
        <SearchBar className="SearchBar" onSearch={setSearch} placeholder_value={'Search Disasters'}/>
        <FilterDropdown className="FilterDropdown"
          filters={filters}
          onFilter={(newFilter) => setFilter(newFilter)}
        />
      </div>
      <div className="table-container">
        <DisasterTable disasters={disasters} refreshDisasters={fetchData} userRole={userRole}/>
      </div>
      <div className="map-container">
        <DisasterMap disasters={disasters} />
      </div>
    </div>
  );
};

export default DisastersPage;
