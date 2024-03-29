import React, { useState, useEffect } from "react";
// it might be a project-level reusable hook
const useToggle = (initialState) => {
    const [isToggled, setIsToggled] = React.useState(initialState);

    // put [setIsToggled] into the useCallback's dependencies array
    // this value never changes so the callback is not going to be ever re-created
    const toggle = React.useCallback(
      () => setIsToggled(state => !state),
      [setIsToggled],
    );
  
    return [isToggled, toggle];
  }

  export default useToggle;