import { ImageResponse } from "next/og";
import { stringToHash } from "../../../helpers/stringHash";

const size = 512;

type Color = {
  background: string;
  foreground: string;
};

const colors: Color[] = [
  {
    background: "#74c7d3",
    foreground: "#333333",
  },
  {
    background: "#fecb2e",
    foreground: "#333333",
  },
  {
    background: "#339955",
    foreground: "#ffffff",
  },
  {
    background: "#cc2222",
    foreground: "#ffffff",
  },
  {
    background: "#003849",
    foreground: "#ffffff",
  },
];

function getInitials(text: string): string {
  const words = text.split(" ");
  return (
    getInitial(words[0]) +
    (words.length > 1 ? getInitial(words[words.length - 1]) : "")
  );
}

function getInitial(word: string): string {
  return word.charAt(0).toUpperCase();
}

export async function getProfileImageResponse(
  name: string,
): Promise<ImageResponse> {
  const lalezar = await (
    await fetch(
      "https://github.com/BornaIz/Lalezar/raw/master/fonts/Lalezar-Regular.ttf",
      { cache: "force-cache" },
    )
  ).arrayBuffer();

  const initials = getInitials(name);
  const colorIndex = Math.abs(stringToHash(name)) % colors.length;
  const color = colors[colorIndex];

  return new ImageResponse(
    (
      <div
        style={{
          height: `${size}px`,
          width: `${size}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "10%",
          fontSize: `${size / 2}px`,
          fontFamily: "Lalezar",
          backgroundColor: color.background,
          color: color.foreground,
        }}
      >
        {initials}
      </div>
    ),
    {
      width: size,
      height: size,
      fonts: [
        {
          data: lalezar,
          name: "Lalezar",
        },
      ],
    },
  );
}
