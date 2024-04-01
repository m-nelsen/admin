import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import TableItem from "../components/TableItem/default";

export default function Admin() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [jsonData, setJsonData] = useState<any>(null);

  useEffect(() => {
    async function fetchWeddingData() {
      await fetch(`${import.meta.env.VITE_API_BASE_ROUTE}/api/wedding/`)
        .then((response) => response.json())
        .then((data) => {
          setJsonData(data);
        });
    }

    fetchWeddingData();
  }, []);

  // Get a count of guests
  const getGuestCount = ({ jsonData, responseType }) => {
    let count = 0;

    if (!jsonData) {
      return 0;
    }

    jsonData.forEach((element) => {
      // Increment count if guest is attending
      if (responseType === "coming") {
        if (element.attendanceStatus) {
          if (element.guests) {
            count += element.guests.length;
          }

          count++;
        }
      } else {
        if (element.guests) {
          count += element.guests.length;
        }

        count++;
      }
    });

    return count;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDeleteHandler = (e: any, id: string) => {
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
      <nav className="navigation px-4 py-1">
        <Link to="/">Login</Link>
      </nav>

      <h1 className="fs-1 px-4 pt-2">Admin Dashboard</h1>

      <div className="card">
        <div className="card-body px-4">
          <h5 className="card-title fs-6 m-0 mb-2">
            Coming:&nbsp;
            <span>{getGuestCount({ jsonData, responseType: "coming" })}</span>
          </h5>
          <h5 className="card-title fs-6 m-0">
            Total Responses:&nbsp;
            <span>{getGuestCount({ jsonData, responseType: "" })}</span>
          </h5>
        </div>
      </div>

      <section className="card p-4">
        <TableItem isHeader={true} />
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
              createdAt,
            } = data;

            const guestMap = guests.map((guest, index) => {
              const {
                firstName,
                lastName,
                preferredEntree,
                dietaryRestrictions,
              } = guest;

              return (
                <Fragment key={`data-guest-${index}`}>
                  <TableItem
                    firstName={firstName}
                    lastName={lastName}
                    preferredEntree={preferredEntree}
                    dietaryRestrictions={dietaryRestrictions}
                    isGuest={true}
                  />
                </Fragment>
              );
            });

            return (
              <Fragment key={`data-${index}`}>
                <TableItem
                  id={id}
                  firstName={firstName}
                  lastName={lastName}
                  attendanceStatus={attendanceStatus}
                  preferredEntree={preferredEntree}
                  dietaryRestrictions={dietaryRestrictions}
                  createdAt={createdAt}
                  onDelete={onDeleteHandler}
                />
                {...guestMap}
              </Fragment>
            );
          })}
      </section>
    </div>
  );
}
