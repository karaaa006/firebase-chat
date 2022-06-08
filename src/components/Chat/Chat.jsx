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
import { IconButton } from "../Reuseble/IconButton";
import { EditIcon } from "../Reuseble/svgs/EditIcon";
import { RenameChatPopup } from "./RenameChatPopup";

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

const StyledEditIcon = styled(EditIcon)`
  margin-right: 5px;

  opacity: 0;

  cursor: pointer;

  transition: opacity 250ms ease;
`;

const ChatInfo = styled.div`
  display: flex;
  justify-content: end;

  padding-bottom: 20px;

  :hover {
    ${StyledEditIcon} {
      opacity: 1;
    }
  }
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

export const Chat = () => {
  const { auth, currentChat } = useContext(Context);

  const db = getFirestore();

  const [chatInfo, loading] = useDocumentData(doc(db, "chats", currentChat));

  const [value, setValue] = useState("");
  const [editPopupIsOpen, setEditPopupIsOpen] = useState(false);
  const [chatName, setChatName] = useState("");

  useEffect(() => {
    scrollBottom(Messages);
    setChatName(chatInfo?.name);
  }, [chatInfo]);

  const handleSend = async (e) => {
    e.preventDefault();

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

      setValue("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <Wrap>
      <ChatInfoWrap>
        <ChatInfo>
          <EditingBlock>
            <StyledEditIcon
              width="20px"
              height="20px"
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
        <Button type="submit">Send</Button>
      </Form>
    </Wrap>
  );
};
