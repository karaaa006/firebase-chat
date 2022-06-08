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
`;

export const RenameChatPopup = ({ isShown, setIsShown, chatId }) => {
  const [chatName, setChatName] = useState("");

  const db = getFirestore();

  const handleNameChangeClick = async () => {
    try {
      const chatRef = doc(db, "chats", chatId);

      setDoc(chatRef, { name: chatName }, { merge: true });

      setChatName("");
    } catch (e) {
      console.error("Error: ", e);
    }
  };

  return (
    <Popup isShown={isShown} setIsShown={setIsShown} pos="bottom">
      <Wrap>
        <SubscribeWrap>
          <Input
            value={chatName}
            setValue={setChatName}
            placeholder="Chat name"
            w="200px"
          />
          <Button w="50px" h="50px" p="0" onClick={handleNameChangeClick}>
            OK
          </Button>
        </SubscribeWrap>
      </Wrap>
    </Popup>
  );
};
