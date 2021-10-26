<template>
  <filter
    id="black-green"
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
      <feFuncR type="table" tableValues="0.02 0.22" />
      <feFuncG type="table" tableValues="0.02 1" />
      <feFuncB type="table" tableValues="0.26 0" />
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
