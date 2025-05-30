import { useState } from "react";

export default function ActionTracker() {
  const [actionsUsed, setActionsUsed] = useState({
    action: false,
    bonus: false,
    reaction: false,
    movement: false,
  });

  const toggleAction = (type) => {
    setActionsUsed((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <div>
      <h3 className="text-xl mt-4 mb-2">Action Economy</h3>
      <div className="flex gap-3 flex-wrap">
        {Object.entries(actionsUsed).map(([key, used]) => (
          <button
            key={key}
            onClick={() => toggleAction(key)}
            className={\`px-4 py-2 rounded text-white \${used ? "bg-red-600" : "bg-green-600"}\`}
          >
            {used ? \`\${key} used\` : \`Use \${key}\`}
          </button>
        ))}
      </div>
    </div>
  );
}