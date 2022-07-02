import styled from "styled-components";

export const ContainerHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  min-width: 70vw;
  min-height: 7vh;
  border-radius: 4px;
  -webkit-box-shadow: 0px 10px 13px -7px rgba(0, 0, 0, 0);
  box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.25);
  margin-bottom: 10px;
`;

export const DivHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 40px;
    height: 40px;
  }
`;

export const DivTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 22px;
  font-weight: 700;
  color: #002aff;
  margin-left: 10px;
`;
