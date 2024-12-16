import { useEffect, useState } from "react";

export function NasaComponent2() {
  const [mars, setMars] = useState({ photos: [] });
  const [selectedImage, setSelectedImage] = useState(null); // State for the selected image

  useEffect(() => {
    fetch(
      "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY"
    )
      .then((response) => response.json())
      .then((data) => {
        setMars(data);
      });
  }, []);

  return (
    <div className="container-sm">
      <h2 className="text-center m-4 text-info bg-dark p-3 rounded">Mars Rover Photos</h2>
      <div className="table-responsive">
        <table className="table table-hover table-striped shadow-sm rounded">
          <thead className="thead-dark">
            <tr>
              <th className=" text-success" scope="col">
                Photo Id
              </th>
              <th className=" text-success" scope="col">
                Preview
              </th>
              <th className=" text-success" scope="col">
                Camera Name
              </th>
              <th className=" text-success" scope="col">
                Rover Name
              </th>
            </tr>
          </thead>
          <tbody>
            {mars.photos.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <div
                    className="card"
                    style={{ width: "12rem", cursor: "pointer" }}
                    onClick={() => setSelectedImage(item.img_src)} // Open the modal with the clicked image
                  >
                    <img
                      className="card-img-top"
                      src={item.img_src}
                      alt="nasa mars"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  </div>
                </td>
                <td>{item.camera.full_name}</td>
                <td>{item.rover.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
          onClick={() => setSelectedImage(null)} // Close modal when clicking outside the image
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark border-0">
              <div className="modal-body text-center p-0">
                <img
                  src={selectedImage}
                  alt="Selected Mars Photo"
                  className="img-fluid rounded"
                />
              </div>
              <div className="modal-footer justify-content-center border-0">
                <button
                  className="btn btn-danger"
                  onClick={() => setSelectedImage(null)} // Close modal button
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
