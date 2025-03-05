import { ReactNode } from "react";
import { Transition } from "@headlessui/react"

interface SlideTransitionProps {
  show: boolean;
  children: ReactNode;
  direction?: "left" | "right" | "up" | "down";
}

const SlideTransition = ({ 
  show, 
  children, 
  direction = "right" 
}: SlideTransitionProps) => {
  const getTransitionClasses = () => {
    const transitions = {
      right: {
        enter: "transform transition-transform duration-300",
        enterFrom: "translate-x-full",
        enterTo: "translate-x-0",
        leave: "transform transition-transform duration-300",
        leaveFrom: "translate-x-0",
        leaveTo: "translate-x-full",
      },
      left: {
        enter: "transform transition-transform duration-300",
        enterFrom: "-translate-x-full",
        enterTo: "translate-x-0",
        leave: "transform transition-transform duration-300",
        leaveFrom: "translate-x-0",
        leaveTo: "-translate-x-full",
      },
      up: {
        enter: "transform transition-transform duration-300",
        enterFrom: "-translate-y-full",
        enterTo: "translate-y-0",
        leave: "transform transition-transform duration-300",
        leaveFrom: "translate-y-0",
        leaveTo: "-translate-y-full",
      },
      down: {
        enter: "transform transition-transform duration-300",
        enterFrom: "translate-y-full",
        enterTo: "translate-y-0",
        leave: "transform transition-transform duration-300",
        leaveFrom: "translate-y-0",
        leaveTo: "translate-y-full",
      },
    };

    return transitions[direction];
  };

  const { enter, enterFrom, enterTo, leave, leaveFrom, leaveTo } = getTransitionClasses();

  return (
    <Transition
      show={show}
      enter={enter}
      enterFrom={enterFrom}
      enterTo={enterTo}
      leave={leave}
      leaveFrom={leaveFrom}
      leaveTo={leaveTo}
    >
      {children}
    </Transition>
  );
};

export default SlideTransition; 