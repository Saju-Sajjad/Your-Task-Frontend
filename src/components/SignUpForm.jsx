import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { BiLoaderCircle } from "react-icons/bi";
import { FiUploadCloud } from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Css/Sign.css";
const SignUpForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFormData({
        ...formData,
        avatar: acceptedFiles[0],
      });
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("avatar", formData.avatar);

    try {
      const response = await axios.post(
        "https://your-task-backend.vercel.app//api/signup",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      navigate("/login");

      toast.success("Welcome! Sign Up successful!");
    } catch (error) {
      console.error("Signup Error:", error);
      setUploadError("Failed to upload the image. Please try again.");
      toast.error("Failed to upload the image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-body">
              <h2 className="text-center mb-4">Sign Up</h2>
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    required
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    minLength="6"
                    required
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Avatar</label>
                  <div {...getRootProps()} className="dropzone">
                    <input {...getInputProps()} />
                    {isLoading ? (
                      <div className="loader-container">
                        <BiLoaderCircle className="loader" />
                      </div>
                    ) : (
                      <FiUploadCloud />
                    )}

                    <p>Drag and drop an image here, or click to select image</p>
                    {acceptedFiles.length > 0 && (
                  <div className="uploaded-files">
                    {acceptedFiles.map((file) => (
                      <div key={file.path}>
                        <img src={URL.createObjectURL(file)} alt={file.path} />
                      </div>
                    ))}
                  </div>
                )}
                  </div>
                  {uploadError && <p className="text-danger">{uploadError}</p>}
                </div>
                

                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-3"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing Up..." : "Sign Up"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
