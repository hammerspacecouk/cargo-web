import React from "react";
import { ISliderProps, Slider } from "@src/components/Atoms/Slider";
import styled from "styled-components";
import { GRID } from "@src/styles/variables";
import { COLOURS } from "@src/styles/colours";
import { IClassNameProps } from "@src/interfaces";
import { BREAKPOINTS } from "@src/styles/media";
import { GridWrapper } from "@src/components/Atoms/GridWrapper";
import { H3, H4 } from "@src/components/Atoms/Heading";
import { Button } from "@src/components/Atoms/Button";
import { SIZES } from "@src/styles/typography";
import { Prose } from "@src/components/Atoms/Prose";

const calculateTotalUsed = (sliders: IProps["sliders"]): number => {
  return sliders.reduce((a, s) => a + s.current, 0);
};

export const SliderGroup: React.FC<IProps> = ({ className, sliders, maxTotal }) => {
  const [slidersValue, setSliders] = React.useState(sliders);
  const [helpOpen, setHelpOpen] = React.useState(false);

  const remaining = maxTotal - calculateTotalUsed(slidersValue);

  return (
    <div className={className}>
      <Header>
        <H3>
          Set new priorities{" "}
          <HelpButton
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setHelpOpen(!helpOpen);
            }}
          >
            ?
          </HelpButton>
        </H3>
        <H4 as="span">
          Available: {remaining}/{maxTotal}
        </H4>
      </Header>
      {helpOpen && (
        <HelpText>
          <p>
            Set the sliders for what is most important for you. These can be changed at your next promotion. You have{" "}
            {maxTotal} unit{maxTotal !== 1 ? "s" : ""} to spread between:
          </p>
          <dl>
            <dt>History</dt>
            <dd>Show more previously visited planets on the map.</dd>
            <dt>Discovery</dt>
            <dd>Increase speed of ships to make it easier to find new planets.</dd>
            <dt>Economy</dt>
            <dd>Reduce the cost of all purchases.</dd>
            <dt>Military</dt>
            <dd>Increase power of your weapons.</dd>
          </dl>
        </HelpText>
      )}
      <StyledSliderList>
        {slidersValue.map((slider, i) => (
          <div key={slider.title}>
            <StyledSlider
              title={slider.title}
              current={slider.current}
              name={slider.name}
              currentMax={Math.min(maxTotal, slider.current + remaining)}
              max={maxTotal}
              onUpdate={(newValue) => {
                const newSliders = [...sliders];
                newSliders[i].current = newValue;
                setSliders(newSliders);
                return newValue;
              }}
            />
          </div>
        ))}
      </StyledSliderList>
    </div>
  );
};

interface IProps extends IClassNameProps {
  sliders: {
    title: ISliderProps["title"];
    current: ISliderProps["current"];
    name: ISliderProps["name"];
  }[];
  maxTotal: number;
}

const StyledSliderList = styled(GridWrapper)`
  > * {
    width: 100%;
  }
  ${BREAKPOINTS.L`
    > * {
        width: 50%;
    }
  `};
`;

const StyledSlider = styled(Slider)`
  padding-bottom: ${GRID.UNIT};
  border-bottom: solid 1px ${COLOURS.KEY_LINE};
`;

const Header = styled.div`
  margin-bottom: ${GRID.UNIT};
  ${BREAKPOINTS.S`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  `}
`;

const HelpButton = styled(Button)`
  margin-left: ${GRID.HALF};
  padding: 0 ${GRID.HALF};
  ${SIZES.D};
  font-style: normal;
`;

const HelpText = styled(Prose)`
  border-bottom: solid 1px ${COLOURS.KEY_LINE};
  margin-bottom: ${GRID.UNIT};
`;
