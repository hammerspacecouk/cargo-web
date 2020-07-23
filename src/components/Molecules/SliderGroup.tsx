import React from "react";
import {ISliderProps, Slider} from "@src/components/Atoms/Slider";
import styled from "styled-components";
import {GRID} from "@src/styles/variables";
import {COLOURS} from "@src/styles/colours";

export const SliderGroup: React.FC<IProps> = ({sliders, maxTotal}) => {
  const [slidersValue, setSliders] = React.useState(sliders);

  const totalUsed = slidersValue.reduce((a, s) => a + s.current, 0);
  const remaining = maxTotal - totalUsed;

  return (
    <div>
      Available: {remaining}
      <StyledSliderList>
      {slidersValue.map((slider, i) => (
        <Slider
          key={slider.title}
          title={slider.title}
          current={slider.current}
          max={maxTotal}
          description={slider.description}
          onUpdate={(newValue) => {
            const newSliders = [...sliders];
            newSliders[i].current = newValue;
            setSliders(newSliders);
            return newValue;
          }}
        />
      ))}
    </StyledSliderList>
    </div>
  );
};

interface IProps {
  sliders: {
    title: ISliderProps['title'];
    description: ISliderProps['description'];
    current: ISliderProps['current'];
  }[];
  maxTotal: number;
}

const StyledSliderList = styled.div`
  > *:not(:last-child) {
    margin-bottom: ${GRID.HALF};
    padding-bottom: ${GRID.HALF};
    border-bottom: solid 1px ${COLOURS.KEY_LINE};
  }
`;
