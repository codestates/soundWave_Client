import { useEffect } from "react";
import styled from "styled-components";
import { getRecommends } from "../../api";
const Container = styled.div`
  border: 1px solid white;
  position: relative;
`;
const Header = styled.div`
  position: relative;
  padding: 10px 10px 0 10px;
  display: flex;
  justify-content: space-between;
`;
const Title = styled.div`
  color: white;
`;
function Recommend() {
  useEffect(() => {
    (async () => {
      await getRecommends();
    })();
  }, []);
  return (
    <Container>
      <Header>
        <Title>이런 소리는 어떠신가요?</Title>
      </Header>
    </Container>
  );
}
export default Recommend;
