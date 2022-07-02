import { ContainerHeader, DivHeader, DivTitle } from "./styled";
import Logo from "../../assets/logo.svg";

function Header(prop: { name: string }) {
  return (
    <>
      <ContainerHeader>
        <DivHeader>
          <img alt="Quaddro" src={Logo} />
          <DivTitle>{prop.name}</DivTitle>
        </DivHeader>
      </ContainerHeader>
    </>
  );
}

export default Header;
