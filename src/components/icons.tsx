import type { SVGProps } from "react";

/* A small, consistent icon set: 20px grid, 1.5px stroke, square caps — drawn to match Archivo's geometry. */

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 20, children, ...rest }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 10h13M11 5l5 5-5 5" />
  </Svg>
);

export const ArrowUp = (p: IconProps) => (
  <Svg {...p}>
    <path d="M10 17V4M5 9l5-5 5 5" />
  </Svg>
);

export const ArrowDown = (p: IconProps) => (
  <Svg {...p}>
    <path d="M10 3v13M5 11l5 5 5-5" />
  </Svg>
);

export const Play = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 4.5v11l9-5.5-9-5.5Z" fill="currentColor" stroke="none" />
  </Svg>
);

export const Pause = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6.5 4.5v11M13.5 4.5v11" strokeWidth={2.25} strokeLinecap="butt" />
  </Svg>
);

export const SoundOn = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.5 7.5h3l4-3.5v12l-4-3.5h-3v-5Z" />
    <path d="M13.5 7.2a4 4 0 0 1 0 5.6M15.6 5.2a7 7 0 0 1 0 9.6" strokeLinecap="round" />
  </Svg>
);

export const SoundOff = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.5 7.5h3l4-3.5v12l-4-3.5h-3v-5Z" />
    <path d="M13.5 8l4 4M17.5 8l-4 4" />
  </Svg>
);

export const Menu = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 6h14M3 10h14M3 14h14" />
  </Svg>
);

export const Close = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4.5 4.5l11 11M15.5 4.5l-11 11" />
  </Svg>
);

export const Download = (p: IconProps) => (
  <Svg {...p}>
    <path d="M10 3v10M5.5 8.5 10 13l4.5-4.5M4 16.5h12" />
  </Svg>
);

export const Phone = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6.2 3.5 8 7.2 6.6 8.6a9 9 0 0 0 4.8 4.8L12.8 12l3.7 1.8-.6 2.6c-.2.6-.7 1-1.3 1A12.6 12.6 0 0 1 2.6 5.4c0-.6.4-1.1 1-1.3l2.6-.6Z" strokeLinejoin="round" />
  </Svg>
);

export const Mail = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 5h14v10H3z" />
    <path d="m3.5 5.5 6.5 5 6.5-5" />
  </Svg>
);

export const Globe = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="10" cy="10" r="7" />
    <path d="M3 10h14M10 3c2 2 2.8 4.4 2.8 7s-.8 5-2.8 7c-2-2-2.8-4.4-2.8-7S8 5 10 3Z" />
  </Svg>
);

export const Check = (p: IconProps) => (
  <Svg {...p}>
    <path d="m4 10.5 4 4 8-9" />
  </Svg>
);
