import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Context } from "../../App";
import {
  getFirestore,
  doc,
  collection,
  addDoc,
  setDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { Message } from "./Message";
import { scrollBottom } from "../../utils/utils";
import { Input } from "../Reuseble/Input";
import { Button } from "../Reuseble/Button";
import { RenameChatPopup } from "./RenameChatPopup";
import {
  FiEdit2,
  FiSend,
  FiCopy,
  FiCheck,
  FiAlignJustify,
} from "react-icons/fi";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  max-height: 100%;
`;

const ChatInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;

  height: 100%;
`;

const StyledEditIcon = styled(FiEdit2)`
  margin-right: 5px;

  opacity: 0;

  cursor: pointer;

  transition: opacity 250ms ease;
`;

const StyledCopyIcon = styled(FiCopy)`
  margin-left: 5px;

  opacity: 0;

  cursor: pointer;

  transition: opacity 250ms ease;
`;

const StyledCheckIcon = styled(FiCheck)`
  margin-left: 5px;

  opacity: 0;

  color: #3c7571;

  transition: opacity 250ms ease;
`;

const StyledMenuIcon = styled(FiAlignJustify)`
  display: none;

  width: 25px;
  height: 25px;

  :hover,
  :focus {
    stroke: #fb7575;
  }

  @media only screen and (max-width: 768px) {
    display: block;
  } ;
`;

const ChatInfo = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 20px;
  gap: 15px;

  :hover {
    ${StyledEditIcon}, ${StyledCopyIcon}, ${StyledCheckIcon} {
      opacity: 1;
    }
  }
`;

const ChatId = styled.div`
  display: flex;
  align-items: center;

  white-space: nowrap;
`;

const ChatName = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  white-space: nowrap;

  @media only screen and (max-width: 960px) {
    display: none;
  } ;
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

const StyledFiSend = styled(FiSend)`
  width: 20px;
  height: 20px;
`;

export const Chat = () => {
  const { auth, currentChat, setMobileMenuIsOpen } = useContext(Context);

  const db = getFirestore();

  const [chatInfo, loading] = useDocumentData(doc(db, "chats", currentChat));

  const q = query(
    collection(db, `chats/${currentChat}`, "messages"),
    orderBy("timestamp")
  );

  const [messageList, loadingMessageList] = useCollectionData(q);

  const [value, setValue] = useState("");
  const [editPopupIsOpen, setEditPopupIsOpen] = useState(false);
  const [idIsCopied, setIdIsCopied] = useState(false);
  const [chatName, setChatName] = useState("");

  useEffect(() => {
    scrollBottom(Messages);
    setChatName(chatInfo?.name);

    return () => setIdIsCopied(false);
  }, [chatInfo]);

  const handleCopyIdClick = (id) => {
    navigator.clipboard.writeText(id);

    setIdIsCopied(true);
  };

  const handleSend = async (e) => {
    e.preventDefault();

    try {
      if (value.trim() !== "") {
        const docRef = await addDoc(
          collection(db, `chats/${currentChat}`, "messages"),
          {
            likes: [],
            message: value,
            senderId: auth.currentUser.uid,
            type: "text",
            timestamp: serverTimestamp(),
          }
        );

        await setDoc(docRef, { id: docRef.id }, { merge: true });

        setValue("");
      }
    } catch (e) {
      console.error("Error: ", e);
    }
  };

  return (
    <Wrap>
      <ChatInfoWrap>
        <ChatInfo>
          <StyledMenuIcon
            onClick={() => {
              setMobileMenuIsOpen(true);
            }}
          />
          <ChatId>
            Chat ID: {chatInfo?.id}{" "}
            {idIsCopied ? (
              <StyledCheckIcon />
            ) : (
              <StyledCopyIcon onClick={() => handleCopyIdClick(chatInfo?.id)} />
            )}
          </ChatId>
          <ChatName>
            <StyledEditIcon
              onClick={() => setEditPopupIsOpen(!editPopupIsOpen)}
            />
            {chatInfo?.name}
            <RenameChatPopup
              chatName={chatName}
              setChatName={setChatName}
              isShown={editPopupIsOpen}
              setIsShown={setEditPopupIsOpen}
              chatId={currentChat}
            />
          </ChatName>
        </ChatInfo>
        <Messages>
          {messageList?.map((item) => (
            <Message
              key={item.id}
              currentUser={auth.currentUser.uid}
              likes={item.likes}
              senderId={item.senderId}
              text={item.message}
              type={item.type}
              id={item.id}
            >
              {item.message}
            </Message>
          ))}
        </Messages>
      </ChatInfoWrap>
      <Form onSubmit={handleSend}>
        <Input
          value={value}
          setValue={setValue}
          placeholder="Your message"
          w="100%"
        />
        <Button type="submit">
          <StyledFiSend />
        </Button>
      </Form>
    </Wrap>
  );
};
