import Table from 'react-bootstrap/Table';
import { Share2, Pencil, Trash2 } from 'lucide-react';
import { Link, useNavigate,useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ListAllProperty = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const Navigate = useNavigate()

  // Fetch properties with pagination
  const pagination = async (pageNo = 1) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/pagination?page=${pageNo}&limit=10`);
      setData(res.data.data);
      setPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      alert("Failed to get properties");
    }
  };

  // Highlight function for property title
  const highlightText = (text, search) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span key={index} style={{ color: "blue", fontWeight: "bold" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // Search properties
  const handleSearch = async (value) => {
    setSearch(value);
    if (value.trim() === "") {
      pagination(1); // 🔹 reset to first page
      return;
    }
    try {
      const res = await axios.get(`${BASE_URL}/api/search?q=${value}`);
      setData(res.data.data);
      setTotalPages(1); // 🔹 disable pagination for search
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      alert("Search failed");
    }
  };

  // Delete property
  const deleteProperties = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/${id}`);
      pagination(page); // 🔹 refresh current page
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      alert("Failed to delete property");
    }
  };

  useEffect(() => {
    pagination(1); 
  }, []);

  return (
    <div className="d-flex flex-column">

      <div className="d-flex justify-content-between m-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search property"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <Link to="/addproperty" className="btn btn-success ms-auto">
          Add Property
        </Link>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Property Name</th>
            <th>Residential Type</th>
            <th>Price</th>
            <th>Address</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((data, index) => (
              <tr key={data._id}>
                <td>{index + 1 + (page - 1) * 10}</td>
                <td>{highlightText(data.propertyTitle, search)}</td>
                <td>{data.propertyType}</td>
                <td>{data.price}</td>
                <td>{data.zone}</td>
                <td>{data.availabilityStatus}</td>
                <td className="d-flex gap-3">
                  <Link to={`/share/${data._id}`}><Share2 /></Link>
                  <div onClick={() => Navigate(`/editproperty/${data._id}`)}>
                    <Pencil className="me-1" />
                  </div>
                  <button
                    className="bg-transparent border-0 text-danger"
                    onClick={() => deleteProperties(data._id)}
                  >
                    <Trash2 />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No properties found</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* pagination */}
      <div className="d-flex justify-content-center my-3">
        <button
          className="btn btn-primary mx-2"
          disabled={page <= 1}
          onClick={() => pagination(page - 1)}
        >
          Prev
        </button>
        <span className="align-self-center">
          Page {page} of {totalPages}
        </span>
        <button
          className="btn btn-primary mx-2"
          disabled={page >= totalPages}
          onClick={() => pagination(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ListAllProperty;
