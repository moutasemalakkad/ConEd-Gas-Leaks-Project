import React, { useState } from "react";
import * as d3 from "d3";
import styled from "styled-components";

const Rect = styled.rect`
  fill: #f22613;
  width: 10px;
  height: 10px;
  cursor: pointer;
`;

const Square = ({ x, y }) => <Rect x={x} y={y} />;

const HybridExample = ({ x, y }) => {
  const [radius, setRadius] = useState(10);
  const N = 10;

  const angleScale = d3
    .scaleLinear()
    .domain([0, N])
    .range([0, Math.PI * 2]);

  const explode = () => {
    const elastic = d3.easeElasticOut;
    elastic.amplitude(5);
    elastic.period(-0.3);

    d3.selection()
      .transition("radius-boom")
      .ease(elastic)
      .duration(1000)
      .tween("radius", () => {
        const radiusInt = d3.interpolate(radius, radius > 10 ? 10 : 60);
        return t => setRadius(radiusInt(t));
      });
  };

  return (
    <g transform={`translate(${x}, ${y})`} onClick={explode}>
      {d3.range(N).map(i => (
        <Square
          x={Math.cos(angleScale(i)) * radius}
          y={Math.sin(angleScale(i)) * radius}
          key={i}
        />
      ))}
    </g>
  );
};

export default HybridExample;
