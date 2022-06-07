import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useContext, useState } from "react";
import styled from "styled-components";
import { Context } from "../../App";
import { Button } from "../Reuseble/Button";
import { Input } from "../Reuseble/Input";
import { Popup } from "../Reuseble/Popup";

const Wrap = styled.div``;

const SubscribeWrap = styled.div`
  display: flex;

  gap: 10px;
  margin-bottom: 20px;
`;

export const AddChatPopup = ({ isShown, setIsShown }) => {
  const [chatId, setChatId] = useState("");

  const { auth } = useContext(Context);
  const db = getFirestore();

  const handleCreateChatClick = async () => {
    const chatRef = await addDoc(collection(db, "chats"), {
      messages: [],
      users: [auth.currentUser.uid],
    });

    await setDoc(
      chatRef,
      { id: chatRef.id, name: chatRef.id },
      { merge: true }
    );
  };

  const handleSubscribeChatClick = async () => {
    try {
      const chatRef = doc(db, "chats", chatId);

      await updateDoc(chatRef, {
        users: arrayUnion(auth.currentUser.uid),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <Popup isShown={isShown}>
      <Wrap>
        <SubscribeWrap>
          <Input
            value={chatId}
            setValue={setChatId}
            placeholder="Chat ID"
            w="200px"
          />
          <Button w="50px" h="50px" p="0" onClick={handleSubscribeChatClick}>
            +
          </Button>
        </SubscribeWrap>
        <Button w="100%" onClick={handleCreateChatClick}>
          Create new chat
        </Button>
      </Wrap>
    </Popup>
  );
};
