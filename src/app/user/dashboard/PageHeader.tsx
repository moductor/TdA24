"use client";

import { usePathname } from "next/navigation";
import { styleClasses } from "../../../helpers/styleClasses";
import { Link } from "./MenuLink";
import styles from "./PageHeader.module.scss";

type Props = {
  links: Link[];
};

export default function PageHeader({ links }: Props) {
  const pathname = usePathname();
  const link = links.find((link) => link.path == pathname);

  if (!link) return <></>;

  return (
    <div className={styleClasses(styles, "header")}>
      <h1 className="title-2">{link.title}</h1>
      <hr />
    </div>
  );
}
