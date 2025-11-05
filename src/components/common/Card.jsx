import "./../../css/common/Card.css";

export default function Card({
  icon,
  image,
  title,
  description,
  header,
  body,
  footer,
  onClick,
  favorite,
  onToggleFav,
}) {
  return (
    <div className="card glass" onClick={onClick}>
      {icon && (
        <div className="card__icon-wrapper">
          <div className="card__icon">{icon}</div>
        </div>
      )}
      {image && <div className="card__image">{image}</div>}
      <div className="card__content">
        {header ? (
          <div className="card__header">{header}</div>
        ) : (
          title && <h3 className="card__title">{title}</h3>
        )}

        {body ? (
          <div className="card__body">{body}</div>
        ) : (
          description && <p className="card__description">{description}</p>
        )}
        {footer && <div className="card__footer">{footer}</div>}
      </div>

      {onToggleFav && (
        <button
          className={`card__fav-button ${favorite ? "favorite" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFav();
          }}
          aria-label="Toggle favorite"
        >
          ★
        </button>
      )}
    </div>
  );
}
