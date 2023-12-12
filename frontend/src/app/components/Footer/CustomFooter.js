"use client";
import { Avatar, Col, Layout, Row } from "antd";
import "./Footer.css";
const { Footer } = Layout;
import {
  AiFillYoutube,
  AiFillFacebook,
  AiOutlineWhatsApp,
  AiFillGithub,
  AiFillInstagram,
} from "react-icons/ai";
import { BsDiscord } from "react-icons/bs";
import CustomButton from "../comman/CustomButton";
import CustomInput from "../comman/Custominput";
export default function CustomFooter() {
  return (
    <Footer className="footer container-fluid bg-white">
      <Row>
        <Col span={6}>
          <div className="footer-logo d-flex flex-column gap-3">
            <Avatar src="/images/logo.png" />{" "}
            <h3 className="footer-heading-color"> Digital Pulse</h3>
            <p>
              We'are always in search for talented and motivated people. Don't
              be shy introduce yourself!
            </p>
          </div>
          <div className="social-icons d-flex gap-3 pb-2 mb-2">
            <a href="https://ant.design">
              <Avatar
                className="icon"
                style={{ backgroundColor: "#cd9bfe" }}
                icon={<AiFillYoutube />}
              ></Avatar>
            </a>
            <a href="https://ant.design">
              <Avatar
                className="icon"
                style={{ backgroundColor: "#fe368f" }}
                icon={<AiOutlineWhatsApp />}
              ></Avatar>
            </a>
            <a href="https://ant.design">
              <Avatar
                className="icon"
                style={{ backgroundColor: "#01b4b9" }}
                icon={<AiFillFacebook />}
              ></Avatar>
            </a>
            <a href="https://ant.design">
              <Avatar
                className="icon"
                style={{ backgroundColor: "#fb8b6c" }}
                icon={<AiFillInstagram />}
              ></Avatar>
            </a>
            <a href="https://ant.design">
              <Avatar
                className="icon"
                style={{ backgroundColor: "#c8e4d5" }}
                icon={<BsDiscord />}
              ></Avatar>
            </a>
            <a href="https://ant.design">
              <Avatar
                className="icon"
                style={{ backgroundColor: "#b449b3" }}
                icon={<AiFillGithub />}
              ></Avatar>
            </a>
          </div>
          <CustomButton
            type="primary"
            title="Contact Us"
            className="w-auto fw-bold mt-3"
          />
        </Col>
        <Col span={5}>
          <h3 className="footer-heading-color">UseFul Links</h3>
          <div className="mt-3 d-flex flex-column">
            <CustomButton
              title="Courses"
              className="fit-content ps-0"
              type="link"
            />
            <CustomButton
              title="Courses"
              className="fit-content ps-0"
              type="link"
            />
            <CustomButton
              title="Courses"
              className="fit-content ps-0"
              type="link"
            />
            <CustomButton
              title="Courses"
              className="fit-content ps-0"
              type="link"
            />
            <CustomButton
              title="Courses"
              className="fit-content ps-0"
              type="link"
            />
            <CustomButton
              title="Courses"
              className="fit-content ps-0"
              type="link"
            />
          </div>
        </Col>
        <Col span={5}>
          <h3 className="footer-heading-color">Our Company</h3>
          <div className="mt-3 d-flex flex-column">
            <CustomButton
              title="Courses"
              className="fit-content ps-0"
              type="link"
            />
            <CustomButton
              title="Courses"
              className="fit-content ps-0"
              type="link"
            />
            <CustomButton
              title="Courses"
              className="fit-content ps-0"
              type="link"
            />
            <CustomButton
              title="Courses"
              className="fit-content ps-0"
              type="link"
            />
            <CustomButton
              title="Courses"
              className="fit-content ps-0"
              type="link"
            />
            <CustomButton
              title="Courses"
              className="fit-content ps-0"
              type="link"
            />
          </div>
        </Col>
        <Col span={8}>
          <h3 className="footer-heading-color">Get Contact</h3>
          <div className="mt-3 d-flex flex-column">
            <CustomButton
              title="Phone: +923009241913"
              className="fit-content ps-0"
              type="link"
            />
            <CustomButton
              title="Email: abdullahrasheed45@gmail.com"
              className="fit-content ps-0"
              type="link"
            />
          </div>
          <div className="mt-3">
            <h4>Newsletter</h4>
            <p className="mt-2">
              2000+ Our students are subscribe Around the World. Dont be shy
              introduce yourself
            </p>
            <div className="mt-3 d-flex">
              <CustomInput />
              <CustomButton type="primary" title="Subscribe" className="fit-content ps-0 rounded rounded-0" />
            </div>
          </div>
        </Col>
      </Row>
    </Footer>
  );
}
