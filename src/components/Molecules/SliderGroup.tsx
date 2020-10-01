import React from "react";
import { ISliderProps, Slider } from "@src/components/Atoms/Slider";
import styled from "styled-components";
import { GRID } from "@src/styles/variables";
import { COLOURS } from "@src/styles/colours";
import { TextRight } from "@src/components/Atoms/Text";
import { IClassNameProps } from "@src/interfaces";

const calculateTotalUsed = (sliders: IProps["sliders"]): number => {
  return sliders.reduce((a, s) => a + s.current, 0);
};

export const SliderGroup: React.FC<IProps> = ({ className, sliders, maxTotal }) => {
  const [slidersValue, setSliders] = React.useState(sliders);

  const remaining = maxTotal - calculateTotalUsed(slidersValue);

  return (
    <div className={className}>
      <AvailableCount>
        Available: {remaining}/{maxTotal}
      </AvailableCount>
      <StyledSliderList>
        {slidersValue.map((slider, i) => (
          <Slider
            key={slider.title}
            title={slider.title}
            current={slider.current}
            name={slider.name}
            currentMax={Math.min(maxTotal, slider.current + remaining)}
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

interface IProps extends IClassNameProps {
  sliders: {
    title: ISliderProps["title"];
    description: ISliderProps["description"];
    current: ISliderProps["current"];
    name: ISliderProps["name"];
  }[];
  maxTotal: number;
}

const StyledSliderList = styled.div`
  > *:not(:last-child) {
    margin-bottom: ${GRID.UNIT};
    padding-bottom: ${GRID.UNIT};
    border-bottom: solid 1px ${COLOURS.KEY_LINE};
  }
`;

const AvailableCount = styled(TextRight)`
  margin-bottom: ${GRID.HALF};
`;
