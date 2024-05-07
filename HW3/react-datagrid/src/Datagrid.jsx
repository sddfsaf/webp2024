import React, { useState, useEffect } from 'react';

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
    renderData();
    updatePagination();
  }, [currentPage, filteredData]);

  const renderData = () => {
    const myTable = document.getElementById("tableBody");
    myTable.innerHTML = '';
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);
    currentData.forEach(data => {
      const row = myTable.insertRow(-1);
      row.insertCell(0).innerHTML = data['title'];
      row.insertCell(1).innerHTML = data['showInfo'][0]['location'];
      row.insertCell(2).innerHTML = data['showInfo'][0]['price'];
    });
  };

  const updatePagination = () => {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    document.getElementById('currentPage').textContent = currentPage;
    document.getElementById('totalPages').textContent = totalPages;
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const search = () => {
    const newFilteredData = dataset.filter(data => data['title'].toLowerCase().includes(searchInput.toLowerCase()));
    setFilteredData(newFilteredData);
    setCurrentPage(1);
  };

  return (
    <div>
      <h1>景點觀光覽資訊</h1>
      <input type="text" id="searchInput" placeholder="搜尋名稱" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
      <br /><br />
      <table id="csie" className="table table-striped table-hover">
        <thead>
          <tr>
            <th>名稱</th>
            <th>地點</th>
            <th>票價</th>
          </tr>
        </thead>
        <tbody id="tableBody"></tbody>
      </table>
      <div>
        <button onClick={prevPage}>上一頁</button>
        <span id="currentPage"></span>頁/<span id="totalPages"></span>頁
        <button onClick={nextPage}>下一頁</button>
      </div>
    </div>
  );
};

export default Datagrid;
