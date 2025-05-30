import { useState } from "react";
import ActionTracker from "./ActionTracker";
import Inventory from "./Inventory";

export default function CharacterSheet({ data }) {
  const baseStats = data.stats || [];
  const getStat = (id) => baseStats.find(stat => stat.statId === id)?.value || 10;
  const getMod = (val) => Math.floor((val - 10) / 2);

  const str = getStat(1), dex = getStat(2), con = getStat(3),
        int = getStat(4), wis = getStat(5), cha = getStat(6);

  const classLevels = Object.fromEntries((data.classes || []).map(c => [c.definition.name, c.level]));

  const allFeatures = [
    { name: "Rage", class: "Barbarian", active: false },
    { name: "Fighting Style: Defense", class: "Fighter", active: false },
    { name: "Sneak Attack", class: "Rogue", active: false },
    { name: "Divine Smite", class: "Paladin", active: false },
  ];

  const [activeFeatures, setActiveFeatures] = useState(allFeatures);
  const toggleFeature = (name) => {
    setActiveFeatures(prev => prev.map(f => f.name === name ? { ...f, active: !f.active } : f));
  };

  let featureBonuses = { strength: 0, ac: 0, sneakDamage: 0, smiteBonus: 0 };

  activeFeatures.forEach(f => {
    if (!f.active) return;
    const level = classLevels[f.class] || 0;
    switch (f.name) {
      case "Rage":
        featureBonuses.strength += level >= 9 ? 3 : level >= 1 ? 2 : 0;
        break;
      case "Fighting Style: Defense":
        if (level >= 1) featureBonuses.ac += 1;
        break;
      case "Sneak Attack":
        if (level >= 1) featureBonuses.sneakDamage += Math.ceil(level / 2);
        break;
      case "Divine Smite":
        if (level >= 2) featureBonuses.smiteBonus += 2;
        break;
    }
  });

  const effectiveStrMod = getMod(str) + featureBonuses.strength;
  const classes = data.classes?.map(cls => \`\${cls.definition.name} (Level \${cls.level})\`).join(", ");
  const baseAC = data.overrideAC || getMod(dex) + 10;
  const effectiveAC = baseAC + featureBonuses.ac;
  const speed = data.race?.baseWalkSpeed || data.race?.definition?.speed || "Unknown";

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl">Character: {data.name}</h2>
        <p>Class: {classes}</p>
        <p>AC: {effectiveAC} {featureBonuses.ac ? <span>(+{featureBonuses.ac} from features)</span> : null}</p>
        <p>Speed: {speed} ft</p>
        <p>STR: {str} ({getMod(str)}) {featureBonuses.strength ? <span>(+{featureBonuses.strength} from features)</span> : null}</p>
        <p>DEX: {dex} ({getMod(dex)})</p>
        <p>CON: {con} ({getMod(con)})</p>
        <p>INT: {int} ({getMod(int)})</p>
        <p>WIS: {wis} ({getMod(wis)})</p>
        <p>CHA: {cha} ({getMod(cha)})</p>
        <h3 className="text-xl mt-4">Active Features</h3>
        <div className="flex flex-wrap gap-3">
          {activeFeatures.map(f => (
            <button key={f.name} onClick={() => toggleFeature(f.name)}
              className={\`px-3 py-1 rounded \${f.active ? "bg-green-600" : "bg-gray-600"}\`}>
              {f.name}
            </button>
          ))}
        </div>
      </div>
      <ActionTracker />
      <Inventory items={data.inventory || []} strengthMod={effectiveStrMod} />
    </div>
  );
}