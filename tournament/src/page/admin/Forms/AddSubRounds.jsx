import React, { useState, useCallback, useMemo } from "react";
import ModalForm from "./ModalForm";
import RoundsFrom from "./RoundsFrom";
import { getUserId } from "../../../utils_sec/auth";
import { LiaEyeSolid } from "react-icons/lia";
import AddParticipantSubRounds from "./AddParticipantSubRounds";

const AddSubRounds = ({ subRound, id, NoFoundMsg }) => {
  const [show, setShow] = useState(false);
  const [showTwo, setShowTwo] = useState(false);
  const [winnersData, setWinnersData] = useState(false);
  const userid = useMemo(() => getUserId()?.id, []);
  const handleShowAdd = (item) => {
    setShowTwo(true);
    setWinnersData(item);
  };

  const handleCloseAdd = useCallback(() => {
    setShowTwo(false);
  }, []);

  const handleShow = useCallback(() => setShow(true), []);
  const handleClose = useCallback(() => {
    setShow(false);
  }, []);

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
              {userid &&  <div className="d-flex gap-3">
                <button onClick={() => handleShowAdd(item?._id)} className="border-0 rounded align-items-center d-flex gap-2">
                  <LiaEyeSolid size={18}/> Winner Lists
                </button>
              </div>}
             
            </div>
          </div>
        ))}
        <div className="d-flex align-items-center justify-content-center flex-column">
          {NoFoundMsg && <h4>{NoFoundMsg}</h4>}

          {getUserId()?.userRole === "admin" ? (
            <button onClick={handleShow} className="btn btn-success">
              Add Sub-Rounds
            </button>
          ) : null}
        </div>
        <ModalForm
          title={"Add Rounds"}
          handleClose={handleClose}
          show={show}
          component={
            <RoundsFrom id={id} type={"subRound"} handleClose={handleClose} />
          }
        />
        <ModalForm
          title={`Winners of `}
          handleClose={handleCloseAdd}
          show={showTwo}
          component={<AddParticipantSubRounds winners={winnersData} />}
        />
      </div>
    </div>
  );
};

export default AddSubRounds;
