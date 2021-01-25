import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { FaCarSide, FaCloudRain } from "react-icons/fa";
import { GiCampfire, GiWaveCrest } from "react-icons/gi";
import { IoIosCloudyNight } from "react-icons/io";
import styled from "styled-components";
import { getNoises, Noise } from "../../api";
import MusicPlayer from "./MusicPlayer";
import NoiseItem from "./NoiseItem";
import PlusMusicButton from "./PlusMusicButton";
const Container = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const ListContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const icons: Record<string, [string, IconType]> = {
  rain: ["Rainy Day", FaCloudRain],
  car: ["Driving", FaCarSide],
  sea: ["Beachside", GiWaveCrest],
  night: ["Night", IoIosCloudyNight],
  campfire: ["Bonfire", GiCampfire],
};
function Footer() {
  const [noises, setNoises] = useState<Noise[]>([]);
  useEffect(() => {
    async function test() {
      const noises = await getNoises();
      setNoises(noises);
    }
    test();
  }, []);

  const noiselist = noises.map((noise) => (
    <NoiseItem key={noise.id} url={noise.url} info={icons[noise.name]} />
  ));
  return (
    <Container>
      <MusicPlayer />
      <ListContainer>
        {noiselist}
        <PlusMusicButton />
      </ListContainer>
    </Container>
  );
}
export default Footer;
