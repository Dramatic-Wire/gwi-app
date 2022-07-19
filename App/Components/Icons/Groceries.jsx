import Svg, { Path } from "react-native-svg"

const Groceries = ({ fill, stroke}) => (
  <Svg
    viewBox="0 0 50 50"
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeMiterlimit: 1.5,
    }}
  >
    <Path
      d="M212.331 75.283c.115-.992.236-2.154.698-2.914.458-.754 1.724-.973 2.072-1.647.348-.674.014-2.397.014-2.397l3.27-.007s-.047 1.884.276 2.566c.322.68 1.261.934 1.662 1.525a4.49 4.49 0 0 1 .744 2.019c.134 1.262.058 5.554.058 5.554l-8.966-.092s.027-3.353.172-4.607Z"
      style={{
        fill,
        stroke,
        strokeWidth: ".81px",
      }}
      transform="translate(-232.06 -80.654) scale(1.23637)"
    />
    <Path
      d="M204.089 74.378c.281-.81 1.266-1.562 2.117-1.46 2.685.32 3.285 2.781 3.285 2.781s2.183-1.092 3.469-.257c.588.382 1.027 1.065 1.159 1.753.145.755-.289 2.777-.289 2.777l-10.078.013s-.072-4.429.337-5.607Z"
      style={{
        fill,
        stroke,
        strokeWidth: ".81px",
      }}
      transform="translate(-232.06 -80.654) scale(1.23637)"
    />
    <Path
      d="M194.806 79.894c-.137-7.812 3.523-14.457 5.073-13.795 2.286.976 3.749 3.784 5.034 13.951.554 4.386-10.02 4.803-10.107-.156Z"
      style={{
        fill,
        stroke,
        strokeWidth: ".81px",
      }}
      transform="translate(-232.06 -80.654) scale(1.23637)"
    />
    <Path
      d="m192.809 79.876 30.213-.2-.101 25.191-30.11-.162-.002-24.829Z"
      style={{
        fill,
        stroke,
        strokeWidth: ".81px",
      }}
      transform="translate(-232.06 -80.654) scale(1.23637)"
    />
    <Path
      d="m217.929 80.298.048 19.426 4.441 4.765M217.977 99.724l-5.426 4.826-.043-24.508M200.852 72.449l-2.623 2.553M201.105 76.305l-2.394 2.373M210.813 70.197c.164.546.494 1.639.301 2.433-.217.893-1.142 2.248-1.604 2.925"
      style={{
        fill: "none",
        stroke,
        strokeWidth: ".81px",
      }}
      transform="translate(-232.06 -80.654) scale(1.23637)"
    />
    <Path
      d="m214.332 68.415 4.89.047-.054-2.418-4.862.007.026 2.364Z"
      style={{
        fill,
        stroke,
        strokeWidth: ".81px",
      }}
      transform="translate(-232.06 -80.654) scale(1.23637)"
    />
    <Path
      style={{
        fill: "none",
      }}
      d="M548.115 133.895h41.028v43.172h-41.028z"
      transform="matrix(1.21869 0 0 1.15817 -667.981 -155.073)"
    />
  </Svg>
)

export default Groceries
