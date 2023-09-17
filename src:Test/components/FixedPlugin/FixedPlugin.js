/*eslint-disable*/
import React, { Component } from "react";
import classnames from "classnames";


export default function FixedPlugin(props) {

  return (
    <div
      className={classnames("fixed-plugin", {
        "rtl-fixed-plugin": props.rtlActive
      })}
    >
    </div>
  );
}

FixedPlugin.propTypes = {
};
