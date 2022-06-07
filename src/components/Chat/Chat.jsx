import { useDocumentData } from "react-firebase-hooks/firestore";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Context } from "../../App";
import { v4 as uuidv4 } from "uuid";
import { getFirestore, doc, arrayUnion, updateDoc } from "firebase/firestore";
import { Message } from "./Message";
import { scrollBottom } from "../../utils/utils";
import { Input } from "../Reuseble/Input";
import { Button } from "../Reuseble/Button";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 700px;
  max-height: 100%;
`;

const ChatInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ChatInfo = styled.div`
  display: flex;
  justify-content: end;

  padding-bottom: 20px;
`;

const Messages = styled.div`
  display: flex;
  flex-direction: column;

  max-height: 100%;

  gap: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  margin-bottom: 15px;

  overflow: auto;
`;

const Form = styled.form`
  display: flex;
  gap: 15px;
`;

export const Chat = () => {
  const { auth, currentChat } = useContext(Context);

  const [value, setValue] = useState("");

  const db = getFirestore();

  const [chatInfo, loading] = useDocumentData(doc(db, "chats", currentChat));

  useEffect(() => {
    scrollBottom(Messages);
  }, [chatInfo]);

  const handleSend = async () => {
    try {
      const chatRef = doc(db, "chats", currentChat);

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
      <ChatInfoWrap>
        <ChatInfo>Chat ID: {currentChat}</ChatInfo>
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
      </ChatInfoWrap>
      <Form>
        <Input
          value={value}
          setValue={setValue}
          placeholder="Your message"
          w="100%"
        />
        <Button onClick={handleSend}>Send</Button>
      </Form>
    </Wrap>
  );
};
