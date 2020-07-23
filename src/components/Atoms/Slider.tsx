import React from "react";
import styled from "styled-components";
import {GRID} from "@src/styles/variables";
import {Button} from "@src/components/Atoms/Button";


export interface ISliderProps {
  title: string;
  description: string;
  current: number;
  max: number;
  onUpdate: (newValue: number) => number;
}

export const Slider: React.FC<ISliderProps> = ({title, current, max, description, onUpdate}) => {
  const [value, setValue] = React.useState(current);
  const [descriptionOpen, setDescriptionOpen] = React.useState(false);

  const onChange = (e) => {
    let val = e.target.value;
    if (onUpdate) {
      val = onUpdate(val);
    }
    setValue(val);
  }

  return (
    <label>
      <StyledTitle>
        <span>{title} <Button onClick={() => setDescriptionOpen(!descriptionOpen)}>?</Button></span>
        <span>{value}</span>
      </StyledTitle>
      <StyledInput
        type="range"
        min={0}
        step={1}
        max={max}
        value={value}
        onChange={onChange}
      />
      <StyledDescription $open={descriptionOpen}>{description}</StyledDescription>
    </label>
  );
}

const StyledTitle = styled.span`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${GRID.HALF};
`;

const StyledInput = styled.input`
  display: block;
  width: 100%;
`;

const StyledDescription = styled.span<{$open: boolean}>`
  display: ${({$open}) => $open ? 'block' : 'none'};
  margin-bottom: ${GRID.HALF};
`;
