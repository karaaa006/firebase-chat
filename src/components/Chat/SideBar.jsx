import { signOut } from "firebase/auth";
import { collection, getFirestore, query, where } from "firebase/firestore";
import { useContext, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { Context } from "../../App";
import { Button } from "../Reuseble/Button";
import { Popup } from "../Reuseble/Popup";
import { AddChatPopup } from "./AddChatPopup";
import { ChatList } from "./ChatList";

const StyledSideBar = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const BottomWrap = styled.div``;
const UserInfo = styled.div`
  display: flex;
  align-items: center;

  gap: 10px;
  margin-bottom: 15px;
`;

const UserPhoto = styled.img`
  width: 40px;
  height: 40px;

  border-radius: 50px;
`;

const ButtonList = styled.div`
  display: flex;
  justify-content: space-between;

  gap: 10px;
`;

const PopupWrap = styled.div`
  position: relative;
`;

export const SideBar = () => {
  const [popupIsShown, setPopupIsShown] = useState(false);

  const db = getFirestore();

  const { auth, setCurrentChat } = useContext(Context);

  const chatsRef = collection(db, "chats");

  const q = query(
    chatsRef,
    where("users", "array-contains", auth.currentUser.uid)
  );

  const [chatList, loading] = useCollectionData(q);

  const handleLogout = () => {
    signOut(auth);
    setCurrentChat("");
  };
  console.log(auth);

  const handleAddChat = () => {
    setPopupIsShown(!popupIsShown);
  };
  return (
    <StyledSideBar>
      <ChatList chatList={chatList} />
      <BottomWrap>
        <UserInfo>
          <UserPhoto src={auth?.currentUser?.photoURL} />
          {auth?.currentUser?.displayName}
        </UserInfo>
        <ButtonList>
          <Button onClick={handleLogout}>Logout</Button>
          <PopupWrap>
            <AddChatPopup isShown={popupIsShown} setIsShown={setPopupIsShown} />
            <Button onClick={handleAddChat}>Add chat</Button>
          </PopupWrap>
        </ButtonList>
      </BottomWrap>
    </StyledSideBar>
  );
};
