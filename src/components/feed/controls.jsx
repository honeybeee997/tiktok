import { useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router";
import { useSupabase } from "../../context/useSupabase";

const Control = ({ icon, url = "" }) => {
  return (
    <Link
      to={url}
      className="p-4 inline-block rounded-full bg-gray-50 hover:bg-gray-300 text-black"
    >
      {icon}
    </Link>
  );
};

Control.propTypes = {
  icon: PropTypes.element.isRequired,
  url: PropTypes.string,
};

const Controls = () => {
  const { reels } = useSupabase();
  const params = useParams();
  const navigate = useNavigate();
  const videoId = params.videoId || reels[0].id;

  const currentVideoIndex = reels.findIndex((video) => video.id === videoId);

  let nextVideoIndex = (currentVideoIndex + 1) % reels.length;
  let prevVideoIndex = (currentVideoIndex - 1 + reels.length) % reels.length;

  if (nextVideoIndex === reels.length - 1) nextVideoIndex = 0;
  if (prevVideoIndex === -1) prevVideoIndex = reels.length - 1;

  useEffect(() => {
    let scrollTimeout;

    const handleWheel = (event) => {
      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        if (event.deltaY > 0) {
          navigate(`/feed/${reels[prevVideoIndex].id}`);
        } else if (event.deltaY < 0) {
          navigate(`/feed/${reels[nextVideoIndex].id}`);
        }
      }, 150);
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("scroll", handleWheel);
    };
  }, [navigate, nextVideoIndex, prevVideoIndex, reels]);

  return (
    <div className="flex flex-col items-center gap-4 absolute top-1/2 -translate-y-1/2 right-0 translate-x-[200%]">
      <Control
        icon={<FaChevronUp />}
        url={`/feed/${reels[prevVideoIndex].id}`}
      />
      <Control
        icon={<FaChevronDown />}
        url={`/feed/${reels[nextVideoIndex].id}`}
      />
    </div>
  );
};

export default Controls;
