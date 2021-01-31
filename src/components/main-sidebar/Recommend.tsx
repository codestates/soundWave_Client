import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getRecommends, getRecommendsByNoises, RecommendRes } from "../../api";
import { RootState } from "../../reducer";
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
  const noiseList = useSelector((state: RootState) => state.footer.noiseList);
  useEffect(() => {
    (async () => {
      const noises = [];
      for (const key in noiseList) {
        if (noiseList[key].picked) {
          noises.push(noiseList[key].id);
        }
      }
      let data;
      if (noises.length) {
        data = await getRecommendsByNoises(noises);
      } else {
        data = await getRecommends();
      }
      setRecomendList(data);
    })();
  }, [noiseList]);
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
