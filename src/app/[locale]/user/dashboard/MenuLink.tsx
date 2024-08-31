"use client";

import { usePathname } from "next/navigation";
import Button from "../../../../components/widgets/forms/Button";

export type Link = {
  title: string;
  path: string;
};

type Props = {
  link: Link;
};

export default function MenuLink({ link }: Props) {
  const pathname = usePathname();
  const active = pathname == link.path;

  return (
    <Button variant={active ? "primary" : "secondary"} href={link.path}>
      {link.title}
    </Button>
  );
}
