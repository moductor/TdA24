import getClassNames from "classnames";

type Styles = {
  [className: string]: string;
};

export function styleClasses(styles?: Styles, ...classNames: string[]) {
  const classes: classNames.ArgumentArray = [];

  for (const className of classNames) {
    if (styles) classes.push(styles[className]);
    classes.push(className);
  }

  return getClassNames(...classes);
}
