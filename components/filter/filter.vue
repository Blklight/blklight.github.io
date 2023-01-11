<template>
  <div>
    <filter
      id="filter-1"
      x="-10%"
      y="-10%"
      width="120%"
      height="120%"
      filterUnits="objectBoundingBox"
      primitiveUnits="userSpaceOnUse"
      color-interpolation-filters="linearRGB"
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
        <feFuncR type="table" tableValues="0 0.92 0 0 1 1" />
        <feFuncG type="table" tableValues="0 0.12 0.57 1 0.97 1" />
        <feFuncB type="table" tableValues="0 0.2 1 0.98 0 1" />
        <feFuncA type="table" tableValues="0 1" />
      </feComponentTransfer>
      <feBlend
        mode="normal"
        in="componentTransfer"
        in2="SourceGraphic"
        result="blend"
      />
    </filter>
    <filter
      id="filter-2"
      x="-10%"
      y="-10%"
      width="120%"
      height="120%"
      filterUnits="objectBoundingBox"
      primitiveUnits="userSpaceOnUse"
      color-interpolation-filters="linearRGB"
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
        <feFuncR type="table" tableValues="0.92 0 0 1" />
        <feFuncG type="table" tableValues="0.12 0.57 1 1" />
        <feFuncB type="table" tableValues="0.2 1 0.98 1" />
        <feFuncA type="table" tableValues="0 1" />
      </feComponentTransfer>
      <feBlend
        mode="normal"
        in="componentTransfer"
        in2="SourceGraphic"
        result="blend"
      />
    </filter>
    <filter
      id="filter-3"
      x="-10%"
      y="-10%"
      width="120%"
      height="120%"
      filterUnits="objectBoundingBox"
      primitiveUnits="userSpaceOnUse"
      color-interpolation-filters="linearRGB"
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
        <feFuncR type="table" tableValues="0 0.28 0.92 1" />
        <feFuncG type="table" tableValues="0 0.04 0.12 0.84" />
        <feFuncB type="table" tableValues="0 1 0.2 0" />
        <feFuncA type="table" tableValues="0 1" />
      </feComponentTransfer>
      <feBlend
        mode="normal"
        in="componentTransfer"
        in2="SourceGraphic"
        result="blend"
      />
    </filter>
    <filter
      id="filter-4"
      x="-10%"
      y="-10%"
      width="120%"
      height="120%"
      filterUnits="objectBoundingBox"
      primitiveUnits="userSpaceOnUse"
      color-interpolation-filters="linearRGB"
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
        <feFuncR type="table" tableValues="0.28 0.92 1" />
        <feFuncG type="table" tableValues="0.04 0.12 0.84" />
        <feFuncB type="table" tableValues="1 0.2 0" />
        <feFuncA type="table" tableValues="0 1" />
      </feComponentTransfer>
      <feBlend
        mode="normal"
        in="componentTransfer"
        in2="SourceGraphic"
        result="blend"
      />
    </filter>
  </div>
</template>
