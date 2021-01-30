import { useEffect, useState } from "react";
import styled from "styled-components";
import { getRecommends, RecommendRes } from "../../api";
import RecommendItem from "./RecommendItem";
const Container = styled.div``;
const Header = styled.div`
  padding: 10px 10px 0 10px;
  display: flex;
  justify-content: space-between;
`;
const Title = styled.div`
  color: white;
`;
const RecommendContainer = styled.div`
  /* border: 1px solid white; */
  margin-top: 10px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  height: 20vh;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &:hover {
    &::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 20px;
    }
  }
`;
function Recommend() {
  const [recommendList, setRecomendList] = useState([] as RecommendRes[]);
  useEffect(() => {
    (async () => {
      const data = await getRecommends();
      setRecomendList(data);
    })();
  }, []);
  return (
    <Container>
      <Header>
        <Title>Recommend</Title>
      </Header>
      <RecommendContainer>
        {recommendList.map((recommend) => {
          return <RecommendItem key={recommend.id} {...recommend} />;
        })}
      </RecommendContainer>
    </Container>
  );
}
export default Recommend;
