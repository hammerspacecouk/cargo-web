import * as React from "react";

const calculate = (children: any, index: number) => {
  const childCount = React.Children.count(children);
  if (childCount <= 1) {
    children = [children];
  }
  let token;
  let childIndex = 0;

  while (!token && childIndex < childCount) {
    const child = children[childIndex++];

    if (typeof child !== "string") {
      if (!index) {
        token = child;
      } else {
        index--;
      }
    } else if (index < child.length) {
      token = child.charAt(index);
    } else {
      index = index - child.length;
    }
  }

  return [token, index];
};

// for breaking up components into token so they can be animated back one at a time
export const componentTokenAt = (component: any, index: number) => {
  const [token] = calculate(component, index);
  return token;
};
