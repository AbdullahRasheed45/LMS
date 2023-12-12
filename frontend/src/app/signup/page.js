import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import CustomInput from "../components/comman/Custominput";
import CustomButton from "../components/comman/CustomButton";
import Link from "next/link";
const page = () => {
  return (
    <div className="container-fluid bg-white">
      <div className="row py-5">
        <div className="col-4 mx-auto py-5">
          <form action="" className="form-wrapper p-4">
            <CustomInput
              placeholder="First Name"
              className="mt-3"
            />
            <CustomInput
              placeholder="Last Name"
              className="mt-3"
            />
            <CustomInput
              placeholder="Email Address"
              className="mt-3"
            />
            <CustomInput
              placeholder="Mobile Number"
              className="mt-3"
            />
            <CustomInput
              placeholder="Enter Password"
              className="mt-3"
            />
            <CustomButton
              title="Sign Up"
              type="primary"
              className="w-100 d-block my-3"
            />
            <div className="my-3 d-flex justify-content-center">
              <Link
                href="/login"
                className="text-dark text-decoration-none text-center"
              >
                Do you already have an Account? <b>Login</b>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
