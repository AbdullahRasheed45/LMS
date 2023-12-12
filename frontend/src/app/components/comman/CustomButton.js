"use client";
import { Button } from "antd";

export default function CustomButton(props) {
  const { title, className, type, shape, onClick } = props;
  return (
    <Button type={type} shape={shape} onClick={onClick} className={className}>
      {title}
    </Button>
  );
}
