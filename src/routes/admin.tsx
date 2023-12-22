import { useState, useEffect, Fragment } from "react";

export default function Admin() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [jsonData, setJsonData] = useState<any>(null);

  useEffect(() => {
    async function fetchWeddingData() {
      await fetch(`${import.meta.env.VITE_API_BASE_ROUTE}/api/wedding/`)
        .then((response) => response.json())
        .then((data) => {
          console.log("jsonData: ", data);
          setJsonData(data);
        });
    }

    fetchWeddingData();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDelete = (e: any, id: string) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_API_BASE_ROUTE}/api/wedding/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.success ? "Deleted!" : "Error: Cannot delete.");
      })
      .catch((err) => {
        console.log("ERROR: ", err);
      });
  };

  return (
    <div className="w-100">
      <h1 className="fs-1">Admin</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Attendance Status</th>
            <th scope="col">Preferred Entree</th>
            <th scope="col">Dietary Restrictions</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {jsonData &&
            jsonData.map((data, index) => {
              const {
                _id: id,
                firstName,
                lastName,
                attendanceStatus,
                preferredEntree,
                dietaryRestrictions,
                guests = [],
              } = data;

              const obj = guests.map((guest, index) => {
                const {
                  firstName,
                  lastName,
                  preferredEntree,
                  dietaryRestrictions,
                } = guest;

                return (
                  <tr key={`data-guest-${index}`} className="table-info">
                    <th scope="row">{index + 1}</th>
                    <td>{`${firstName} ${lastName}`}</td>
                    <td>Guest</td>
                    <td>{preferredEntree}</td>
                    <td>{dietaryRestrictions}</td>
                    <td></td>
                  </tr>
                );
              });

              return (
                <Fragment key={`data-${index}`}>
                  <tr className="bg-light">
                    <th scope="row">{index + 1}</th>
                    <td>{`${firstName} ${lastName}`}</td>
                    <td>{attendanceStatus ? "Coming" : "Not comming"}</td>
                    <td>{preferredEntree}</td>
                    <td>{dietaryRestrictions}</td>
                    <td>
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={(e) => {
                            onDelete(e, id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                  {...obj}
                </Fragment>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
