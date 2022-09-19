import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  BsArrowLeftCircleFill,
  BsArrowRightCircleFill,
  BsPlusCircleFill,
} from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import profileImg from "../../assets/imgs/bot.jpg";
import "./EditUser.css";

function EditUser() {
  // Hooks section
  const params = useParams();
  const navigate = useNavigate();

  // Formik for handling form data and updating employee details

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneno: "",
      status: "",
      gender: "",
      profile: "",
    },
    onSubmit: async (values) => {
      await axios.put(
        `https://employee-app-back.herokuapp.com/edit/${params.id}`,
        values
      );
      alert("Employee Updated Successfully");
      navigate("/");
    },
  });

  // First fetching the particular employee informations

  let userDatas = async () => {
    let userData = await axios.get(
      `https://employee-app-back.herokuapp.com/employee/${params.id}`
    );
    console.log(userData.data);
    delete userData.data._id;
    formik.setValues(userData.data);
  };

  useEffect(() => {
    userDatas();
  }, []);

  return (
    <>
      {/* Title section */}

      <div className="editUser_title">
        <b>Edit Employee Details</b>
      </div>

      {/* buttons for create new employee and goto the employees list section */}

      <div className="add_employee-box">
        <Link className="createuser-btn" to={"/createUser"}>
          <BsArrowLeftCircleFill
            color={"#ce1212"}
            size={25}
            className="left_add_icons"
          />
          <span>Create Employee</span>
        </Link>
        <Link className="createuser-btn" to={"/"}>
          <span>Employees List</span>
          <BsArrowRightCircleFill
            color={"#ce1212"}
            size={25}
            className="add_icons"
          />
        </Link>
      </div>

      {/* updating employee form section using formik */}

      <div>
        <form className="create-emp-form" onSubmit={formik.handleSubmit}>
          <div className="createUser_input_form">
            <input
              type="text"
              className="todo_input"
              placeholder="Employee name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <input
              type="email"
              className="todo_input"
              placeholder="Email id"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <input
              type="number"
              className="todo_input"
              placeholder="Employee Phone"
              name="phoneno"
              onChange={formik.handleChange}
              value={formik.values.phoneno}
            />
            <select
              name="status"
              onChange={formik.handleChange}
              value={formik.values.status}
            >
              <option value={"status"}>Status</option>
              <option value={"active"}>active</option>
              <option value={"inactive"}>inactive</option>
            </select>
            <select
              name="gender"
              onChange={formik.handleChange}
              value={formik.values.gender}
            >
              <option value={"Gender"}>Gender</option>
              <option value={"Male"}>Male</option>
              <option value={"Female"}>Female</option>
            </select>
            <div className="create_User_btns">
              <input type="submit" value="Submit" className="create_emp_btn" />
              <input type="reset" value="Reset" className="reset_emp_btn" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditUser;
