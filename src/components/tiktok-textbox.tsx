interface TikTokTextBoxProps {
  lines: string[];
  align?: React.CSSProperties['textAlign'];
  fontFamily?: string;
  bgColor?: string;
  textColor?: string;
  className?: string;
  borderRadius?: string;
}

interface CornerRounding {
  TL: boolean;
  TR: boolean;
  BL: boolean;
  BR: boolean;
  classList: string[];
}

const defaultBorderRadius = "0.25em";

const getCornerRoundings = (
  lines: string[], 
  align?: React.CSSProperties['textAlign']
): CornerRounding[] => {
  const lengths = lines.map(line => line.length);
  const n = lengths.length;

  return lines.map((_, i) => {
    const isFirst = i === 0;
    const isLast = i === n - 1;
    const prevLen = i > 0 ? lengths[i - 1] : undefined;
    const nextLen = i < n - 1 ? lengths[i + 1] : undefined;
    const currLen = lengths[i];

    // Determine rounded corners
    let TL = isFirst || (prevLen !== undefined && currLen > prevLen);
    let TR = TL;
    let BL = isLast || (nextLen !== undefined && currLen > nextLen);
    let BR = BL;

 
    if (!isFirst && !isLast) {
      if (align === "left") {
        TL = BL = false;
      } else if (align === "right") {
        TR = BR = false;
      }
    }

    // Build class list
    const classList: string[] = [];
    if (align === "left") {
      if (!BR) classList.push("corner-br");
      if (!TR) classList.push("corner-tr");
    } else if (align === "right") {
      if (!BL) classList.push("corner-bl");
      if (!TL) classList.push("corner-tl");
    } else if (align === "center") {
      // LEFT side
      if (!TL && !BL) {
        classList.push("corner-left");
      } else {
        if (!TL) classList.push("corner-tl");
        if (!BL) classList.push("corner-bl");
      }
      // RIGHT side
      if (!TR && !BR) {
        classList.push("corner-right");
      } else {
        if (!TR) classList.push("corner-tr");
        if (!BR) classList.push("corner-br");
      }
    }

    return { TL, TR, BL, BR, classList };
  });
};

const getBorderRadius = (rounding: CornerRounding, radius: string = defaultBorderRadius) => {
  return [
    rounding.TL ? radius : "0",
    rounding.TR ? radius : "0",
    rounding.BR ? radius : "0",
    rounding.BL ? radius : "0"
  ].join(" ");
};

const TikTokTextLine: React.FC<{
  text: string;
  align?: React.CSSProperties['textAlign'];
  bgColor: string;
  borderRadius?: string;
  className?: string;
}> = ({ text, align, bgColor, borderRadius = defaultBorderRadius, className }) => {
  return (
    <div
      style={{
        position: "relative",
        textAlign: align,
        backgroundColor: bgColor ?? "white",
        padding: "0.15em 0.4em",
        borderRadius: borderRadius,
        width: "fit-content",
        transition: "border-radius 0.2s",
        "--bgColor": bgColor ?? "white", 
      } as React.CSSProperties}
      className={className}
    >
      {text}
    </div>
  );
};

export const TikTokTextBox: React.FC<TikTokTextBoxProps> = ({
  lines,
  align,
  fontFamily,
  bgColor = "white",
  textColor,
  borderRadius = defaultBorderRadius,
}) => {
  const roundings = getCornerRoundings(lines, align);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: align === "left"
            ? "flex-start"
            : align === "right"
              ? "flex-end"
              : "center",
          textAlign: align,
          fontFamily: fontFamily,
          color: textColor ?? "black",
          width: "fit-content",
        }}
      >
        {lines.map((line, i) => (
          <TikTokTextLine
            key={i}
            text={line}
            align={align}
            bgColor={bgColor}
            borderRadius={getBorderRadius(roundings[i], borderRadius)}
            className={`tiktok-text-line ${roundings[i].classList.join(" ")}`}
          />
        ))}
      </div><style>
        {`
          .tiktok-text-line.corner-tl::before,
          .tiktok-text-line.corner-bl::before, 
          .tiktok-text-line.corner-tr::after,
          .tiktok-text-line.corner-br::after {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            background-color: transparent;
            width: ${borderRadius};
            height: 100%;
            clip-path: inset(-1px);
          }
          .tiktok-text-line.corner-tl::before,
          .tiktok-text-line.corner-bl::before {
            left: -${borderRadius};
          }
          .tiktok-text-line.corner-tr::after,
          .tiktok-text-line.corner-br::after {
            right: -${borderRadius};
          }
          .tiktok-text-line.corner-tl::before {
            border-top-right-radius: ${borderRadius};
            box-shadow: 0em -0.4em 0 var(--bgColor);
          }
          .tiktok-text-line.corner-bl::before {
            border-bottom-right-radius: ${borderRadius};
            box-shadow: 0em 0.4em 0 var(--bgColor);
          }
          .tiktok-text-line.corner-tr::after {
            border-top-left-radius: ${borderRadius};
            box-shadow: 0em -0.4em 0 var(--bgColor);
          }
          .tiktok-text-line.corner-br::after {
            border-bottom-left-radius: ${borderRadius};
            box-shadow: 0.0em 0.4em 0 var(--bgColor);
          }
          .tiktok-text-line.corner-left::before {
            content: '';
            display: block;
            position: absolute;
            left: -${borderRadius};
            top: 0;
            width: ${borderRadius};
            height: 100%;
            background: transparent;
            border-top-right-radius: ${borderRadius};
            border-bottom-right-radius: ${borderRadius};
            box-shadow:
              0 -0.4em 0 var(--bgColor),
              0 0.4em 0 var(--bgColor);
          }
          .tiktok-text-line.corner-right::after {
            content: '';
            display: block;
            position: absolute;
            right: -${borderRadius};
            top: 0;
            width: ${borderRadius};
            height: 100%;
            background: transparent;
            border-top-left-radius: ${borderRadius};
            border-bottom-left-radius: ${borderRadius};
            box-shadow:
              0 -0.4em 0 var(--bgColor),
              0 0.4em 0 var(--bgColor);
          }
        }
      `}
      </style>
    </>
  );
};