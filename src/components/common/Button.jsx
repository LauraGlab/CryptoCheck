import { Link } from "react-router-dom";
import "./../../css/common/Button.css";

export default function Button({ text, path }) {
  return (
    <Link to={path}>
      <button className="button">{text}</button>
    </Link>
  );
}
