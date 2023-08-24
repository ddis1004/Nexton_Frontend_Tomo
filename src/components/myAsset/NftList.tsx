import styled, { css } from "styled-components";
import IcReload from "../../assets/icons/MyAsset/ic_reload.svg";
import Icfilter from "../../assets/icons/MyAsset/ic_filter.svg";
import { useState } from "react";
import NftItem from "./NftItem";
import NFTFilter from "./modal/NFTFilter";
import useMyAssetFilter from "../../hooks/Filter/useMyAssetFilter";
import { useNavigate } from "react-router-dom";

const NftList = () => {
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isSelect, setIsSelect] = useState([true, false]);

  const navigate = useNavigate();

  const handleSelect = (index: number) => {
    if (index === 1) {
      setIsSelect([true, false]);
    } else {
      setIsSelect([false, true]);
    }
  };

  const handleReload = () => {
    setIsSelect([true, false]);
  };

  const handleMoveDetail = () => {
    navigate("/myasset/1");
  };
  return (
    <NFtListWrapper>
      <NftListHeader>
        {isOpenFilter && <NFTFilter />}
        <NFTListHeaderLeft>
          <NFTReloadBox onClick={handleReload}>
            <img src={IcReload} alt="reload" />
          </NFTReloadBox>
          <NFTSelectBox active={isSelect[0]} onClick={() => handleSelect(1)}>
            Stake
          </NFTSelectBox>
          <NFTSelectBox active={isSelect[1]} onClick={() => handleSelect(2)}>
            Collateralized
          </NFTSelectBox>
        </NFTListHeaderLeft>
        <NFTSelectBox active onClick={() => setIsOpenFilter((prev) => !prev)}>
          Period
          <img src={Icfilter} alt="filter" />
        </NFTSelectBox>
      </NftListHeader>
      <NFTItemWrapper>
        <NftItem handleMoveDetail={handleMoveDetail} />
        <NftItem />
        <NftItem />
        <NftItem />
      </NFTItemWrapper>
    </NFtListWrapper>
  );
};

export default NftList;

const NFtListWrapper = styled.div`
  width: 100%;

  &::-webkit-scrollbar {
    width: 4px;
    background: transparent;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c4c4c4;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-track {
    margin-top: 3px;
    margin-bottom: 3px;
    background-clip: padding-box;
  }
`;

const NftListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  width: 100%;
  padding: 1.2rem;

  border-radius: 1rem 1rem 0 0;
  background-color: #f9f9ff;
`;

const NFTListHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const NFTReloadBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 3rem;
  height: 3rem;

  border-radius: 50%;
  background-color: #f9f9ff;
  box-shadow: 0 0 2rem 0 rgba(198, 197, 208, 0.3);
`;

const NFTSelectBox = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;

  padding: 0.6rem 1rem;

  border: 0.1rem solid #f2f2f7;
  border-radius: 2rem;
  background-color: #f9f9ff;

  ${({ theme }) => theme.fonts.Telegram_Footnote};

  ${({ active }) =>
    active
      ? css`
          border: none;
          background-color: #f9f9ff;
          box-shadow: 0px 0px 20px 0px rgba(198, 197, 208, 0.3);
          color: #5e6162;
        `
      : css`
          border: 0.1rem solid #f2f2f7;
          background-color: #f9f9ff;
          color: #90909a;
        `}
  outline: none;
  cursor: pointer;
`;

const NFTItemWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.6rem;

  width: 100%;
  height: 55vh;
  padding: 3rem;

  background-color: #fff;

  overflow: scroll;
`;
