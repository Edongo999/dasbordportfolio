import React from "react";

const SuccessMessage: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-10">
    <div className="w-12 h-12 bg-green-500 text-white flex items-center justify-center rounded-full">
      ✔
    </div>
    <p className="mt-4 text-green-600 font-semibold">Article publié !</p>
  </div>
);

export default SuccessMessage;
