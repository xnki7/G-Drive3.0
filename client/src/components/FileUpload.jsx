import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";

const FileUpload = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `Enter Your Key`,
            pinata_secret_api_key: `Enter Your Secret Key`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        const signer = contract.connect(provider.getSigner());
        signer.add(account, ImgHash);
      } catch (e) {
        alert("Unable to upload image to pinata");
      }
    }
  };
  const retriveFile = () => {};
  return (
    <div className="top">
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input
          type="file"
          disabled={!account}
          id="file-upload"
          name="data"
          onChange={retriveFile}
        />
        <span className="textArea">Image: {fileName}</span>
        <button type="submit" className="upload">
          Upload File
        </button>
      </form>
    </div>
  );
};
export default FileUpload;
