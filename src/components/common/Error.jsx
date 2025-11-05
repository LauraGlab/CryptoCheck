import blob from "../../assets/blob.svg";
import "./../../css/common/Error.css";

export default function Error({
  title = "Oops! Something went wrong",
  message = "We couldn't load the data. Please try again later or check the URL.",
}) {
  return (
    <div className="error-page">
      <img src={blob}/>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}