import styled, { css } from "styled-components";
import { IoIosSave } from "react-icons/io";
import {
  TiWeatherDownpour,
  TiWeatherSnow,
  TiWeatherSunny,
  TiWeatherWindy,
} from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducer";
import { ChangeEvent, useState } from "react";
import { setErr, setGroupList, setIndex } from "../../reducer/sideBarReducer";
import WeatherItem from "./WeatherItem";
import { IconType } from "react-icons";
import { getGroups, postGroups } from "../../api";

const Container = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Contents = styled.div`
  /* border: 1px solid black; */
  width: 300px;
  display: flex;
  justify-content: space-between;
`;
const Button = styled.div`
  border-radius: 10px;
  cursor: pointer;
  /* font-size: 30px; */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 50px;
  background-color: red;
  color: white;
  &:hover {
    background-color: white;
    color: black;
  }
  transition: all 0.5s;
`;
const Input = styled.input`
  border: none;
  outline: none;
  width: 180px;
  padding: 15px;
  border-radius: 10px;
`;
const Option = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  color: white;
  font-size: 12px;
  cursor: pointer;
  margin: 5px;
  &:hover {
    color: #35addd;
    & span {
      color: white;
    }
  }
  & span {
    color: red;
  }
`;
const WeatherContainer = styled.div`
  position: absolute;
  bottom: -30px;
  height: 30px;
  overflow: hidden;
`;
type WeathersProps = {
  isShow: boolean;
};
const Weathers = styled.div<WeathersProps>`
  display: flex;
  color: white;
  height: 100%;
  transform: translateY(-100%);
  ${({ isShow }) =>
    isShow &&
    css`
      transform: translateY(0);
    `}
  transition: all 1s;
`;
export type Weather = {
  name: string;
  Icon: IconType;
};
export const weathers: Weather[] = [
  { name: "hot", Icon: TiWeatherSunny },
  { name: "rain", Icon: TiWeatherDownpour },
  { name: "snow", Icon: TiWeatherSnow },
  { name: "breeze", Icon: TiWeatherWindy },
];
function GroupForm() {
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state: RootState) => state.sideBar.accessToken
  );
  const weather = useSelector((state: RootState) => state.sideBar.weather);
  const musicUrl = useSelector(
    (state: RootState) => state.musicSearch.musicUrl
  );
  const musicVolume = useSelector(
    (state: RootState) => state.footer.musicVolume
  );
  const noiseList = useSelector((state: RootState) => state.footer.noiseList);
  const userId = useSelector((state: RootState) => state.sideBar.user.userId);
  const [groupName, setGroupName] = useState("");
  const [isShow, setIsShow] = useState(false);
  function save() {
    if (!accessToken) {
      return dispatch(setErr("로그인 후에 이용 가능합니다."));
    }
    if (!groupName) {
      return dispatch(setErr("이름을 입력해 주세요."));
    }
    const noises = [];
    for (const key in noiseList) {
      if (noiseList[key].picked) {
        noises.push({
          name: key,
          volume: noiseList[key].volume,
        });
      }
    }
    if (!noises.length) {
      return dispatch(setErr("소음을 1개 이상 선택해 주세요."));
    }
    const music = { url: musicUrl, volume: musicUrl ? musicVolume : -1 };
    (async () => {
      try {
        await postGroups(accessToken, {
          userId,
          groupName,
          weather,
          noises,
          music,
        });
      } catch (error) {
        return dispatch(setErr(error.response.data.data));
      }
      try {
        const { data } = await getGroups(accessToken, userId);
        setGroupName("");
        const group = data.filter((el) => el.weather === weather);
        dispatch(setGroupList(group));
        dispatch(setIndex(parseInt(`${(group.length - 1) / 3}`) * 3));
        return;
      } catch (error) {
        return dispatch(setErr(error.response.data.data));
      }
    })();
  }
  function ChangeInput(e: ChangeEvent<HTMLInputElement>) {
    setGroupName(e.target.value);
  }
  function click() {
    setIsShow((state) => !state);
  }
  return (
    <>
      <Container>
        <Contents>
          <Button onClick={save}>
            <IoIosSave size="30" />
          </Button>
          <Input
            type="text"
            placeholder="이름을 붙여서 저장해 보세요."
            value={groupName}
            onChange={ChangeInput}
          />
        </Contents>
        <Option onClick={click}>
          어떤 (<span>날씨</span>)에 듣기 좋을지 선택해주세요
          <WeatherContainer>
            <Weathers isShow={isShow}>
              {weathers.map((weather) => (
                <WeatherItem key={weather.name} {...weather} />
              ))}
            </Weathers>
          </WeatherContainer>
        </Option>
      </Container>
    </>
  );
}
export default GroupForm;
