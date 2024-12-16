import { useEffect, useState } from "react";

export function NasaComponent() {
    const [mars, setMars] = useState({ photos: [] });

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
                            <th className="fs-5  text-success" scope="col">Photo Id</th>
                            <th className="fs-5  text-success" scope="col">Preview</th>
                            <th className="fs-5  text-success" scope="col">Camera Name</th>
                            <th className="fs-5  text-success" scope="col">Rover Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mars.photos.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>
                                    <div className="card" style={{ width: "12rem" }}>
                                        <img
                                            className="card-img-top"
                                            src={item.img_src}
                                            alt="nasa from mars"
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
        </div>
    );
}
