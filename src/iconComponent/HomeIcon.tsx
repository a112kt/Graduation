import React from "react";
import Svg, {
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
  Rect,
  SvgProps,
} from "react-native-svg";

interface Props extends SvgProps {
  size?: number;
}

const HomeIcon: React.FC<Props> = ({ size = 26, ...rest }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 26 26"
      fill="none"
      {...rest} 
    >
      <G clipPath="url(#clip0_1510_3207)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.5165 0.707692C13.2173 0.430771 12.7827 0.430768 12.4835 0.707691L0.889177 11.4397C0.116312 12.1551 0.571742 13.5523 1.57779 13.5523H3.34544L3.78107 23.2298C3.83832 24.5015 4.78331 25.5 5.92967 25.5H11.1176C11.5632 25.5 11.9244 25.0988 11.9244 24.6039V17.1366C11.9244 16.8067 12.1651 16.5392 12.4622 16.5392H13.5378C13.8349 16.5392 14.0756 16.8067 14.0756 17.1366V24.6039C14.0756 25.0988 14.4368 25.5 14.8824 25.5H20.0703C21.2167 25.5 22.1617 24.5015 22.2189 23.2298L22.6546 13.5523H24.4222C25.4283 13.5523 25.8837 12.1551 25.1108 11.4397L13.5165 0.707692Z"
          fill="url(#paint0_linear_1510_3207)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_1510_3207"
          x1="0.5"
          y1="13"
          x2="25.5"
          y2="13"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#1B2351" />
          <Stop offset="1" stopColor="#47C0D2" />
        </LinearGradient>
        <ClipPath id="clip0_1510_3207">
          <Rect width="25" height="25" fill="white" transform="translate(0.5 0.5)" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default HomeIcon;

