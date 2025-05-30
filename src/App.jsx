import { useState } from "react";
import CharacterSheet from "./components/CharacterSheet";

export default function App() {
  const [characterData, setCharacterData] = useState(null);

  const handleImport = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        setCharacterData(json);
      } catch (error) {
        alert("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <main className="p-6 font-mono text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">D&D Companion</h1>
      <input type="file" accept="application/json" onChange={handleImport} className="mb-6" />
      {characterData ? (
        <CharacterSheet data={characterData} />
      ) : (
        <p>Upload your D&D Beyond character JSON to get started.</p>
      )}
    </main>
  );
}