"use client"
import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import CustomInput from "../components/comman/Custominput";
import CustomButton from "../components/comman/CustomButton";
import Link from "next/link";
import { useRouter } from "next/navigation";

const forgotPassword = () => {
  const router = useRouter();
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
            <CustomButton
              title="Proceed"
              type="primary"
              className="w-100 d-block my-3"
              onClick={() => router.push("/reset-password")}
            />
            <div className="my-3 d-flex justify-content-center">
              <Link
                href="/login"
                className="text-dark text-decoration-none text-center"
              >
                Go to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default forgotPassword;
