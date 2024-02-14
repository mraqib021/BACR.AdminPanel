import { MouseEventHandler } from "react";
type props = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  title: string;
  className?: string;
};
export default function CustomBtn(props: props) {
  return (
    <>
      <button
        onClick={props.onClick}
        className={`customBtn ${props.className}`}
      >
        {props.title}
      </button>
    </>
  );
}
