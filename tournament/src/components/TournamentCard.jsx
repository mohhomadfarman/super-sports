import React from "react";
import './cards.scss';
import { FaLocationDot } from "react-icons/fa6";

function TournamentCard({image,name,citie,startDate}) {
  return (
    <div class="games">
      <div class="banner_wrapper"  >
        <div className="lable">Started at: {startDate}</div>
        <div class="banner">
          <img
            src={image}
            alt={name}
            class="banner__image"
          />
        </div>
        <div class="card__wrapper w-100">
          <div class="card d-flex w-100 flex-row align-items-start">
            <div class="card__info">
              <div>
                <span>{name}</span>
                <p><FaLocationDot size={12} color="#ff0000" /> {citie}</p>
              </div>
            </div>
            <button className="border-0">JOIN</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TournamentCard;
