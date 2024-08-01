import React from "react";
import './cards.scss';
import { FaLocationDot } from "react-icons/fa6";

function TournamentCard({ image, name, citie, startDate, joinBtn, joined }) {
  return (
    <div className="games">
      <div className="banner_wrapper">
        <div className="label">Started at: {startDate}</div>
        <div className="banner">
          <img
            src={image}
            alt={name}
            className="banner__image"
          />
        </div>
        <div className="card__wrapper w-100">
          <div className="card d-flex w-100 flex-row align-items-start">
            <div className="card__info">
              <div>
                <span>{name}</span>
                <p>
                  <FaLocationDot size={12} color="#ff0000" /> {citie}
                </p>
              </div>
            </div>
            <button
              onClick={joinBtn}
              disabled={joined}
              className={`border-0 ${joined ? "btn btn-secondary" : ""}`}
              aria-label={joined ? "Already joined" : "Join contest"}
            >
              {joined ? "JOINED" : "JOIN"}
              {console.log(joined)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TournamentCard;
