import styled from "styled-components";

export const Navbar = styled.nav`
  display: flex;
  position: absolute;
  top: 0;
  z-index: 10;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0px 0px;
  background-color: #160662; /* Adjust as per your theme */
  color: white;
  font-family: Arial, sans-serif;

  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 600px) {
    justify-content: center;
  }
`;

export const NavRight = styled.div`
  padding-right: 10px;
  @media (max-width: 600px) {
    margin-top: 10px;
  }
`;

export const NavButton = styled.button`
  background-color: white;
  color: rgb(102, 71, 255);
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 5px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: rgb(186, 192, 187);
    color: white;
  }
`;

export const Profile = styled.span`
  padding: 5px;
  margin-right: 10px;
  font-weight: bold;
`;

export const AppName = styled.h1`
  font-size: 18px;
  font-weight: bold;
`;
