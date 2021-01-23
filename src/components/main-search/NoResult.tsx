import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  color: white;
  text-align: center;
`;
function NoResult() {
  return <Container>검색결과가 없습니다.</Container>;
}
export default NoResult;
