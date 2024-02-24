import { ImageResponse } from "next/og";
import { NextRequest, NextResponse } from "next/server";
import { get as getLecturer } from "../../../../../database/functions/Lecturer";
import { get as getUser } from "../../../../../database/functions/User";
import { stringToHash } from "../../../../../helpers/stringHash";

const size = 512;

type Params = {
  uuid: string;
};

type Props = {
  params: Params;
};

export async function GET(_: NextRequest, { params }: Props) {
  const user = await getUser(params.uuid);

  if (!user) return new NextResponse(null, { status: 404 });

  if (user.lecturerId) {
    const lecturer = await getLecturer(user.lecturerId);
    if (lecturer && lecturer.picture_url) {
      const res = await fetch(lecturer.picture_url, { cache: "force-cache" });
      return new NextResponse(res.body);
    }
  }

  const lalezar = await (
    await fetch(
      "https://github.com/BornaIz/Lalezar/raw/master/fonts/Lalezar-Regular.ttf",
      { cache: "force-cache" },
    )
  ).arrayBuffer();

  const name = user.name || user.username;
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
    background: "#e61919",
    foreground: "#ffffff",
  },
  {
    background: "#003849",
    foreground: "#ffffff",
  },
];
