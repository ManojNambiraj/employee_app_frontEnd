import React, { useState } from "react";
import { BsArrowRightCircleFill, BsPlusCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import "./CreateUser.css";
import profileImg from "../../assets/imgs/bot.jpg";
import { useFormik } from "formik";
import axios from "axios";

function CreateUser() {
  const navigate = useNavigate();

  //Image upload state
  const [image, setImage] = useState(null);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  function validateImg(e) {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      return alert("Max file size is 1Mb");
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  async function uploadImage() {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "iumncoar");
    try {
      setUploadingImg(true);
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/fullstackfordeveloping/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const urlData = await res.json();
      setUploadingImg(false);
      return urlData.url;
    } catch (error) {
      setUploadingImg(false);
      console.log(error);
    }
  }

  const imgSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please Upload your profile picture");
    const url = await uploadImage(image);
    console.log(url);
  };

  // Formik for handling form data and creating the employee details

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneno: "",
      status: "Status",
      gender: "Gender",
      profile: "",
    },
    onSubmit: async (values) => {
      await axios.post(
        "https://employee-app-back.herokuapp.com/new-employee",
        values
      );
      alert("New Employee Created Successfully");
      navigate("/");
    },
  });

  return (
    <>
      {/* Title section */}

      <div className="title">
        <b>Create Employee</b>
      </div>

      {/* buttons for create new employee and goto the employees list section */}

      <div className="create-employee-box">
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
        <form
          className="create-emp-form"
          onSubmit={() => {
            formik.handleSubmit();
          }}
        >
          <div className="signup-profile-pic__container">
            <img
              src={imagePreview || profileImg || uploadingImg}
              className="signup-profile-pic"
              alt="Profile pics"
            />
            <label htmlFor="image-upload" className="image-upload-label">
              <BsPlusCircleFill
                color={"#ce1212"}
                size={25}
                className="profile_pic_add_icons"
              />
            </label>
            <input
              type="file"
              id="image-upload"
              hidden
              accept="image/jpeg, image/png"
              name="profile"
              onChange={(e) => {
                validateImg();
                formik.handleChange();
              }}
              value={formik.values.profile}
            />
          </div>

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

export default CreateUser;
