import { addDoc } from "firebase/firestore/lite";
import {
  useDocumentData,
  useDocument,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Context } from "../..";
import { v4 as uuidv4 } from "uuid";
import {
  getFirestore,
  collection,
  doc,
  arrayUnion,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { Message } from "./Message";
import { scrollBottom } from "../../utils/utils";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;

  width: 700px;
  max-height: 100%;
`;

const Messages = styled.div`
  display: flex;
  flex-direction: column;

  max-height: 100%;

  gap: 15px;
  padding: 15px 0;

  overflow: auto;
`;

export const Chat = ({ chatId }) => {
  const { auth } = useContext(Context);

  const [value, setValue] = useState("");

  const db = getFirestore();

  const [chatInfo, loading] = useDocumentData(doc(db, "chats", chatId));

  useEffect(() => {
    scrollBottom(Messages);
  }, [chatInfo]);

  const handleSend = async () => {
    try {
      const chatRef = doc(db, "chats", chatId);

      await updateDoc(chatRef, {
        messages: arrayUnion({
          id: uuidv4(),
          likes: [],
          message: value,
          senderId: auth.currentUser.uid,
        }),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <Wrap>
      <Messages>
        {chatInfo?.messages?.map((item) => (
          <Message
            key={item.id}
            currentUser={auth.currentUser.uid}
            likes={item.likes}
            senderId={item.senderId}
            text={item.message}
          >
            {item.message}
          </Message>
        ))}
      </Messages>
      <textarea onChange={(e) => setValue(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </Wrap>
  );
};
