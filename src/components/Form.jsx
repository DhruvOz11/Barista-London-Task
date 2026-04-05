export const Form = ({ title, children }) => (
  <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h2 className="text-base font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="px-5 py-5 flex flex-col gap-4">{children}</div>
    </div>
  </div>
);
