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
import { RenameChatPopup } from "./RenameChatPopup";
import { FiEdit2, FiSend, FiCopy, FiCheck } from "react-icons/fi";

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
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

const EditingBlock = styled.div`
  position: relative;
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
  const { auth, currentChat } = useContext(Context);

  const db = getFirestore();

  const [chatInfo, loading] = useDocumentData(doc(db, "chats", currentChat));

  const [value, setValue] = useState("");
  const [editPopupIsOpen, setEditPopupIsOpen] = useState(false);
  const [idIsCopied, setIdIsCopied] = useState(false);
  const [chatName, setChatName] = useState("");

  useEffect(() => {
    scrollBottom(Messages);
    setChatName(chatInfo?.name);

    return () => setIdIsCopied(false);
  }, [chatInfo]);

  const handleCopiIdClick = (id) => {
    navigator.clipboard.writeText(id);

    setIdIsCopied(true);
  };

  const handleSend = async (e) => {
    e.preventDefault();

    try {
      const chatRef = doc(db, "chats", currentChat);

      if (value.trim() !== "") {
        await updateDoc(chatRef, {
          messages: arrayUnion({
            id: uuidv4(),
            likes: [],
            message: value,
            senderId: auth.currentUser.uid,
          }),
        });

        setValue("");
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <Wrap>
      <ChatInfoWrap>
        <ChatInfo>
          <ChatId>
            Chat ID: {chatInfo?.id}{" "}
            {idIsCopied ? (
              <StyledCheckIcon />
            ) : (
              <StyledCopyIcon onClick={() => handleCopiIdClick(chatInfo?.id)} />
            )}
          </ChatId>
          <ChatName>
            <EditingBlock>
              <StyledEditIcon
                onClick={() => setEditPopupIsOpen(!editPopupIsOpen)}
              />
              <RenameChatPopup
                chatName={chatName}
                setChatName={setChatName}
                isShown={editPopupIsOpen}
                setIsShown={setEditPopupIsOpen}
                chatId={currentChat}
              />
            </EditingBlock>
            {chatInfo?.name}
          </ChatName>
        </ChatInfo>
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
