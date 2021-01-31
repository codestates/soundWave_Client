import { useEffect, useState } from "react";
import styled from "styled-components";
import { getRecommends, RecommendRes } from "../../api";
import RecommendItem from "./RecommendItem";
const Container = styled.div`
  width: 95%;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Title = styled.div`
  color: white;
`;
const RecommendContainer = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  height: 150px;
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
