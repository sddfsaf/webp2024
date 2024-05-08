import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const Datagrid = () => {
  const [dataset, setDataset] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6');
        const data = await response.json();
        setDataset(data);
        setFilteredData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    updatePagination();
  }, [currentPage, filteredData]);

  const updatePagination = () => {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    console.log(currentPage);
    console.log(filteredData);
  };

  const columns = [
    { field: 'title', headerName: '名稱', width: 200 },
    { field: 'location', headerName: '地點', width: 150 },
    { field: 'price', headerName: '票價', width: 120 }
  ];

  const rows = filteredData.map((data, index) => ({
    id: index,
    ...data
  }));

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
    const newFilteredData = dataset.filter(data => data.title.toLowerCase().includes(e.target.value.toLowerCase()));
    setFilteredData(newFilteredData);
    setCurrentPage(1);
  };

  return (
    <div>
      <h1>景點觀光覽資訊</h1>
      <input type="text" id="searchInput" placeholder="搜尋名稱" value={searchInput} onChange={handleSearchInputChange} />
      <br /><br />
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={itemsPerPage}
          pagination
          page={currentPage}
          onPageChange={(newPage) => setCurrentPage(newPage)}
          autoHeight
        />
      </Box>
    </div>
  );
};

export default Datagrid;
