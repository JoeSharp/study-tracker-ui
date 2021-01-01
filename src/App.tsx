import React from "react";
import styled from "styled-components";
import Routes from "./components/Routes";

const MainDiv = styled.div`
  font-family: Arial, Helvetica, sans-serif; ;
`;

const App: React.FunctionComponent = () => {
  return (
    <MainDiv>
      <Routes />
    </MainDiv>
  );
};

export default App;
