import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import "./component_styles/NormalComment.css";
import { createVote } from "../actions/createVote";

interface NormalCommentProps {
  username: string;
  content: string;
  url: string;
}

const handleUpvote = (url: string, username: string) => {
  createVote(url, username, 1)
}

const handleDownvote = (url: string, username: string) => {
  createVote(url, username, -1)
}

const NormalComment: React.FC<NormalCommentProps> = ({ username, content, url }) => {
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
              <FontAwesomeIcon onClick={() => handleUpvote(url, username)} icon={faThumbsUp} className="normalthumbsup" />
              <FontAwesomeIcon
                onClick={() => handleDownvote(url, username)}
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
