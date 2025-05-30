export default function Inventory({ items, strengthMod }) {
  const useItem = (item) => {
    if (item.type === "weapon") {
      alert(\`Attack with \${item.name} using +\${strengthMod} to hit\`);
    } else {
      alert(\`Use \${item.name}: \${item.description || "effect unknown"}\`);
    }
  };

  return (
    <div>
      <h3 className="text-xl mb-2">Inventory</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.id || item.name}
            className="flex justify-between bg-gray-800 p-3 rounded"
          >
            <span>{item.name}</span>
            <button
              className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
              onClick={() => useItem(item)}
            >
              Use
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}