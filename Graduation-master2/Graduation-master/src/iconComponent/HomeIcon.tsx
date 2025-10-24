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
  active?: boolean;
}

const HomeIcon: React.FC<Props> = ({ size = 26, active = false, ...rest }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 26 26"
      fill="none"
      {...rest}
    >
      {active ? (
        <G clipPath="url(#clip0_1510_3207)">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.5165 0.707692C13.2173 0.430771 12.7827 0.430768 12.4835 0.707691L0.889177 11.4397C0.116312 12.1551 0.571742 13.5523 1.57779 13.5523H3.34544L3.78107 23.2298C3.83832 24.5015 4.78331 25.5 5.92967 25.5H11.1176C11.5632 25.5 11.9244 25.0988 11.9244 24.6039V17.1366C11.9244 16.8067 12.1651 16.5392 12.4622 16.5392H13.5378C13.8349 16.5392 14.0756 16.8067 14.0756 17.1366V24.6039C14.0756 25.0988 14.4368 25.5 14.8824 25.5H20.0703C21.2167 25.5 22.1617 24.5015 22.2189 23.2298L22.6546 13.5523H24.4222C25.4283 13.5523 25.8837 12.1551 25.1108 11.4397L13.5165 0.707692Z"
            fill="url(#paint0_linear_1510_3207)"
          />
        </G>
      ) : (
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.0165 0.207692C12.7173 -0.0692291 12.2827 -0.0692318 11.9835 0.207691L0.389177 10.9397C-0.383688 11.6551 0.0717419 13.0523 1.07779 13.0523H2.84544L3.28107 22.7298C3.33832 24.0015 4.28331 25 5.42967 25H10.6176C11.0632 25 11.4244 24.5988 11.4244 24.1039V16.6366C11.4244 16.3067 11.6652 16.0392 11.9622 16.0392H13.0378C13.3349 16.0392 13.5756 16.3067 13.5756 16.6366V24.1039C13.5756 24.5988 13.9368 25 14.3824 25H19.5703C20.7167 25 21.6617 24.0015 21.7189 22.7298L22.1546 13.0523H23.9222C24.9283 13.0523 25.3837 11.6551 24.6108 10.9397L13.0165 0.207692Z"
          stroke="url(#paint0_linear_1510_3207)"
          strokeWidth={2}
        />
      )}

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



