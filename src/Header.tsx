const Header = () => {
  return (
    <header className="flex justify-between items-center p-5 bg-white border-b border-gray-200">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Visual Workflow Builder</h1>
        <p className="mt-1 text-sm text-gray-500">Drag and drop components to create custom nudge workflows</p>
      </div>
      <button className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
        New Workflow
      </button>
    </header>
  );
};

export default Header;
