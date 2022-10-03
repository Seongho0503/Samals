import React from "react";
import { MenuContainer, MenuItem, MenuList } from "./Menu.styles";

const Menu = () => {
  return (
    <MenuContainer>
      <span>로고</span>

      <MenuList>
        <MenuItem>게임</MenuItem>
        <MenuItem>상점</MenuItem>
        <MenuItem>거래소</MenuItem>
        <MenuItem>기부</MenuItem>
      </MenuList>
    </MenuContainer>
  );
};

export default Menu;
