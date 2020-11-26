import React from "react";
import useSpec from "./useSpec";
import styled from "styled-components";

const MainDiv = styled.div`
  font-family: Arial, Helvetica, sans-serif; ;
`;

function App() {
  const {
    specification: { examBoard, qualificationCode, subject, components },
  } = useSpec();

  return (
    <MainDiv>
      <h1>{subject}</h1>
      <div>
        {examBoard} - {qualificationCode}
      </div>
      {components.map((component, ci) => (
        <React.Fragment>
          <h2>
            {ci + 1} - {component.name}
          </h2>
          {component.sections.map((section, si) => (
            <React.Fragment key={si}>
              <h3>
                {ci + 1}.{si + 1} - {section.title}
              </h3>
              <div>{section.description}</div>
              {section.subsections.map((subsection, ssi) => (
                <React.Fragment key={ssi}>
                  <h4>
                    {ci + 1}.{si + 1}.{ssi + 1} - {subsection.title}
                  </h4>
                  <ul>
                    {subsection.requirements.map((r, ri) => (
                      <li key={ri}>{r}</li>
                    ))}
                  </ul>
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}
    </MainDiv>
  );
}

export default App;
