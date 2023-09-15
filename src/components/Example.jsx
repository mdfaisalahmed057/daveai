import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DescriptionIcon from '@mui/icons-material/Description';
import CategoryIcon from '@mui/icons-material/Category';
import SourceIcon from '@mui/icons-material/Source';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';

const BASE_URL = 'https://staging.iamdave.ai';

const Example = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [currentSupplierIndex, setCurrentSupplierIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('source_time');
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [channels, setChannels] = useState([]);
  const [states, setStates] = useState([]);

  useEffect(() => {
    // Inside the useEffect where you fetch unique options
const fetchUniqueOptions = async () => {
    try {
      const [categoryRes, channelRes, stateRes] = await Promise.all([
        axios.get(`${BASE_URL}/unique/supply/category`),
        axios.get(`${BASE_URL}/unique/supply/channel`),
        axios.get(`${BASE_URL}/unique/supply/state`),
      ]);
  
      if (Array.isArray(categoryRes.data)) {
        setCategories(categoryRes.data);
      }
      
      if (Array.isArray(channelRes.data)) {
        setChannels(channelRes.data);
      }
      
      if (Array.isArray(stateRes.data)) {
        setStates(stateRes.data);
      }
    } catch (error) {
      console.error('Error fetching unique options:', error);
    }
  };
  
    setSuppliers();
    fetchUniqueOptions();
  }, []);

  const handleNextSupplier = () => {
    if (currentSupplierIndex < suppliers.length - 1) {
      setCurrentSupplierIndex(currentSupplierIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSupplierIndex > 0) {
      setCurrentSupplierIndex(currentSupplierIndex - 1);
    }
  };

  const handleCategoryChange = async (category) => {
    setSearchQuery('');
    const response = await axios.get(`${BASE_URL}/list/supply?_page_number=1&category=${category}`);
    setFilteredSuppliers(response.data.data);
  };

  const handleChannelChange = async (channel) => {
    setSearchQuery('');
    const response = await axios.get(`${BASE_URL}/list/supply?_page_number=1&channel=${channel}`);
    setFilteredSuppliers(response.data.data);
  };

  const handleStateChange = async (state) => {
    setSearchQuery('');
    const response = await axios.get(`${BASE_URL}/list/supply?_page_number=1&state=${state}`);
    setFilteredSuppliers(response.data.data);
  };

  const performSearch = () => {
    const searchTerm = searchQuery.toLowerCase();
    const filtered = suppliers.filter((supplier) =>
      supplier.category.toLowerCase().includes(searchTerm) ||
      supplier.channel.toLowerCase().includes(searchTerm) ||
      supplier.state.toLowerCase().includes(searchTerm)
    );
console.log(filtered)
    const sortedFiltered = filtered.slice().sort((a, b) => {
      if (sortBy === 'source_time') {
        return a.source_time.localeCompare(b.source_time);
      }
    });

    setFilteredSuppliers(sortedFiltered);
  };
  return (
    <>
      {/* Filter options */}
      <div>
        <label htmlFor="category">Category:</label>
        <select id="category" onChange={(e) => handleCategoryChange(e.target.value)}>
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="channel">Channel:</label>
        <select id="channel" onChange={(e) => handleChannelChange(e.target.value)}>
          <option value="">All</option>
          {channels.map((channel) => (
            <option key={channel} value={channel}>
              {channel}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="state">State:</label>
        <select id="state" onChange={(e) => handleStateChange(e.target.value)}>
          <option value="">All</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      {/* Search and sort */}
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <label htmlFor="sortBy">Sort by:</label>
        <select id="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="source_time">Source Time</option>
        </select>
        <button onClick={performSearch}>Search</button>
      </div>

      {/* Display suppliers */}
      <div className="flex justify-center">
        <div className="max-w-md bg-white shadow-lg rounded-lg overflow-hidden mt-10 w-96 h-96 overflow-y-auto">
          {filteredSuppliers.length > 0 ? (
            <div className="border p-4 px-4 py-2 grid grid-cols-2 gap-2">
              {/* Display supplier details here */}
            </div>
          ) : (
            <div className="p-4">No suppliers found.</div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePrevious}
          className="px-4 py-2 bg-gray-400 text-white rounded disabled:bg-gray-400 mr-4"
        >
          &#8592; Previous Page
        </button>
        <button
          onClick={handleNextSupplier}
          className="px-4 py-2 bg-gray-400 text-white rounded disabled:bg-gray-400"
        >
          Next Page &#8594;
        </button>
      </div>
    </>
  );
};

export default Example;
