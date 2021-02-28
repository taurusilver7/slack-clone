import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Message from "./Message";

import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

import { selectRoomId } from "../features/appSlice";
import { useSelector } from "react-redux";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../firebase";

const Chat = () => {
  const roomId = useSelector(selectRoomId);
  const chatRef = useRef(null);
  const [roomDetails] = useDocument(
    roomId && db.collection("rooms").doc(roomId)
  );

  const [roomMsg, loading] = useCollection(
    roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [roomId, loading]);

  return (
    <ChatContainer>
      {roomDetails && roomMsg && (
        <>
          <Header>
            <HeaderLeft>
              <h4>
                <strong>#{roomDetails?.data()?.name}</strong>
              </h4>
              <StarBorderOutlinedIcon />
            </HeaderLeft>

            <HeaderRight>
              <p>
                <InfoOutlinedIcon /> Details
              </p>
            </HeaderRight>
          </Header>

          <ChatMessages>
            {roomMsg?.docs.map((doc) => {
              const { message, timestamp, user, userImg } = doc.data();

              return (
                <Message
                  key={doc.id}
                  message={message}
                  user={user}
                  userImg={userImg}
                  timestamp={timestamp}
                />
              );
            })}
            <ChatBottom ref={chatRef} />
          </ChatMessages>

          <ChatInput
            chatRef={chatRef}
            channelId={roomId}
            channelName={roomDetails?.data().name}
          />
        </>
      )}
    </ChatContainer>
  );
};

export default Chat;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }

  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }

  @media (max-width: 425px) {
    > h4 {
      font-size: 12px;
    }
    > h4 > .MuiSvgIcon-root {
      font-size: x-small;
    }
  }
`;

const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  @media (max-width: 425px) {
    > p {
      font-size: 10px;
    }
    > .MuiSvgIcon-root {
      font-size: x-small;
    }
  }
`;

const ChatMessages = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 80px;
`;

const ChatBottom = styled.div`
  padding-bottom: 40px;
`;
