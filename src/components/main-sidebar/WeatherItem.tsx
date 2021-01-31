import { MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { RootState } from "../../reducer";
import { setWeather } from "../../reducer/sideBarReducer";
import { Weather } from "./GroupForm";
type ContainerProps = {
  isPicked: boolean;
};
const Container = styled.div<ContainerProps>`
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 0 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #21f0b2;
    color: black;
  }
  &:active {
    background-color: #35addd;
    color: black;
    border: 1px solid white;
  }
  ${({ isPicked }) =>
    isPicked &&
    css`
      border: 1px solid white;
      background-color: #35addd;
      color: black;
    `}
  transition: all 0.5s;
`;
function WeatherItem({ name, Icon }: Weather) {
  const dispatch = useDispatch();
  const weather = useSelector((state: RootState) => state.sideBar.weather);
  function click(e: MouseEvent) {
    e.stopPropagation();
    dispatch(setWeather(name));
  }
  return (
    <Container isPicked={weather === name} onClick={click}>
      <Icon size="20" />
    </Container>
  );
}
export default WeatherItem;
