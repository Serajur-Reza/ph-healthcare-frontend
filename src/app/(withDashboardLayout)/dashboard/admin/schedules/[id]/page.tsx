"use client";

import { useParams } from "next/navigation";
import React from "react";

type Props = {};

const SingleSchedule = (props: Props) => {
  const { id } = useParams();

  return <div>page - {id}</div>;
};

export default SingleSchedule;
