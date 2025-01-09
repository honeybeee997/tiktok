import { Navigate } from "react-router";
import { useSupabase } from "../../context/useSupabase";
import { useState } from "react";
import { FaUpload } from "react-icons/fa6";
import toast from "react-hot-toast";

const Upload = () => {
  const { session, isLoading, upload } = useSupabase();

  const [file, setFile] = useState(null);

  if (!session) return <Navigate to="/login" />;

  const handleFileChange = (e) => {
    toast.dismiss();
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      setFile(null);
      return;
    }

    // Check if file is a video
    if (!selectedFile.type.startsWith("video/")) {
      toast.error("Please select a video file");
      setFile(null);
      return;
    }

    // Check file size (10MB = 10 * 1024 * 1024 bytes)
    if (selectedFile.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.dismiss();

    if (!file) {
      toast.error("Please select a video");
      return;
    }

    await upload(file);

    setFile(null);
  };

  return (
    <div className="min-h-screen bg-[#242424] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-6 space-y-6"
        >
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Upload Video</h1>
            <p className="mt-2 text-sm text-gray-600">
              Maximum file size: 10MB
            </p>
          </div>

          <div className="space-y-4">
            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
              <input
                type="file"
                onChange={handleFileChange}
                accept="video/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-label="Upload video"
              />
              <div className="space-y-2">
                <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="text-sm text-gray-600">
                  {file ? (
                    <span className="text-green-600 font-medium">
                      {file.name}
                    </span>
                  ) : (
                    <span>Drag and drop or click to upload video</span>
                  )}
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                style={{ backgroundColor: isLoading ? "#7f7f7f" : "#242424" }}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-mediumfocus:outline-none focus:ring-2 focus:ring-offset-2 text-white`}
              >
                {isLoading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;
