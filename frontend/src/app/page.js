"use client";
import { useEffect, useState } from "react";
import CustomCard from "./components/comman/CustomCard";
import { axiosInstance } from "@/config/axiosConfig";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const getCourses = async () => {
    const courses = await axiosInstance({
      method: "GET",
      url: "course/all",
    });
    console.log(courses);
    if (courses.status) {
      setCourses(courses.data);
    }
  };
  useEffect(() => {
    getCourses();
  }, []);
  return (
    <main className="py-5">
      <div className="container-fluid">
        <div className="row">
          <div className="col-4">
            <CustomCard />
          </div>
        </div>
      </div>
    </main>
  );
}
