type ButtonProps = {
  onShowForm: () => void;
};

export default function Sidebar({ onShowForm }: ButtonProps) {
  return (
    <aside className="w-64 bg-white border-r min-h-screen px-4 py-6">
      {/* CreateFAQ Button */}
      <div className="mb-6">
        <button
          onClick={onShowForm}
          type="button"
          className="w-full px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded hover:bg-gray-300 transition"
          
          >
          CreateFAQ
        </button>
      </div>

      {/* FAQ Navigation */}
    <ul className="flex flex-col space-y-2">
    <li className="block px-4 py-2 rounded hover:bg-gray-100">
        FAQ1
    </li>
  </ul>
    </aside>
  );
}