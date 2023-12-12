"use client";
import { AiOutlineHeart } from "react-icons/ai";
import {GrView} from "react-icons/gr"
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { Avatar, Card, Skeleton} from "antd";
const { Meta } = Card;
export default function CustomCard() {
  return (
    <>
      <Card
        style={{
          width: 300,
          marginTop: 16,
        }}
        actions={[
          <AiOutlineHeart className="fs-5" key="wishlist" />,
          <GrView key="view" />,
        ]}
      >
        <Skeleton loading={false} avatar active>
          <Meta
            avatar={
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />
            }
            title="Card title"
            description="This is the description"
          />
        </Skeleton>
      </Card>
    </>
  );
}
