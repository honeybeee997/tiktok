import Controls from "./controls";

import { useParams } from "react-router";
import { useEffect, useRef } from "react";
import { useSupabase } from "../../context/useSupabase";

const Feed = () => {
  const { reels } = useSupabase();

  const videoRef = useRef();
  const params = useParams();
  const videoId = params?.videoId || reels[0].id;
  const video = reels.find((reel) => reel.id === videoId) || reels[0];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      if (videoRef.current.paused) videoRef.current.play();
    }
  }, [videoId]);

  return (
    <div className="h-screen w-screen flex items-center justify-center gap-4">
      <div className="relative h-5/6">
        <div className="h-full aspect-[9/16]  rounded-2xl relative overflow-hidden">
          <video
            controls
            autoPlay
            loop
            muted
            className="absolute top-0 left-0 w-full h-full object-cover"
            ref={videoRef}
          >
            <source
              src={`https://pxuhowakzvuymezqeetw.supabase.co/storage/v1/object/public/tiktok/uploads/${video.name}`}
              type="video/mp4"
            />
          </video>
        </div>
        <Controls />
      </div>
    </div>
  );
};

export default Feed;
