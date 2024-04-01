import { FC } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OnDeleteHandlerPropType = (e: unknown, id?: any) => void;

interface TableItemProps {
  id?: string;
  firstName?: string;
  lastName?: string;
  attendanceStatus?: string;
  preferredEntree?: string;
  dietaryRestrictions?: string;
  createdAt?: string;
  isHeader?: boolean;
  isGuest?: boolean;
  onDelete?: OnDeleteHandlerPropType;
}

const TableItem: FC<TableItemProps> = (props) => {
  const {
    id,
    firstName,
    lastName,
    attendanceStatus,
    preferredEntree,
    dietaryRestrictions,
    createdAt,
    isHeader = false,
    isGuest = false,
  } = props;

  const getAttendanceStatus = (attendanceStatus) => {
    if (attendanceStatus === null || attendanceStatus === undefined) {
      return "";
    }

    return attendanceStatus ? (
      <span>Coming</span>
    ) : (
      <span className="text-danger">Not coming</span>
    );
  };

  if (isHeader) {
    return (
      <div className="table-item row fs-4">
        <div className="col">
          <p>
            <strong>Name</strong>
          </p>
        </div>
        <div className="col">
          <p>
            <strong>Attendance Status</strong>
          </p>
        </div>
        <div className="col">
          <p>
            <strong>Preferred Entree</strong>
          </p>
        </div>
        <div className="col">
          <p>
            <strong>Dietary Restrictions</strong>
          </p>
        </div>
        <div className="col-1">
          <p>
            <strong>Date Created</strong>
          </p>
        </div>
        <div className="col-1"></div>
      </div>
    );
  }

  return (
    <div className={`table-item row ${(isGuest && "bg-light-blue") || ""}`}>
      <div className="col">
        <p className={`${(isGuest && "ms-4") || ""}`}>
          {/* {isGuest && <span className="me-2">&middot;</span>} */}
          {(firstName && lastName && `${firstName} ${lastName}`) || ""}
        </p>
      </div>
      <div className="col">
        <p>{getAttendanceStatus(attendanceStatus)}</p>
      </div>
      <div className="col">
        <p>{preferredEntree || ""}</p>
      </div>
      <div className="col">
        <p>{dietaryRestrictions || ""}</p>
      </div>
      <div className="col-1">
        <p>{(createdAt && new Date(createdAt).toLocaleDateString()) || ""}</p>
      </div>
      <div className="col-1 d-flex justify-content-center align-items-center">
        {props?.onDelete && (
     
            <button
              type="button"
              className="btn btn-danger"
              onClick={(e) => {
                props?.onDelete?.(e, id);
              }}
            >
              Delete
            </button>
       
        )}
      </div>
    </div>
  );
};

export default TableItem;
