import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { AiOutlineFileSearch } from "react-icons/ai";
import NoResult from "./NoResult";
import Result from "./Result";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducer";
import { listenSample, setSearchInput } from "../../reducer/musicSearchReducer";
import { getMusicList, Music } from "../../api";
import { SW_CLIENT_ID } from "../../const";

type SearchContainerProps = {
  isFound: boolean;
  isInit: boolean;
};

const SearchContainer = styled.div<SearchContainerProps>`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 0;
  opacity: 0;
  transform: translatey(-100px);
  transition: height 1s cubic-bezier(1, 0.1, 0.8, 1.5), opacity 0.5s,
    transform 0.5s;
  ${({ isFound }) =>
    isFound &&
    css`
      height: 80%;
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
  height: 40px;
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
  font-size: 20px;
  border: none;
  &:focus {
    outline: none;
  }
`;

const ResultsContainer = styled.div`
  width: 400px;
  max-height: 80%;
`;
type ResultsListProps = {
  isOpen: boolean;
};
const ResultsList = styled.div<ResultsListProps>`
  border: 1px solid white;
  color: black;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  opacity: 0;
  height: 0;
  ${({ isOpen }) =>
    isOpen &&
    css`
      height: 100%;
      opacity: 1;
    `}
  transition: all 0.3s;
`;

function SearchForm() {
  const dispatch = useDispatch();
  const searchInput = useSelector(
    (state: RootState) => state.musicSearch.searchInput
  );
  const sampleUrl = useSelector(
    (state: RootState) => state.musicSearch.sampleUrl
  );
  const musicUrl = useSelector(
    (state: RootState) => state.musicSearch.musicUrl
  );
  const [isInit, setIsInit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const timerId = useRef<NodeJS.Timeout>(null!);
  const [musicList, setMusicList] = useState<Music[]>([]);
  const [isFound, setIsFound] = useState(false);

  const isContinue = useRef(false);
  const audio = useRef(new Audio());
  useEffect(() => {
    if (sampleUrl) {
      audio.current.src = `${sampleUrl}?client_id=${SW_CLIENT_ID}`;
    } else {
      audio.current.src = "";
    }
  }, [sampleUrl]);
  useEffect(() => {
    const sampleAudio = audio.current;
    setIsInit(true);
    const play = () => {
      sampleAudio.currentTime = sampleAudio.duration / 5;
      sampleAudio.play();
    };
    sampleAudio.addEventListener("loadeddata", play);
    return () => {
      dispatch(listenSample(""));
      sampleAudio.src = "";
      sampleAudio.removeEventListener("loadeddata", play);
    };
  }, [dispatch]);
  useEffect(() => {
    if (!searchInput) {
      return;
    }
    timerId.current = setTimeout(async () => {
      isContinue.current = true;
      const data = await getMusicList(searchInput);
      if (!isContinue.current) {
        return;
      }
      setMusicList(data);
      setIsOpen(true);
      setIsFound(true);
    }, 500);
  }, [searchInput]);

  function changeSearchInput(e: ChangeEvent<HTMLInputElement>) {
    setIsOpen(false);
    isContinue.current = false;
    clearTimeout(timerId.current);
    dispatch(setSearchInput(e.target.value));
  }
  const musics = useMemo(
    function () {
      return musicList.length !== 0 ? (
        musicList.map((music) => (
          <Result
            key={music.id}
            music={music}
            isSelected={music.stream_url === sampleUrl}
            isPicked={music.stream_url === musicUrl}
          />
        ))
      ) : (
        <NoResult />
      );
    },
    [musicList, sampleUrl, musicUrl]
  );
  return (
    <SearchContainer isInit={isInit} isFound={isFound}>
      <SearchInfo> ESC로 닫을 수 있습니다.</SearchInfo>
      <SearchBar>
        <SearchIconContainer>
          <AiOutlineFileSearch size="20" color="white" />
        </SearchIconContainer>
        <SearchInputContainer>
          <SearchInput
            type="text"
            value={searchInput}
            autoFocus
            onChange={changeSearchInput}
            placeholder="검색어를 입력하세요."
          />
        </SearchInputContainer>
      </SearchBar>
      <ResultsContainer>
        <ResultsList isOpen={isOpen}>{musics}</ResultsList>
      </ResultsContainer>
    </SearchContainer>
  );
}

export default SearchForm;
