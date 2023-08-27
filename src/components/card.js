import React from "react";

// inclusion of a Card component that all our other components will be able to reference the info of
function Card(props) {
  // check if background color is set -- if not, set bg color
  function classes() {
    const bg = props.bgcolor ? "bg-" + props.bgcolor : " ";
    const txt = props.txtcolor ? "text-" + props.txtcolor : "text-white";
    return "card mb-3 " + bg + " " + txt;
  }

  // check for existence of properties, and add to page if exists
  return (
    <div className={classes()} id="card">
      <div className="card-header" style={{ fontSize: "1.5em" }}>
        {props.header}
      </div>
      <div className="card-body">
        {props.title && <h5 className="card-title">{props.title}</h5>}
        {props.text && <p className="card-title">{props.text}</p>}
        {props.body}
        {props.status && <div id="createStatus">{props.status}</div>}
      </div>
    </div>
  );
}

export default Card;
