import styled from "styled-components";
import { Container } from "./NoiseItem";
const Border = styled.div`
  border: 1px white dashed;
  border-radius: 10px;
  width: 100%;
  height: 100%;
`;
function PlusMusic() {
  return (
    <>
      <Container>
        <Border></Border>
      </Container>
    </>
  );
}

export default PlusMusic;
