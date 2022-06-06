import { doc, getFirestore } from "firebase/firestore";
import {
  useDocumentData,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore";
import styled from "styled-components";

const Wrap = styled.div`
  max-width: 60%;
  align-self: ${({ currentUser }) => (currentUser ? "end" : "start")};
`;

const Sender = styled.div`
  display: flex;
  flex-direction: ${({ currentUser }) =>
    currentUser ? "row-reverse" : "unset"};

  gap: 10px;

  padding: 10px;
`;

const Photo = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 100%;
`;

const Name = styled.div``;
const Email = styled.div``;

const StyledMessage = styled.div`
  padding: 15px 25px;
  border-radius: ${({ currentUser }) =>
    currentUser ? "50px 50px 15px 50px" : "15px 50px 50px 50px"};

  background-color: #fff;
`;

export const Message = ({ text, senderId, currentUser, likes }) => {
  const [senderInfo, loading] = useDocumentData(
    doc(getFirestore(), "users", senderId)
  );

  return (
    <Wrap currentUser={senderId === currentUser}>
      <Sender currentUser={senderId === currentUser}>
        {senderInfo?.photo && (
          <Photo src={senderInfo?.photo} alt={senderInfo?.name} />
        )}
        <Name>{senderInfo?.name}</Name>
        <Email>{senderInfo?.email}</Email>
      </Sender>
      <StyledMessage currentUser={senderId === currentUser}>
        {text}
      </StyledMessage>
    </Wrap>
  );
};
