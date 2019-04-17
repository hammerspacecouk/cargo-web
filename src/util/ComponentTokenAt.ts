import * as React from "react";

const calculate = (children, index) => {
  const childCount = React.Children.count(children);
  if (childCount <= 1) {
    children = [children];
  }
  let token;
  let childIndex = 0;

  while (!token && childIndex < childCount) {
    let child = children[childIndex++];

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

export const componentTokenAt = (component, index) => {
  const [token] = calculate(component, index);
  return token;
};
