import React from "react";
export const ListboxWrapper = ({children}) => (
  <div className="w-full max-w-[350px] border-small px-1 py-2 rounded-medium border-gray-300 dark:border-default-100  hidden lg:block">
    {children}
  </div>
);
