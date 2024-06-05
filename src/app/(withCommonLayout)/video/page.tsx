import VideoCall from "@/components/UI/VideoCall/VideoCall";
import React from "react";

type Props = {
  searchParams: { videoCallingId: string };
};

const VideoCalling = ({ searchParams }: Props) => {
  const videoCallingId = searchParams.videoCallingId;
  return <VideoCall videoCallingId={videoCallingId} />;
};

export default VideoCalling;
