import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import CustomInput from "../components/comman/Custominput";
import CustomButton from "../components/comman/CustomButton";
import "./login.css";
import Link from "next/link";

const Page = () => {
  return (
    <div className="container-fluid bg-white">
      <div className="row py-5">
        <div className="col-4 mx-auto py-5">
          <form action="" className="form-wrapper p-4">
            <CustomInput
              placeholder="Email Address"
              prefix={<AiOutlineMail />}
              className="mt-3"
            />
            <CustomInput
              placeholder="Enter Password"
              prefix={<RiLockPasswordLine />}
              className="mt-3 mt-2"
            />
            <Link href="/forgot-password" className="text-dark text-decoration-none mt-2">
              Forgot Password?
            </Link>
            <CustomButton
              title="Login"
              type="primary"
              className="w-100 d-block mt-3"
            />
            <div className="my-3 d-flex justify-content-center">
              <Link
                href="/signup"
                className="text-dark text-decoration-none text-center"
              >
                Do you have an Account? <b>Register</b>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
