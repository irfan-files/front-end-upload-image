// import React from "react";
// import axios from "axios";
// import imageData from "./excel-to-json.json"; // Pastikan file JSON ini ditempatkan di direktori src
// import ImageSelector from "./ImageSelector";

// const App = () => {
//   const downloadImages = async () => {
//     const images = imageData.Products.map((product) => product.item_image);
//     let failedDownloads = [];

//     for (let i = 0; i < images.length; i++) {
//       try {
//         const response = await axios.post("http://localhost:3001/download", {
//           url: images[i],
//           filename: `${i + 1}.jpg`,
//         });
//         console.log(response.data.message);
//       } catch (error) {
//         console.error(`Kesalahan mengunduh gambar ${i + 1}: ${error.message}`);
//         failedDownloads.push(images[i]);
//       }
//     }

//     if (failedDownloads.length > 0) {
//       console.log("Daftar URL yang gagal diunduh:", failedDownloads);
//       alert(`Gagal mengunduh beberapa gambar. Lihat console untuk detail.`);
//     } else {
//       alert("Semua gambar berhasil diunduh dan disimpan.");
//     }
//   };

//   const images = imageData.Products.map((product) => product.item_image);

//   return (
//     <div>
//       <h1>Pengunduh Gambar</h1>
//       <button onClick={downloadImages}>Unduh Gambar</button>
//       <ImageSelector images={images} downloadSelectedImages={downloadImages} />
//     </div>
//   );
// };

// export default App;

// import React from "react";
// import axios from "axios";
// import imageData from "./excel-to-json.json"; // Ensure this JSON file is in the src directory
// import ImageSelector from "./ImageSelector"; // Import the newly created ImageSelector component

// const App = () => {
//   const downloadAllImages = async () => {
//     const images = imageData.Products.map((product) => product.item_image);
//     let failedDownloads = [];

//     for (let i = 0; i < images.length; i++) {
//       try {
//         const response = await axios.post("http://localhost:3001/download", {
//           url: images[i],
//           filename: `${i + 1}.jpg`,
//         });
//         console.log(response.data.message);
//       } catch (error) {
//         console.error(`Error downloading image ${i + 1}: ${error.message}`);
//         failedDownloads.push(images[i]);
//       }
//     }

//     if (failedDownloads.length > 0) {
//       console.log("List of URLs that failed to download:", failedDownloads);
//       alert(`Failed to download some images. Check the console for details.`);
//     } else {
//       alert("All images downloaded and saved successfully.");
//     }
//   };

//   const downloadImages = async (selectedImages) => {
//     let failedDownloads = [];

//     for (let i = 0; i < selectedImages.length; i++) {
//       try {
//         const response = await axios.post(
//           "http://localhost:3001/downloadSelectedImage",
//           {
//             url: selectedImages[i].url,
//             filename: selectedImages[i].filename,
//           }
//         );
//         console.log(response.data.message);
//       } catch (error) {
//         console.error(`Error downloading image ${i + 1}: ${error.message}`);
//         failedDownloads.push(selectedImages[i].url);
//       }
//     }

//     if (failedDownloads.length > 0) {
//       console.log("List of URLs that failed to download:", failedDownloads);
//       alert(`Failed to download some images. Check the console for details.`);
//     } else {
//       alert("All selected images downloaded and saved successfully.");
//     }
//   };

//   const images = imageData.Products.map((product) => product.item_image);

//   return (
//     <div style={styles.app}>
//       <h1 style={styles.header}>Image Downloader</h1>
//       <button onClick={downloadAllImages} style={styles.downloadAllButton}>
//         Download All Images
//       </button>

//       <h2 style={styles.header}>Download Selected Images</h2>

//       <ImageSelector images={images} downloadSelectedImages={downloadImages} />
//     </div>
//   );
// };

// const styles = {
//   app: {
//     minHeight: "100vh",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#f0f0f0",
//     padding: "20px",
//   },
//   header: {
//     fontSize: "24px",
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: "24px",
//   },
//   downloadAllButton: {
//     padding: "10px 20px",
//     fontSize: "16px",
//     fontWeight: "bold",
//     backgroundColor: "#4CAF50",
//     color: "#fff",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     marginBottom: "24px",
//   },
// };

// export default App;

import React, { useState } from "react";
import axios from "axios";
import ImageSelector from "./ImageSelector"; // Import the newly created ImageSelector component
import ImageUploader from "./ImageUploader"; // Import the newly created ImageUploader component

const App = () => {
  const [imageData, setImageData] = useState(null);

  const downloadAllImages = async () => {
    if (!imageData) {
      alert("No image data available. Please upload a JSON file first.");
      return;
    }
    const images = imageData.Products.map((product) => product.item_image);
    let failedDownloads = [];

    for (let i = 0; i < images.length; i++) {
      try {
        const response = await axios.post("http://localhost:3001/download", {
          url: images[i],
          filename: `${i + 1}.jpg`,
        });
        console.log(response.data.message);
      } catch (error) {
        console.error(`Error downloading image ${i + 1}: ${error.message}`);
        failedDownloads.push(images[i]);
      }
    }

    if (failedDownloads.length > 0) {
      console.log("List of URLs that failed to download:", failedDownloads);
      alert(`Failed to download some images. Check the console for details.`);
    } else {
      alert("All images downloaded and saved successfully.");
    }
  };

  const downloadImages = async (selectedImages) => {
    let failedDownloads = [];

    for (let i = 0; i < selectedImages.length; i++) {
      try {
        const response = await axios.post(
          "http://localhost:3001/downloadSelectedImage",
          {
            url: selectedImages[i].url,
            filename: selectedImages[i].filename,
          }
        );
        console.log(response.data.message);
      } catch (error) {
        console.error(`Error downloading image ${i + 1}: ${error.message}`);
        failedDownloads.push(selectedImages[i].url);
      }
    }

    if (failedDownloads.length > 0) {
      console.log("List of URLs that failed to download:", failedDownloads);
      alert(`Failed to download some images. Check the console for details.`);
    } else {
      alert("All selected images downloaded and saved successfully.");
    }
  };

  const handleUpload = (uploadedData) => {
    setImageData(uploadedData);
  };

  const images = imageData
    ? imageData.Products.map((product) => product.item_image)
    : [];

  return (
    <div style={styles.app}>
      <h1 style={styles.header}>Image Downloader</h1>
      <ImageUploader onUpload={handleUpload} />
      <button onClick={downloadAllImages} style={styles.downloadAllButton}>
        Download All Images
      </button>

      <h2 style={styles.header}>Download Selected Images</h2>

      {imageData && (
        <ImageSelector
          images={images}
          downloadSelectedImages={downloadImages}
        />
      )}
    </div>
  );
};

const styles = {
  app: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    padding: "20px",
  },
  header: {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "24px",
  },
  downloadAllButton: {
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "24px",
  },
};

export default App;
