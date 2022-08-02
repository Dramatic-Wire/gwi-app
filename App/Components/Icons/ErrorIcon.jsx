import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
      <Circle cx={16} cy={16} r={14} fill="#ffde95" />
      <Path
        fill="#e85869"
        d="M16 20a1 1 0 01-1-1V9a1 1 0 012 0v10a1 1 0 01-1 1z"
      />
      <Circle cx={16} cy={23} r={1} fill="#e85869" />
    </Svg>
  )
}

export default SvgComponent
