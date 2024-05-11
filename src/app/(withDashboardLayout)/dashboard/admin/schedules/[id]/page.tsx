import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const SingleSchedule = (props: Props) => {
  const { params } = props;

  return <div>page - {params.id}</div>;
};

export default SingleSchedule;
