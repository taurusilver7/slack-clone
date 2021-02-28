import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";

const Message = ({ message, timestamp, user, userImg }) => {
  return (
    <MessageContainer>
      <img src={userImg} alt="user" />
      <MessageInfo>
        <h4>
          {user} <span>{new Date(timestamp?.toDate()).toUTCString()}</span>
        </h4>
        <p>{message}</p>
      </MessageInfo>
    </MessageContainer>
  );
};

export default Message;

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;

  > img {
    height: 50px;
    border-radius: 8px;
  }

  @media (max-width: 425px) {
    > img {
      height: 30px;
    }
  }
`;

const MessageInfo = styled.div`
  padding-left: 10px;

  > h4 > span {
    color: gray;
    font-weight: 200;
    margin-left: 4px;
    font-size: 10px;
  }
`;
