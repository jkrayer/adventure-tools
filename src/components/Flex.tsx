/**
 * Card component
 * A simple card component that can be used to display content in a card format.
 * It accepts children as props and renders them inside the card.
 */

import type { ReactNode } from "react";

type FlexProps = {
  children: ReactNode;
  justifyContent?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around";
};

function Flex({ children, justifyContent = "flex-start" }: FlexProps) {
  return (
    <div className="flex" style={{ justifyContent }}>
      {children}
    </div>
  );
}

// Card.Meter = function CardMeter({
//   max = 100,
//   value = 90,
// }: {
//   max?: number;
//   value?: number;
// }) {
//   const percentage = (value / max) * 100;

//   const barStyle =
//     percentage > 66 ? "green" : percentage > 33 ? "yellow" : "red";

//   return (
//     <div
//       aria-label="Hit Points"
//       aria-valuetext={`${value} of ${max} HP`}
//       aria-valuemin={0}
//       aria-valuemax={max}
//       aria-valuenow={value}
//       className="card-meter"
//       role="meter"
//     >
//       <div
//         className={`card-meter-fill ${barStyle}`}
//         role="presentation"
//         style={{ width: `${percentage}%` }}
//       />
//     </div>
//   );
// };

export default Flex;
