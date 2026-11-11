export default function ProblemDrawing() {
  return <div className="problem-drawing" role="img" aria-label="From a tangled problem, through understanding and building, to a focused product.">
    <div className="drawing-header"><span>FIELD NOTES</span><span>FIG. 001</span></div>
    <svg viewBox="0 0 340 405" fill="none" aria-hidden="true">
      <path className="drawing-guide" d="M170 10v373M16 105h308M16 278h308" />
      <path className="problem-thread" d="M140 111C86 119 83 51 124 45c42-6 95 107 129 72s-80-110-116-79c-38 33 89 108 105 63S124 8 112 59c-13 51 118 106 142 54s-78-109-118-68c-40 41 55 94 88 56s-62-85-90-55c-27 29 54 86 82 66s-18-57-42-44c-24 14-8 44 10 45" />
      <path className="connecting-thread" d="M184 113c12 38-44 38-23 70s30 37 9 68v32" />
      <path d="m164 275 6 8 6-8" stroke="currentColor" strokeWidth="1.3" />
      <g className="product-grid">
        <path d="M119 292h102v102H119zM153 292v102m34-102v102m-68-68h102m-102 34h102" />
        <path d="M153 326h34v34h-34z" className="grid-center" />
      </g>
      <path d="M258 78h48m-48 0-6 6m6-6-6-6M186 193h44m-44 0-6 6m6-6-6-6M225 345h62" className="annotation-rule" />
      <text x="250" y="65">the messy part</text>
      <text x="238" y="190">understand</text>
      <text x="238" y="205">then build</text>
      <text x="244" y="335">a useful thing</text>
    </svg>
    <div className="drawing-footer"><span>PROBLEM</span><span className="drawing-down">↓</span><span>PRODUCT</span></div>
  </div>
}
