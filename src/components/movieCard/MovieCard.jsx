import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./style.scss";
import Img from "../lazyLoadImage/Img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import PosterFallback from "../../assets/no-poster.png";

const MovieCard = ({ data, fromSearch, mediaType }) => {
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();

    const posterUrl = data.poster_path
        ? url.poster + data.poster_path
        : PosterFallback;

    // 🔽 New function for handling download button
    const handleDownload = (title) => {
        const botUsername = "RK_Filter_Bot"; // <-- Replace this with your bot username (without @)
        const formattedTitle = title.replace(/\s+/g, "_");
        const telegramLink = `https://t.me/${botUsername}?start=${formattedTitle}`;
        window.open(telegramLink, "_blank");
    };

    return (
        <div
            className="movieCard"
            onClick={() =>
                navigate(`/${data.media_type || mediaType}/${data.id}`)
            }
        >
            <div className="posterBlock">
                <Img className="posterImg" src={posterUrl} />
                {!fromSearch && (
                    <React.Fragment>
                        <CircleRating rating={data.vote_average.toFixed(1)} />
                        <Genres data={data.genre_ids.slice(0, 2)} />
                    </React.Fragment>
                )}
            </div>
            <div className="textBlock">
                <span className="title">{data.title || data.name}</span>
                <span className="date">
                    {dayjs(data.release_date).format("MMM D, YYYY")}
                </span>

                {/* 🔽 New Download Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // prevents card click navigation
                        handleDownload(data.title || data.name);
                    }}
                    style={{
                        marginTop: "10px",
                        padding: "6px 12px",
                        background: "#ff3c3c",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                    }}
                >
                    Download
                </button>
            </div>
        </div>
    );
};

export default MovieCard;
