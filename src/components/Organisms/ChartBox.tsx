import { TOOL_PAN, UncontrolledReactSVGPanZoom } from "react-svg-pan-zoom";
import { Chart, IMapProps } from "@src/components/Organisms/Chart";
import * as React from "react";
import { useElementDimensions } from "@src/hooks/useElementDimensions";
import { useRef } from "react";
import { IClassNameProps } from "@src/interfaces";
import styled from "styled-components";

export interface IChartBoxProps extends IClassNameProps {
  map: {
    svg: IMapProps["svg"];
    viewBox: string;
    center: {
      x: number;
      y: number;
    };
  };
}

export const ChartBox = ({ map }: IChartBoxProps) => {
  const { ref, sizeIsKnown, width, height } = useElementDimensions();
  const viewer = useRef<UncontrolledReactSVGPanZoom>();

  React.useEffect(() => {
    if (viewer.current) {
      const viewed = window.sessionStorage.getItem("LAST_VIEWED_SHIP");
      let x = map.center.x;
      let y = map.center.y;
      if (viewed) {
        const currentShip = map.svg.ships.find((ship) => ship.id === viewed);
        if (currentShip) {
          x = currentShip.center.x;
          y = currentShip.center.y;
        }
      }
      viewer.current.setPointOnViewerCenter(x, y, 1);
    }
  }, [viewer.current]);

  return (
    <Container ref={ref}>
      {sizeIsKnown && (
        <UncontrolledReactSVGPanZoom
          width={width}
          height={height}
          background="rgba(0,0,0,0.3)"
          SVGBackground="transparent"
          tool={TOOL_PAN}
          preventPanOutside={false}
          scaleFactorMax={4}
          scaleFactorMin={0.1}
          customMiniature={() => null}
          customToolbar={() => null}
          ref={viewer}
        >
          <svg viewBox={map.viewBox}>
            <Chart svg={map.svg} />
          </svg>
        </UncontrolledReactSVGPanZoom>
      )}
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
`;
