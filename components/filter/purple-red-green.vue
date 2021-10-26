<template>
  <filter
    id="purple-red-green"
    x="-10%"
    y="-10%"
    width="120%"
    height="120%"
    filterUnits="objectBoundingBox"
    primitiveUnits="userSpaceOnUse"
    color-interpolation-filters="sRGB"
  >
    <feColorMatrix
      type="matrix"
      values=".33 .33 .33 0 0
            .33 .33 .33 0 0
            .33 .33 .33 0 0
            0 0 0 1 0"
      in="SourceGraphic"
      result="colormatrix"
    />
    <feComponentTransfer in="colormatrix" result="componentTransfer">
      <feFuncR type="table" tableValues="0.13 0.37 0.92 1 0.5 1" />
      <feFuncG type="table" tableValues="0 0.2 0.12 0.6 1 0.97" />
      <feFuncB type="table" tableValues="0.6 1 0.2 0.93 0.83 0.76" />
      <feFuncA type="table" tableValues="0 1" />
    </feComponentTransfer>
    <feBlend
      mode="color"
      in="componentTransfer"
      in2="SourceGraphic"
      result="blend"
    />
  </filter>
</template>
