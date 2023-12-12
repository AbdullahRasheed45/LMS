"use client";
import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";

export default function CustomInput({placeholder, prefix, className}) {
  return <Input className={className} size="large" placeholder={placeholder} prefix={prefix} />;
}
