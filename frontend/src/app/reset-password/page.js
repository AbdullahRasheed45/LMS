import React from "react"
import CustomInput from "../components/comman/Custominput";
import CustomButton from "../components/comman/CustomButton";
import Link from "next/link";
export default function ResetPassword() {
  return (
    <div className="container-fluid bg-white">
      <div className="row py-5">
        <div className="col-4 mx-auto py-5">
          <form action="" className="form-wrapper p-4">
            <CustomInput placeholder="Enter Password" className="mt-3" />
            <CustomInput placeholder="Confirm Password" className="mt-3" />
            <CustomButton
              title=""
              type="primary"
              className="w-100 d-block my-3"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
