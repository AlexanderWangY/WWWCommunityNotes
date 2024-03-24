import React, { SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import "./component_styles/NormalComment.css";
import { createVote } from "../actions/createVote";
import { retrieveUser } from "../utilities/localstorage";

interface NormalCommentProps {
  username: string;
  content: string;
  url: string;
  index: string;
  reload: any;
}

const NormalComment: React.FC<NormalCommentProps> = ({
  username,
  content,
  url,
  index,
  reload,
}) => {
  const handleUpvote = async (url: string) => {
    const uid = retrieveUser().uid;
    await createVote(url, uid, username, 1);
    reload();
  };

  const handleDownvote = async (url: string) => {
    const uid = retrieveUser().uid;
    await createVote(url, uid, username, -1);
    reload();
  };

  return (
    <div className="comment_container">
      <div className="comment_inner_container">
        <div className="comment_header">
          <h4 className="comment_header_text">{index}</h4>
        </div>
        <p className="comment_content">{content}</p>
        <div className="comment_footer">
          <div className="comment_vote_container">
            <div className="comment_vote_inner_container">
              <p className="comment_vote_text">Rate this note</p>
              <FontAwesomeIcon
                onClick={() => handleUpvote(url)}
                icon={faThumbsUp}
                className="normalthumbsup"
              />
              <FontAwesomeIcon
                onClick={() => handleDownvote(url)}
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
