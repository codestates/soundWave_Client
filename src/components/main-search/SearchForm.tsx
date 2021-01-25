import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { AiOutlineFileSearch } from "react-icons/ai";
import axios from "axios";
import NoResult from "./NoResult";
import Result from "./Result";

export type Music = {
  id: number;
  stream_url: string;
  title: string;
  artwork_url: string;
};
type SearchProps = {
  isStart: boolean;
  isInit: boolean;
};
type ResultsListProps = {
  search: string;
  isOpen: boolean;
};

const SearchContainer = styled.div<SearchProps>`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 0;
  opacity: 0;
  transform: translatey(-100px);
  transition: height 1s cubic-bezier(1, 0, 0.68, 1.34), opacity 0.5s,
    transform 0.5s;
  ${({ isStart }) =>
    isStart &&
    css`
      height: 93%;
    `};
  ${({ isInit }) =>
    isInit &&
    css`
      opacity: 1;
      transform: translatey(0);
    `};
`;
const SearchInfo = styled.p`
  text-align: center;
  color: white;
`;
const SearchBar = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  margin: 5px 0 20px;
`;
const SearchIconContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px 0 20px;
  background-color: #161758;
  height: 100%;
  border-radius: 50px 0 0 50px;
`;
const SearchInputContainer = styled.div`
  border-radius: 0 50px 50px 0;
  display: flex;
  align-items: center;
  background-color: white;
  width: 100%;
  height: 100%;
  padding: 0 20px 0 10px;
`;
const SearchInput = styled.input`
  font-size: 30px;
  border: none;
  &:focus {
    outline: none;
  }
`;

const ResultsContainer = styled.div`
  width: 400px;
  max-height: 80%;
`;
const ResultsList = styled.div<ResultsListProps>`
  border: 1px solid white;
  color: black;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  transition: all 0.3s;
  opacity: 0;
  height: 0;
  ${({ isOpen, search }) =>
    isOpen &&
    search.length > 0 &&
    css`
      height: 100%;
      opacity: 1;
    `}
`;

function SearchForm() {
  const [isInit, setIsInit] = useState(false);
  const [search, setSearch] = useState("");
  const [isStart, setIsStart] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [musicList, setMusicList] = useState<Music[]>([]);
  const timerId = useRef<NodeJS.Timeout>(null!);
  const audio = useRef(null!);
  useEffect(() => {
    setIsInit(true);
  }, []);
  function changeInput(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    setIsOpen(false);
    clearTimeout(timerId.current);
    timerId.current = setTimeout(async () => {
      const { data } = await axios.get<Music[]>(
        `https://api.soundcloud.com/tracks?q=${e.target.value}&limit=50&client_id=3c1222aaa64b9dc73bc257260a5497cb`
      );
      setMusicList(data);
      setIsOpen(true);
      setIsStart(true);
    }, 500);
  }
  const musics = useMemo(
    function () {
      return musicList.map((music) => (
        <Result key={music.id} music={music} audio={audio.current} />
      ));
    },
    [musicList]
  );
  return (
    <SearchContainer isStart={isStart} isInit={isInit}>
      <SearchInfo> ESC로 닫을 수 있습니다.</SearchInfo>
      <SearchBar>
        <SearchIconContainer>
          <AiOutlineFileSearch size="30" color="white" />
        </SearchIconContainer>
        <SearchInputContainer>
          <SearchInput
            type="text"
            value={search}
            autoFocus
            onChange={changeInput}
            placeholder="검색어를 입력하세요."
          />
        </SearchInputContainer>
      </SearchBar>
      <ResultsContainer>
        <ResultsList isOpen={isOpen} search={search}>
          {musicList.length > 0 ? musics : <NoResult />}
        </ResultsList>
      </ResultsContainer>
      <audio ref={audio}></audio>
    </SearchContainer>
  );
}

export default SearchForm;
