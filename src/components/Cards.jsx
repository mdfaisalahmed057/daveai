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

const BASE_URL = 'https://staging.iamdave.ai';

const Cards = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [currentSupplierIndex, setCurrentSupplierIndex] = useState(0);
  
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
        console.log(response.data.is_last)

        const data = response.data;
        setSuppliers(data.data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };

    fetchSuppliers();
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
  }
 
 
console.log(suppliers)
    return (
    <>
      <div className='flex justify-center'>
        <div className="max-w-md bg-white shadow-lg rounded-lg overflow-hidden mt-10 w-96 h-96 overflow-y-auto">
          {suppliers.length > 0  &&(
            <div className="border p-4 px-4 py-2 grid grid-cols-2 gap-2">
              <div className="text-blue-600 flex items-center">
                <CategoryIcon className="mr-2" />
                Category:
              </div>
              <div className="text-black">{suppliers[currentSupplierIndex].category}</div>

              <div className="text-green-600 flex items-center">
                <SourceIcon className="mr-2" />
                Channel:
              </div>
              <div className="text-black">{suppliers[currentSupplierIndex].channel}</div>

              <div className="text-purple-600 flex items-center">
                <DescriptionIcon className="mr-2" />
                Description:
              </div>
              <div className="text-black overflow-hidden">{suppliers[currentSupplierIndex].request_description}</div>

              <div className="text-red-600 flex items-center">
                <PhoneCallbackIcon className="mr-2" />
                Contact Numbers:
              </div>
              <div className="text-black">{suppliers[currentSupplierIndex].contact_numbers}</div>

              {suppliers[currentSupplierIndex].state && (
                <><div className="text-orange-600 flex items-center">
                  <LocationCityIcon className="mr-2" />
                  state:
                </div><div className="text-black">{suppliers[currentSupplierIndex].state}</div></>
              )}


              {suppliers[currentSupplierIndex].district && (
                <><div className="text-orange-600 flex items-center">
                  <HolidayVillageIcon className="mr-2" />
                  District:
                </div><div className="text-black">{suppliers[currentSupplierIndex].district}</div></>
              )}

              <div className="text-indigo-600 flex items-center">
                <AccessTimeIcon className="mr-2" />
                Source Time:
              </div>
              <div className="text-black">{suppliers[currentSupplierIndex].source_time}</div>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-4">
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
      </div>
    
    </>
  );
};

export default Cards; 
