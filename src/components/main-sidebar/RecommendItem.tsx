import { useDispatch } from "react-redux";
import styled from "styled-components";
import { RecommendRes } from "../../api";
import {
  setMusicVolume,
  setVolume,
  turnOffAllNoise,
  turnOnNoise,
} from "../../reducer/footerReducer";
import { pickMusic } from "../../reducer/musicSearchReducer";
import { setRecommendedUser } from "../../reducer/sideBarReducer";
import { icons } from "../main-footer/Footer";
import { weathers } from "./GroupForm";
const Img = styled.img`
  border-radius: 50%;
  width: 20px;
  height: 20px;
`;
const Container = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  padding: 5px;
  &:hover {
    background-color: white;
    color: black;
    ${Img} {
      box-sizing: border-box;
      border: 1px solid black;
    }
  }
  &:active {
    background-color: #4b5086;
    transition: all 0.1s;
  }
  transition: all 0.5s;
`;

const Title = styled.div`
  width: 100px;
  text-align: center;
  overflow: hidden;
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const Icons = styled.div`
  text-align: center;
  width: 100px;
`;

function RecommendItem({
  groupname,
  user,
  noise,
  weather,
  musicVolume,
  groupcombMusic,
}: RecommendRes) {
  const dispatch = useDispatch();
  function click() {
    dispatch(turnOffAllNoise());
    noise.forEach((noise) => {
      dispatch(turnOnNoise(noise.noise.name));
      dispatch(setVolume({ name: noise.noise.name, volume: noise.volume }));
    });
    dispatch(pickMusic(groupcombMusic.musicUrl));
    dispatch(setMusicVolume(musicVolume === -1 ? 50 : musicVolume));
    dispatch(setRecommendedUser(user.id));
  }
  return (
    <Container onClick={click}>
      <Img src={user.profile} alt="" />
      <Icons>
        {(() => {
          const noises = [];
          for (let i = 0; i < noise.length; i++) {
            const Icon = icons[noise[i].noise.name][1];
            noises.push(<Icon key={i} />);
          }
          return noises;
        })()}
      </Icons>
      <Icons>
        {(() => {
          for (let i = 0; i < weathers.length; i++) {
            if (weathers[i].name === weather.weather) {
              const Icon = weathers[i].Icon;
              return <Icon />;
            }
          }
        })()}
      </Icons>
      <Title>{groupname}</Title>
    </Container>
  );
}
export default RecommendItem;
