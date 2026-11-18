import React from 'react';
import { SetTheoryLab } from './SetTheoryLab';
import { NumberSystemsLab } from './NumberSystemsLab';
import { InductionLab } from './InductionLab';
import { SequencesSeriesLab } from './SequencesSeriesLab';
import { QuadraticLab } from './QuadraticLab';
import { BinomialLab } from './BinomialLab';
import { ComplexArgandLab } from './ComplexArgandLab';
import { DeMoivreLab } from './DeMoivreLab';
import { TrigonometryLab } from './TrigonometryLab';

export const ModuleLabHost: React.FC<{ moduleId: number }> = ({ moduleId }) => {
  switch (moduleId) {
    case 1:
      return <SetTheoryLab />;
    case 2:
      return <NumberSystemsLab />;
    case 3:
      return <InductionLab />;
    case 4:
      return <SequencesSeriesLab />;
    case 5:
      return <QuadraticLab />;
    case 6:
      return <BinomialLab />;
    case 7:
      return <ComplexArgandLab />;
    case 8:
      return <DeMoivreLab />;
    case 9:
      return <TrigonometryLab />;
    default:
      return <SetTheoryLab />;
  }
};
