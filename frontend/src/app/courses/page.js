import React from "react";
import CustomCard from "../components/comman/CustomCard";

const Courses = ({courses}) => {
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
};

export default Courses;

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:4000/api/courses");
  const Courses = await res.json();
  return { props: { repo } };
};
 