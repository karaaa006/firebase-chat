import { arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { FiHeart } from "react-icons/fi";
import { Context } from "../../App";
import { useContext } from "react";

const Wrap = styled.div`
  align-self: ${({ currentUser }) => (currentUser ? "end" : "start")};
  max-width: 70%;

  @media only screen and (max-width: 960px) {
    max-width: 85%;
  }

  @media only screen and (max-width: 768px) {
    max-width: 95%;
  } ;
`;

const Sender = styled.div`
  display: flex;
  flex-direction: ${({ currentUser }) =>
    currentUser ? "row-reverse" : "unset"};
  align-items: center;

  gap: 10px;
  padding: 10px;

  font-size: 12px;
`;

const Photo = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 100%;
`;

const Name = styled.div``;

const StyledHeartIcon = styled(FiHeart)`
  width: 20px;
  height: 20px;
  min-width: fit-content;

  opacity: 0;

  cursor: pointer;

  transition: opacity 250ms ease;
`;

const MessageWrap = styled.div`
  position: relative;

  display: flex;
  flex-direction: ${({ currentUser }) =>
    currentUser ? "unset" : "row-reverse"};
  justify-content: ${({ currentUser }) => (currentUser ? "end" : "start")};
  align-items: center;

  width: 100%;

  gap: 10px;

  :hover {
    ${StyledHeartIcon} {
      opacity: 1;
    }
  }
`;

const StyledMessage = styled.div`
  position: relative;

  width: 100%;

  padding: 15px 25px;
  border-radius: ${({ currentUser }) =>
    currentUser ? "50px 15px 50px  50px" : "15px 50px 50px 50px"};

  color: #fb7575;
  background-color: #f0f0f3;
  box-shadow: 2px 2px 7px 0px #aeaec066, -2px -2px 7px 0px #ffffff;

  word-wrap: break-word;
`;

const LikesCounter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 50px;
  min-width: 50px;
  height: 25px;

  background-color: #fb7575;
  color: #ffffff;
  border-radius: 50px;

  line-height: 0.5;
`;

export const Message = ({ id, text, senderId, currentUser, likes }) => {
  const { auth, currentChat } = useContext(Context);

  const [senderInfo, loading] = useDocumentData(
    doc(getFirestore(), "users", senderId)
  );

  const handleLikeClick = async () => {
    try {
      const messageRef = doc(
        getFirestore(),
        `chats/${currentChat}/messages`,
        id
      );

      if (likes.includes(currentUser)) {
        const updatedLikeList = likes.filter((item) => item !== currentUser);

        await updateDoc(messageRef, {
          likes: updatedLikeList,
        });
      } else {
        await updateDoc(messageRef, {
          likes: arrayUnion(auth.currentUser.uid),
        });
      }
    } catch (e) {
      console.error("Error: ", e);
    }
  };

  return (
    <Wrap currentUser={senderId === currentUser}>
      <Sender currentUser={senderId === currentUser}>
        {senderInfo?.photo && (
          <Photo src={senderInfo?.photo} alt={senderInfo?.name} />
        )}
        <Name>{senderInfo?.name}</Name>
      </Sender>
      <MessageWrap currentUser={senderId === currentUser}>
        <StyledHeartIcon
          fill={likes.includes(currentUser) ? "#fb7575" : "none"}
          stroke="#fb7575"
          onClick={handleLikeClick}
        />
        {!!likes?.length && (
          <LikesCounter currentUser={senderId === currentUser}>
            {likes?.length}
          </LikesCounter>
        )}
        <StyledMessage currentUser={senderId === currentUser}>
          {text}
        </StyledMessage>
      </MessageWrap>
    </Wrap>
  );
};
