import { doc, getFirestore } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { FiHeart } from "react-icons/fi";

const Wrap = styled.div`
  align-self: ${({ currentUser }) => (currentUser ? "end" : "start")};
  max-width: 60%;
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
  padding: 15px 25px;
  border-radius: ${({ currentUser }) =>
    currentUser ? "50px 15px 50px  50px" : "15px 50px 50px 50px"};

  color: #fb7575;
  background-color: #f0f0f3;
  box-shadow: 2px 2px 7px 0px #aeaec066, -2px -2px 7px 0px #ffffff;
`;

const LikesCounter = styled.div`
  position: absolute;
`;

export const Message = ({ text, senderId, currentUser, likes }) => {
  const [senderInfo, loading] = useDocumentData(
    doc(getFirestore(), "users", senderId)
  );

  const likes1 = ["dsfdsf", "sdfdsfewf"];

  return (
    <Wrap currentUser={senderId === currentUser}>
      <Sender currentUser={senderId === currentUser}>
        {senderInfo?.photo && (
          <Photo src={senderInfo?.photo} alt={senderInfo?.name} />
        )}
        <Name>{senderInfo?.name}</Name>
      </Sender>
      <MessageWrap currentUser={senderId === currentUser}>
        <StyledHeartIcon />
        <StyledMessage currentUser={senderId === currentUser}>
          {text}
        </StyledMessage>

        {/* <LikesCounter>{likes1.length}</LikesCounter> */}
      </MessageWrap>
    </Wrap>
  );
};
