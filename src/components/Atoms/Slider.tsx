import React, { InputHTMLAttributes, useMemo } from "react";
import styled from "styled-components";
import { GRID } from "@src/styles/variables";
import { Button } from "@src/components/Atoms/Button";
import { SIZES } from "@src/styles/typography";
import { COLOURS } from "@src/styles/colours";

export interface ISliderProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "max" | "type" | "min" | "minLength" | "maxLength" | "step" | "value"
  > {
  title: string;
  description: string;
  current: number;
  max: number;
  currentMax?: number;
  onUpdate: (newValue: number) => number;
}

export const Slider: React.FC<ISliderProps> = ({
  title,
  current,
  id,
  currentMax,
  max,
  description,
  onUpdate,
  ...inputProps
}) => {
  const [value, setValue] = React.useState(current);
  const [descriptionOpen, setDescriptionOpen] = React.useState(false);

  const inputId = useMemo(() => id || `input-${Math.floor(Math.random() * 1000000)}`, [id]);

  const onChange = (e) => {
    let val = parseInt(e.target.value);
    if (currentMax === undefined || val <= currentMax) {
      if (onUpdate) {
        val = onUpdate(val);
      }
      setValue(val);
    }
  };

  return (
    <div>
      <StyledTitle>
        <span>
          <label htmlFor={inputId}>{title}</label>
          <HelpButton onClick={() => setDescriptionOpen(!descriptionOpen)}>?</HelpButton>
        </span>
        <StyledValue>{value}</StyledValue>
      </StyledTitle>
      <StyledInput
        id={inputId}
        type="range"
        min={0}
        step={1}
        max={max}
        value={value}
        onChange={onChange}
        {...inputProps}
      />
      {descriptionOpen && <p>{description}</p>}
    </div>
  );
};

const StyledTitle = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${GRID.HALF};
`;

const StyledInput = styled.input`
  display: block;
  width: 100%;
  -webkit-appearance: none;
  &:not(:last-child) {
    margin-bottom: ${GRID.HALF};
  }

  &:focus {
    outline: none;
  }
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: ${GRID.QUARTER};
    cursor: pointer;
    background: ${COLOURS.GREY.DARK};
    border-radius: ${GRID.UNIT};
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: ${GRID.UNIT};
    width: ${GRID.UNIT};
    border-radius: 100%;
    background: ${COLOURS.ACTIVE_HIGHLIGHT};
    cursor: pointer;
    margin-top: -6px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
  }

  &::-moz-range-thumb {
    height: 40px;
    width: 40px;
    border-radius: 100%;
    background: ${COLOURS.ACTIVE_HIGHLIGHT};
    cursor: pointer;
    cursor: pointer;
  }
`;

const StyledValue = styled.span`
  ${SIZES.C};
`;

const HelpButton = styled(Button)`
  margin-left: ${GRID.UNIT};
  padding: 0 ${GRID.HALF};
`;
