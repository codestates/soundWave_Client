import { FaWindowClose } from "react-icons/fa";
import { MouseEvent, useCallback, useEffect } from "react";
import styled from "styled-components";
import SearchForm from "./SearchForm";
import { useHistory } from "react-router-dom";
const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  cursor: pointer;
  color: red;
  &:hover {
    color: white;
  }
  transition: all 0.5s;
`;

function SearchModal() {
  const history = useHistory();

  const closeModal = useCallback(
    function (e: MouseEvent | KeyboardEvent) {
      if (
        (e instanceof KeyboardEvent && e.key === "Escape") ||
        e.type === "click"
      ) {
        history.push("/");
      }
    },
    [history]
  );
  useEffect(() => {
    window.addEventListener("keydown", closeModal);
    return () => {
      window.removeEventListener("keydown", closeModal);
    };
  }, [closeModal]);

  return (
    <>
      <Container>
        <CloseButton onClick={closeModal}>
          <FaWindowClose size="40" />
        </CloseButton>
        <SearchForm />
      </Container>
    </>
  );
}
export default SearchModal;
