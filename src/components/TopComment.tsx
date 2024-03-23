import React from "react";
import "./component_styles/TopComment.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";

interface TopCommentProps {
  username: string;
  content: string;
}

const TopComment: React.FC<TopCommentProps> = ({ username, content }) => {
  return (
    <div className="top_comment_container">
      <div className="top_comment_inner_container">
        <div className="top_comment_header">
          <FontAwesomeIcon
            icon={faBullhorn}
            style={{
              color: "#003b71",
              rotate: "-30deg",
              marginRight: ".3rem",
              height: "1rem",
              width: "1rem",
            }}
          />
          <h3 className="top_comment_header_text">
            Some readers wanted to add context to this website
          </h3>
        </div>
        <p className="top_comment_content">{content}</p>
        <div className="top_comment_footer">
          <div className="top_comment_vote_container">
            <div className="top_comment_vote_inner_container">
              <p className="top_comment_vote_text">Rate this note</p>
              <FontAwesomeIcon icon={faThumbsUp} className="thumbsup" />
              <FontAwesomeIcon icon={faThumbsDown} className="thumbsdown" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopComment;
