import * as React from "react"
import Svg, { Path } from "react-native-svg"

const Clothing = ({ fill, stroke}) => (
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
      d="M442.686 90.994c.395-.337 1.186-1.011 1.788-.869.603.142 1.606 1.17 1.827 1.72.206.514-.183 1.231-.5 1.582-.316.352-1.038.469-1.399.527"
      style={{
        fill: "none",
        stroke,
        strokeWidth: ".75px",
      }}
      transform="translate(-559.159 -106.27) scale(1.33655)"
    />
    <Path
      d="m444.402 93.954.193 1.532 7.015 2.6h-14.085l7.07-2.6M453.307 98.176l.143 2.336 1.826 13.151-9.036 2.422-2.022-5.946-1.877 6.033-8.981-2.139 1.715-15.947 18.232.09Z"
      style={{
        fill,
        stroke,
        strokeWidth: ".75px",
      }}
      transform="translate(-559.159 -106.27) scale(1.33655)"
    />
    <Path
      d="m453.45 100.512-18.635-.007M444.076 100.509l.191 6.073M444.21 104.757s1.535-.605 1.858-1.28c.323-.674.077-2.766.077-2.766M450.357 100.81s.612 2.108 1.253 2.929c.615.788 2.594 1.999 2.594 1.999"
      style={{
        fill: "none",
        stroke,
        strokeWidth: ".75px",
      }}
      transform="translate(-559.159 -106.27) scale(1.33655)"
    />
    <Path
      d="m423.1 93.704.04 15.94 15.182.054V93.663l.833 4.662 3.531-.959s-.891-6.501-1.619-8.208c-.446-1.047-1.748-1.484-2.745-2.034-1.039-.574-3.488-1.408-3.488-1.408h-7.969s-4.854 1.454-6.117 3.306c-1.336 1.959-1.897 8.445-1.897 8.445l3.27.962.979-4.725Z"
      style={{
        fill,
        stroke,
        strokeWidth: ".75px",
      }}
      transform="translate(-559.159 -106.27) scale(1.33655)"
    />
    <Path
      d="m423.133 106.912 15.189.225M426.771 85.716s1.107 4.202 3.997 4.047c3.006-.162 4.066-4.047 4.066-4.047M430.728 85.716s-.153-.97.074-1.365c.351-.609 2.187-.386 2.03-2.289-.056-.679-.679-1.711-2.03-1.801-.595-.04-1.264.526-1.598.809"
      style={{
        fill: "none",
        stroke,
        strokeWidth: ".75px",
      }}
      transform="translate(-559.159 -106.27) scale(1.33655)"
    />
    <Path
      style={{
        fill: "none",
      }}
      d="M548.115 133.895h41.028v43.172h-41.028z"
      transform="matrix(1.21869 0 0 1.15817 -667.981 -155.074)"
    />
  </Svg>
)

export default Clothing
