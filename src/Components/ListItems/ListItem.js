import React, { useEffect, useState } from "react";
import "./ListItem.css";
import { BsPlusCircleFill, BsTrash } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import img1 from "../../assets/imgs/proImg.jpg";
import axios from "axios";
import ReactPaginate from "react-paginate";

function ListItem() {
  const [employees, setEmployees] = useState([]);
  const [sortValue, setSortValue] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  const sortOptions = ["name", "email"];

  // Pagination

  const employeesPerPage = 10;
  const pagesVisited = pageNumber * employeesPerPage;

  const displayEmployees = employees.slice(
    pagesVisited,
    pagesVisited + employeesPerPage
  );

  const pageCount = Math.ceil(employees.length / employeesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  // Getting Data from BD

  useEffect(() => {
    getData();
  }, []);

  let getData = async () => {
    let employeeList = await axios.get(
      "https://employee-app-back.herokuapp.com/employees"
    );
    setEmployees(employeeList.data);
  };

  // Delete Employee from DB

  let handleDelete = async (id) => {
    await axios.delete(`https://employee-app-back.herokuapp.com/delete/${id}`);
    getData();
  };

  // Filtering Employees

  let handleSort = async (e) => {
    let value = e.target.value;
    setSortValue(value);
    return await axios
      .get(
        `https://employee-app-back.herokuapp.com/employees?sort=${value} asc`
      )
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {/* Title Section */}
      <div className="title">
        <b>Employees List</b>
      </div>
      <div className="employee_list_box">
        {/* Filter by email and username */}

        <div className="filter-emp">
          <select onChange={handleSort} value={sortValue}>
            <option value={"FilterBy"}>Filter by</option>
            {sortOptions.map((item, index) => {
              return (
                <option value={item} key={index}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>

        {/* Creating New Employee */}

        <Link className="createuser-btn" to={"/createUser"}>
          <span>New Employee</span>
          <BsPlusCircleFill color={"#ce1212"} size={25} className="add_icons" />
        </Link>
      </div>

      {/* List of Employees */}

      <div className="list_item_action">
        {displayEmployees.map((emp, index) => {
          return (
            <div className="list_item" key={index}>
              <div className="list_item_body">
                <div className="imgBox">
                  <img src={img1} alt="profile_img" width={200} height={200} />
                </div>

                <div className="contentBox">
                  <div className="list_item_info">Name: {emp.name}</div>
                  <div className="list_item_info" style={{ color: "#822659" }}>
                    Contact: {emp.phoneno}
                  </div>
                  <div className="list_item_info">Email: {emp.email}</div>
                  <div className="list_item_info" style={{ color: "#822659" }}>
                    Gender: {emp.gender}
                  </div>
                  <div className="list_item_info">Status: {emp.status}</div>
                </div>

                <div className="list_item_actions">
                  <Link to={`/editUser/${emp._id}`}>
                    <FiEdit2 color={"#150485"} className="action" />
                  </Link>
                  <BsTrash
                    color={"#ce1212"}
                    className="action"
                    onClick={() => {
                      handleDelete(emp._id);
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}

        {/* Pagination division */}

        <div className="pagination_section">
          <ReactPaginate
            previousLabel={"Prev"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationbtns"}
            previousLinkClassName={"previousbtns"}
            nextLinkClassName={"nextbtns"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </div>
      </div>
    </>
  );
}

export default ListItem;
