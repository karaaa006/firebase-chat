import { signOut } from "firebase/auth";
import { collection, getFirestore, query, where } from "firebase/firestore";
import { useContext, useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { Context } from "../../App";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { Button } from "../Reuseble/Button";
import { AddChatPopup } from "./AddChatPopup";
import { ChatList } from "./ChatList";

const StyledSideBar = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  height: 100%;

  background-color: #f0f0f3;

  transition: transform ease 250ms, box-shadow ease 250ms;

  @media only screen and (max-width: 768px) {
    position: absolute;
    left: 0;
    top: 0;
    transform: ${({ isOpen }) =>
      isOpen ? "translateX(0%)" : "translateX(-100%)"};

    padding: 25px;
    z-index: 1;

    box-shadow: ${({ isOpen }) =>
      isOpen ? "2px 0 10px rgba(0, 0, 0, 0.1)" : "none"};
  } ;
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
  const sideBarRef = useRef(null);

  const [popupIsShown, setPopupIsShown] = useState(false);

  const db = getFirestore();

  const { auth, setCurrentChat, mobileMenuIsOpen, setMobileMenuIsOpen } =
    useContext(Context);

  useOnClickOutside(sideBarRef, () => setMobileMenuIsOpen(false));

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

  const handleAddChat = () => {
    setPopupIsShown(!popupIsShown);
  };
  return (
    <StyledSideBar isOpen={mobileMenuIsOpen} ref={sideBarRef}>
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
