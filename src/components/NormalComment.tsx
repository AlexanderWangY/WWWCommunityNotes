import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import "./component_styles/NormalComment.css";

interface NormalCommentProps {
  username: string;
  content: string;
}

const NormalComment: React.FC<NormalCommentProps> = ({ username, content }) => {
  return (
    <div className="comment_container">
      <div className="comment_inner_container">
        <div className="comment_header">
          <h4 className="comment_header_text">{username}</h4>
        </div>
        <p className="comment_content">{content}</p>
        <div className="comment_footer">
          <div className="comment_vote_container">
            <div className="comment_vote_inner_container">
              <p className="comment_vote_text">Rate this note</p>
              <FontAwesomeIcon icon={faThumbsUp} className="normalthumbsup" />
              <FontAwesomeIcon
                icon={faThumbsDown}
                className="normalthumbsdown"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NormalComment;
