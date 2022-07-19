 import Svg, { Path, Ellipse } from "react-native-svg"

const CoffeeShop = ({ stroke, fill }) => (
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
      d="m618.243 57.873 24.418-.116.119 4.395-24.24.283-.297-4.562ZM621.711 57.46l.12-3.814 17.416.171.261 3.629-17.797.014ZM619.723 62.435l2.01 30.266 17.766.123 2.095-30.389h-21.871Z"
      style={{
        fill,
        stroke,
        strokeWidth: ".82px",
      }}
      transform="translate(-747.504 -64.728) scale(1.2252)"
    />
    <Path
      d="m618.243 69.416 24.537.285-1.646 18-21.009-.035-1.882-18.25Z"
      style={{
        fill,
        stroke,
        strokeWidth: ".82px",
      }}
      transform="translate(-747.504 -64.728) scale(1.2252)"
    />
    <Ellipse
      cx={467.991}
      cy={321.08}
      rx={7.749}
      ry={8.211}
      style={{
        fill,
        stroke,
        strokeWidth: "1.82px",
      }}
      transform="matrix(.33515 -.36128 .44011 .40828 -273.728 65.536)"
    />
    <Path
      d="M460.588 313.704c.228 1.16.684 3.48 1.895 4.275 1.211.796 4.298-.12 5.371.496.975.559.72 2.129 1.069 3.197.355 1.087.342 2.606 1.058 3.32s2.399.88 3.24.964"
      style={{
        fill: "none",
        stroke,
        strokeWidth: "1.79px",
      }}
      transform="translate(-236.53 -151.919) scale(.56013)"
    />
    <Ellipse
      cx={471.236}
      cy={325.299}
      rx={0.749}
      ry={4.84}
      style={{
        fill,
        stroke,
        strokeWidth: ".21px",
      }}
      transform="matrix(6.13317 2.37708 -.4812 1.24158 -2708.09 -1490.388)"
    />
    <Path
      d="M472 320.737c.234 1.69.701 5.071-.007 6.912-.709 1.841-2.973 2.77-4.245 4.135-1.202 1.29-2.794 2.399-3.392 4.058-.606 1.683-.367 4.591-.247 6.045"
      style={{
        fill: "none",
        stroke,
        strokeWidth: "1.79px",
      }}
      transform="translate(-236.53 -151.919) scale(.56013)"
    />
    <Path
      style={{
        fill: "none",
      }}
      d="M548.115 133.895h41.028v43.172h-41.028z"
      transform="matrix(1.21869 0 0 1.15817 -667.98 -155.073)"
    />
  </Svg>
)

export default CoffeeShop
