const Dunastone = () => {
  return (
    <filter
      id="dunastone"
      x="-10%"
      y="-10%"
      width="120%"
      height="120%"
      filterUnits="objectBoundingBox"
      primitiveUnits="userSpaceOnUse"
      colorInterpolationFilters="linearRGB"
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
        <feFuncR type="table" tableValues="0 1 1 0.98 0 1" />
        <feFuncG type="table" tableValues="0.34 0 0.43 0.75 1 1" />
        <feFuncB type="table" tableValues="0.78 0.64 0 0.18 0.88 1" />
        <feFuncA type="table" tableValues="0 1" />
      </feComponentTransfer>
      <feBlend
        mode="normal"
        in="componentTransfer"
        in2="SourceGraphic"
        result="blend"
      />
    </filter>
  );
};

export default Dunastone;
