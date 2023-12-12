"use client"
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./components/Header/Header";
import { Button, message } from "antd";
import CustomFooter from "./components/Footer/CustomFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  const [messageApi, contextHolder] = message.useMessage();
  const info = () => {
    messageApi.info("Hello, Ant Design!");
  };
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <CustomFooter />
        {contextHolder}
      </body>
    </html>
  );
}