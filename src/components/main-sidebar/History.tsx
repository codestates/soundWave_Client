import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getGroups } from "../../api";
import { RootState } from "../../reducer";
import { setGroupList } from "../../reducer/sideBarReducer";
import GroupItem from "./GroupItem";
const Container = styled.div`
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
const Count = styled.div`
  color: white;
`;
const GroupsContainer = styled.div`
  margin-top: 10px;
  position: relative;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Groups = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80%;
  height: 80px;
  overflow: hidden;
`;
const NextButton = styled.div`
  cursor: pointer;
  position: relative;
  right: -10px;
  border: 30px solid white;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  height: 50%;
  opacity: 0.3;
  &:hover {
    opacity: 1;
  }
  transition: all 1s;
`;
const NoContents = styled.div`
  border: 1px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
`;

function History() {
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state: RootState) => state.sideBar.accessToken
  );
  const userId = useSelector((state: RootState) => state.sideBar.user.userId);
  const groupList = useSelector((state: RootState) => state.sideBar.groupList);
  const [index, setIndex] = useState(0);
  const [slide, setSlide] = useState(false);
  useEffect(() => {
    (async () => {
      if (userId) {
        const { data } = await getGroups(accessToken, userId);
        dispatch(setGroupList(data));
      }
    })();
  }, [accessToken, userId, dispatch]);

  function getNowPage() {
    return parseInt(`${index / 3}`) + 1;
  }
  function getAllPage() {
    return parseInt(`${(groupList.length - 1) / 3}`) + 1;
  }
  function next() {
    setSlide(true);
    setTimeout(() => {
      setSlide(false);
      let res = index + 3;
      if (res >= groupList.length) {
        res = 0;
      }
      setIndex(res);
    }, 500);
  }
  return (
    <Container>
      <Header>
        <Title>My List</Title>
        {groupList.length !== 0 && (
          <Count>
            {getNowPage()}/{getAllPage()}{" "}
          </Count>
        )}
      </Header>
      <GroupsContainer>
        {groupList.length !== 0 ? (
          <>
            <Groups>
              {(() => {
                const start = index;
                const end = start + 3;
                const groups = [];
                for (let i = start; i < end; i++) {
                  groups.push(
                    <GroupItem key={i} {...groupList[i]} slide={slide} />
                  );
                }
                return groups;
              })()}
            </Groups>
            <NextButton onClick={next} />
          </>
        ) : (
          <NoContents>저장을 해보세요!</NoContents>
        )}
      </GroupsContainer>
    </Container>
  );
}
export default History;
