import React from "react";
import useSpecifications from "../../api/useSpecificationList";
import useAppNavigation from "../../lib/useAppNavigation";

const SpecificationDashboard: React.FunctionComponent = () => {
  const { nav } = useAppNavigation();
  const { specifications } = useSpecifications();

  return (
    <div>
      <h2>Select a Specification</h2>

      {specifications.map(
        ({ specificationId, subject, examBoard, qualificationCode }) => (
          <div>
            <h2>{subject}</h2>
            <p>
              {examBoard} - {qualificationCode}
            </p>
            <button onClick={() => nav.goToDashboard(specificationId)}>
              Track Progress
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default SpecificationDashboard;
