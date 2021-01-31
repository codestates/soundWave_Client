import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getGroups } from "../../api";
import { RootState } from "../../reducer";
import { setGroupList, setIndex } from "../../reducer/sideBarReducer";
import GroupItem from "./GroupItem";
import { RiFileForbidFill } from "react-icons/ri";
const Container = styled.div`
  height: 100px;
  width: 95%;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3px;
`;
const Title = styled.div`
  color: white;
`;
const Count = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 12px;
  color: white;
`;
const GroupsContainer = styled.div`
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
  right: -30px;
  border: 30px solid white;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  height: 50%;
  opacity: 0.3;
  &:hover {
    opacity: 1;
  }
  &:active {
    transition: all 0.3s;
    border-left-color: black;
  }
  transition: all 1s;
`;
const NoContents = styled.div`
  position: relative;
  left: 0;
  right: 0;
  margin: auto;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80px;
  & span {
    margin-top: 5px;
    font-size: 8px;
  }
`;

function History() {
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state: RootState) => state.sideBar.accessToken
  );
  const userId = useSelector((state: RootState) => state.sideBar.user.userId);
  const groupList = useSelector((state: RootState) => state.sideBar.groupList);
  const weather = useSelector((state: RootState) => state.sideBar.weather);
  const myListIndex = useSelector(
    (state: RootState) => state.sideBar.myListIndex
  );
  const [slide, setSlide] = useState(false);
  useEffect(() => {
    (async () => {
      if (userId) {
        const { data } = await getGroups(accessToken, userId);
        dispatch(setGroupList(data.filter((el) => el.weather === weather)));
      }
    })();
  }, [accessToken, userId, dispatch, weather]);

  function getNowPage() {
    return parseInt(`${myListIndex / 3}`) + 1;
  }
  function getAllPage() {
    return parseInt(`${(groupList.length - 1) / 3}`) + 1;
  }
  function next() {
    setSlide(true);
    setTimeout(() => {
      setSlide(false);
      let res = myListIndex + 3;
      if (res >= groupList.length) {
        res = 0;
      }
      dispatch(setIndex(res));
    }, 100);
  }
  return (
    <Container>
      <Header>
        <Title>My List</Title>
        {groupList.length !== 0 && (
          <Count>
            {getNowPage()}/{getAllPage()}
          </Count>
        )}
      </Header>
      <GroupsContainer>
        {groupList.length !== 0 ? (
          <>
            <Groups>
              {(() => {
                const start = myListIndex;
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
          <NoContents>
            <RiFileForbidFill size="30" />
            <span>No Contents</span>
          </NoContents>
        )}
      </GroupsContainer>
    </Container>
  );
}
export default History;
