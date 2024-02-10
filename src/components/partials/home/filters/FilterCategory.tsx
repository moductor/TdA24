import { useState, type ReactNode } from "react";

import styles from "./FilterCategory.module.scss";

type Props = {
  title: string;
  expanded?: boolean;
  children: ReactNode;
};

export default ({ title, expanded: expandedInit = false, children }: Props) => {
  const [expanded, setExpanded] = useState(expandedInit);
  const toggleExpanded = () => setExpanded((prev) => !prev);

  return (
    <div data-filter-category={expanded ? "expanded" : "collapsed"}>
      <div className={styles["header"]} onClick={toggleExpanded}>
        <h3>{title}</h3>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          className={styles["icon"]}
          aria-hidden="true"
        >
          <path d="m 1.996094 5 v 1 c 0 0.277344 0.113281 0.527344 0.292968 0.707031 l 5.707032 5.707031 l 5.707031 -5.707031 c 0.183594 -0.179687 0.292969 -0.429687 0.292969 -0.707031 v -1 h -1 c -0.273438 0 -0.523438 0.113281 -0.707032 0.292969 l -4.292968 4.292969 l -4.292969 -4.292969 c -0.179687 -0.179688 -0.429687 -0.292969 -0.707031 -0.292969 z m 0 0" />
        </svg>
      </div>

      {expanded && (
        <div className={styles["content-wrapper"]}>
          <div className={styles["content"]}>
            <div className={styles["content-spacing"]}>{children}</div>
          </div>
        </div>
      )}
    </div>
  );
};
