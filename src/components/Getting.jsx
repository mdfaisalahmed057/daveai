// src/components/SupplierList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DescriptionIcon from '@mui/icons-material/Description';
import CategoryIcon from '@mui/icons-material/Category';
import SourceIcon from '@mui/icons-material/Source';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import Cards from './Cards';

const BASE_URL = 'https://staging.iamdave.ai';
const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [currentSupplierIndex, setCurrentSupplierIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('source_time'); // Default sorting by source_time
  const [filteredSuppliers, setFilteredSuppliers] = useState([]); // State for filtered suppliers
  const [is_last, setIsLast] = useState(true)
  const [is_First, setIsFirst] = useState(false)
  const [totalSuppliersCount, setTotalSuppliersCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  console.log(filteredSuppliers)
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/list/supply?_page_number=1`,
          {
            headers: {
              'Content-Type': 'application/json',
              'X-I2CE-ENTERPRISE-ID': 'dave_vs_covid',
              'X-I2CE-USER-ID': 'ananth+covid@i2ce.in',
              'X-I2CE-API-KEY': '0349234-38472-1209-2837-3432434',
            },
          }
        );
        console.log(response)
        setIsFirst(response.data.is_first)
        setIsLast(response.data.is_last)
        setPageNumber(response.data.data.length)
        const data = response.data;
        setSuppliers(data.data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };

    fetchSuppliers();
  }, []);

  const handleNextSupplier = () => {
    const totalPages = Math.ceil(totalSuppliersCount / 50);
    if (!is_last && currentSupplierIndex < filteredSuppliers.length - 1) {
      setCurrentSupplierIndex(currentSupplierIndex + 1);
      setPageNumber(pageNumber + 1);
    }
  };
  const handlePrevious = () => {
    if (is_First && currentSupplierIndex > 0) {
      setCurrentSupplierIndex(currentSupplierIndex - 1);
      setPageNumber(pageNumber - 1);
    }
    console.log('After handling previous:', is_First, currentSupplierIndex);
  };

  //search quesry 
  const performSearch = () => {
    const searchTerm = searchQuery.toLowerCase();
    const filtered = suppliers.filter((supplier) =>
      supplier.category.toLowerCase().includes(searchTerm) ||
      supplier.channel.toLowerCase().includes(searchTerm) ||
      supplier.state.toLowerCase().includes(searchTerm)
    );

    // Sort the filtered results
    const sortedFiltered = filtered.slice().sort((a, b) => {
      if (sortBy === 'source_time') {
        return a.source_time.localeCompare(b.source_time);
      }
      // Add more sorting options here if needed
    });

    setFilteredSuppliers(sortedFiltered);
  };
  return (
    <>

      <div className='flex justify-center'>
        <h1 className='text-3xl font-bold'>Suppliers Lists</h1>
      </div>
      <div className='flex justify-center'>
        <div className="flex items-center mt-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-2 py-1 border rounded-md mr-4"
          />
          <label className="mr-2">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-2 py-1 border rounded-md"
          >
            <option value="source_time">Source Time</option>
            {/* Add other sorting options here if needed */}
          </select>
        </div>
        <button
          onClick={performSearch}
          className="h-8 w-20 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Search
        </button>

      </div>

      {filteredSuppliers.length > 0 ? (

        <><div className='flex justify-center'>
          <div className="max-w-md bg-white shadow-lg rounded-lg overflow-hidden mt-10 w-96 h-96 overflow-y-auto">
            <div className="border p-4 px-4 py-2 grid grid-cols-2 gap-2">
              <div className="text-blue-600 flex items-center">

                <CategoryIcon className="mr-2" />
                Category:
              </div>
              <div className="text-black">{filteredSuppliers[currentSupplierIndex].category}</div>

              <div className="text-green-600 flex items-center">
                <SourceIcon className="mr-2" />
                Channel:
              </div>
              <div className="text-black">{filteredSuppliers[currentSupplierIndex].channel}</div>

              <div className="text-purple-600 flex items-center">
                <DescriptionIcon className="mr-2" />
                Description:
              </div>
              <div className="text-black overflow-hidden">{filteredSuppliers[currentSupplierIndex].request_description}</div>

              <div className="text-red-600 flex items-center">
                <PhoneCallbackIcon className="mr-2" />
                Contact Numbers:
              </div>
              <div className="text-black">{filteredSuppliers[currentSupplierIndex].contact_numbers}</div>

              {filteredSuppliers[currentSupplierIndex].state && (
                <><div className="text-orange-600 flex items-center">
                  <LocationCityIcon className="mr-2" />
                  state:
                </div><div className="text-black">{filteredSuppliers[currentSupplierIndex].state}</div></>
              )}

              {filteredSuppliers[currentSupplierIndex].district && (
                <><div className="text-orange-600 flex items-center">
                  <HolidayVillageIcon className="mr-2" />
                  District:
                </div><div className="text-black">{filteredSuppliers[currentSupplierIndex].district}</div></>
              )}

              <div className="text-indigo-600 flex items-center">
                <AccessTimeIcon className="mr-2" />
                Source Time:
              </div>
              <div className="text-black">{filteredSuppliers[currentSupplierIndex].source_time}</div>

            </div>
          </div>

        </div><div className="flex justify-center mt-4">
            <button
              onClick={handlePrevious}
              className="px-4 py-2  bg-gray-400 text-white rounded disabled:bg-gray-400 mr-4"
            >
              &#8592; Previous Page
            </button>
            <button
              onClick={handleNextSupplier}
              className="px-4 py-2 bg-gray-400  text-white rounded disabled:bg-gray-400"
            >
              Next Page &#8594;
            </button>
          </div></>
      ) : (
        <Cards />
      )}
    </>
  );
};

export default SupplierList;
