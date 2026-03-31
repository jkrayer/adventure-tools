/**
 * Card component
 * A simple card component that can be used to display content in a card format.
 * It accepts children as props and renders them inside the card.
 */

import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
};

function Card({ children }: CardProps) {
  return <div className="card">{children}</div>;
}

/**
 * Convert to compound component pattern
 * This will allow us to create a more flexible and reusable card component.
 * We can create subcomponents for the card header, body, and footer, and use them inside the Card component.
 */
Card.Header = function CardHeader({ children }: { children: ReactNode }) {
  return <div className="card-header">{children}</div>;
};

Card.Sub = function CardSub({ children }: { children: ReactNode }) {
  return <span className="card-sub">{children}</span>;
};

{
  /* <label for="fuel">Fuel level:</label>; */
}

Card.Meter = function CardMeter({
  max = 100,
  value = 90,
}: {
  max?: number;
  value?: number;
}) {
  const percentage = (value / max) * 100;

  const barStyle =
    percentage > 66 ? "green" : percentage > 33 ? "yellow" : "red";

  return (
    <div
      aria-label="Hit Points"
      aria-valuetext={`${value} of ${max} HP`}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      className="card-meter"
      role="meter"
    >
      <div
        className={`card-meter-fill ${barStyle}`}
        role="presentation"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default Card;
