import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import ModalForm from "./ModalForm";
import RoundsFrom from "./RoundsFrom";
import { getUserId } from "../../../utils_sec/auth";
import { FaPlus } from "react-icons/fa6";
import { LiaEyeSolid } from "react-icons/lia";
const AddSubRounds = ({ subRound, id, NoFoundMsg }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleShow = useCallback(() => setShow(true), []);
  const handleClose = useCallback(() => {
    setShow(false);
    // dispatch(getContestRounds(id)); // Uncomment if needed to refetch data
  }, [dispatch, id]);

  return (
    <div className="container">
      <div className="row">
        {subRound?.map((item, key) => (
          <div
            key={item?._id}
            className={`col-md-12 border p-3 bg-light mb-3 `}
          >
            <div className="d-flex gap-3 align-items-center justify-content-between">
              <div className="d-flex gap-3 align-items-center">
                <span
                  className={`bg-secondary text-white px-3 py-1 rounded-5 `}
                >
                  {key + 1}
                </span>
                <span>{item?.name}</span>
              </div>
              <div className="d-flex gap-3">
                <button className="border-0 rounded align-items-center d-flex gap-2"> <FaPlus size={18} /> Add Participants</button>
                <button className="border-0 rounded align-items-center d-flex gap-2"> <LiaEyeSolid size={18}/> Participants Lists</button>
              </div>
            </div>
          </div>
        ))}
        <div className="d-flex align-items-center justify-content-center flex-column">
          {NoFoundMsg && <h4>{NoFoundMsg}</h4>}

          {getUserId()?.userRole === "admin" ? (
            <button onClick={handleShow} className="btn btn-success">
              Add Sub-Rounds
            </button>
          ) : (
            ""
          )}
        </div>
        <ModalForm
          title={"Add Rounds"}
          handleClose={handleClose}
          show={show}
          component={
            <RoundsFrom id={id} type={"subRound"} handleClose={handleClose} />
          }
        />
      </div>
    </div>
  );
};

export default AddSubRounds;
