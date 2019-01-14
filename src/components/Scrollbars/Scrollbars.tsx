import * as React from "react";
import CustomScrollbars from "react-custom-scrollbars";

type ScrollbarsProps = {
  children?: any;
  height: number;
  assignRef: (component: CustomScrollbars) => void;
};

const renderTrackVertical = ({ style, ...props }) => (
  <div {...props} style={{ ...style, backgroundColor: "red" }} />
);

export const Scrollbars = (props: ScrollbarsProps) => {
  const { children, height, assignRef, ...rest } = props;

  return (
    <CustomScrollbars ref={assignRef} style={{ height }} renderThumbVertical={renderTrackVertical}>
      {children}
    </CustomScrollbars>
  );
};
