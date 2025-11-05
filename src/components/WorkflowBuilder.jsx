import { useEffect, useRef, useState } from "react";
import { Play, Plus, Trash2 } from "lucide-react";

const PALETTE_ITEMS = [
  { type: "trigger", label: "Trigger", color: "bg-emerald-500" },
  { type: "task", label: "Task", color: "bg-blue-500" },
  { type: "delay", label: "Delay", color: "bg-amber-500" },
  { type: "condition", label: "Condition", color: "bg-purple-500" },
];

function Node({ node, selected, onMouseDown }) {
  return (
    <div
      className={`absolute select-none rounded-md px-3 py-2 text-xs font-medium text-white shadow-md cursor-move border border-white/20 ${
        node.color
      } ${selected ? "ring-2 ring-offset-2 ring-blue-500" : ""}`}
      style={{ left: node.x, top: node.y }}
      onMouseDown={(e) => onMouseDown(e, node.id)}
    >
      {node.label}
    </div>
  );
}

export default function WorkflowBuilder() {
  const [nodes, setNodes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [drag, setDrag] = useState({ id: null, offsetX: 0, offsetY: 0 });
  const canvasRef = useRef(null);

  // Handle drag from palette -> canvas
  const handleDrop = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("application/json"));
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - 40; // center-ish
    const y = e.clientY - rect.top - 16;

    const id = crypto.randomUUID();
    const newNode = {
      id,
      type: data.type,
      label: data.label,
      color: data.color,
      x: Math.max(8, Math.min(x, rect.width - 100)),
      y: Math.max(8, Math.min(y, rect.height - 40)),
    };
    setNodes((prev) => [...prev, newNode]);
    setSelectedId(id);
  };

  const handleDragStart = (item, e) => {
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ type: item.type, label: item.label, color: item.color })
    );
    e.dataTransfer.effectAllowed = "copy";
  };

  const onMouseDownNode = (e, id) => {
    const node = nodes.find((n) => n.id === id);
    if (!node) return;
    setSelectedId(id);
    const rect = canvasRef.current.getBoundingClientRect();
    setDrag({ id, offsetX: e.clientX - rect.left - node.x, offsetY: e.clientY - rect.top - node.y });
  };

  const onMouseMove = (e) => {
    if (!drag.id) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - drag.offsetX;
    const y = e.clientY - rect.top - drag.offsetY;

    setNodes((prev) =>
      prev.map((n) =>
        n.id === drag.id
          ? {
              ...n,
              x: Math.max(8, Math.min(x, rect.width - 100)),
              y: Math.max(8, Math.min(y, rect.height - 40)),
            }
          : n
      )
    );
  };

  const onMouseUp = () => setDrag({ id: null, offsetX: 0, offsetY: 0 });

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    c.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      c.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  });

  const selected = nodes.find((n) => n.id === selectedId);

  return (
    <section id="builder" className="border-t border-gray-200 bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Visual Workflow Builder</h2>
            <p className="text-sm text-gray-600">Drag items from the palette onto the canvas. Move them around and edit details.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => { setNodes([]); setSelectedId(null); }}
            >
              <Trash2 size={16} /> Clear
            </button>
            <button className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
              <Play size={16} /> Run Test
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Palette */}
          <div className="lg:col-span-1 space-y-3">
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800">Palette</h3>
                <span className="text-xs text-gray-500">Drag to canvas</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {PALETTE_ITEMS.map((item) => (
                  <button
                    key={item.type}
                    draggable
                    onDragStart={(e) => handleDragStart(item, e)}
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium text-white shadow-sm ${item.color}`}
                  >
                    <Plus size={14} /> {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h3 className="mb-2 text-sm font-semibold text-gray-800">Tips</h3>
              <ul className="text-xs text-gray-600 list-disc pl-4 space-y-1">
                <li>Start with a Trigger step</li>
                <li>Add Tasks, Delays, or Conditions</li>
                <li>Drag nodes to reposition on the canvas</li>
              </ul>
            </div>
          </div>

          {/* Canvas & Inspector */}
          <div className="lg:col-span-3 grid grid-rows-[minmax(420px,_1fr)_auto] gap-6">
            <div
              ref={canvasRef}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="relative h-[420px] w-full rounded-lg border border-dashed border-gray-300 bg-white"
            >
              {nodes.map((n) => (
                <Node key={n.id} node={n} selected={selectedId === n.id} onMouseDown={onMouseDownNode} />
              ))}
              {nodes.length === 0 && (
                <div className="absolute inset-0 grid place-items-center text-sm text-gray-500">
                  Drag steps here to begin your workflow
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <h3 className="mb-3 text-sm font-semibold text-gray-800">Inspector</h3>
                {selected ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Label</label>
                      <input
                        value={selected.label}
                        onChange={(e) =>
                          setNodes((prev) => prev.map((n) => (n.id === selected.id ? { ...n, label: e.target.value } : n)))
                        }
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Type</label>
                      <div className="text-sm text-gray-700 capitalize">{selected.type}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setNodes((prev) => prev.filter((n) => n.id !== selected.id))}
                        className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-xs text-gray-700 hover:bg-gray-50"
                      >
                        <Trash2 size={14} /> Delete Node
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Select a node on the canvas to edit its properties.</p>
                )}
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <h3 className="mb-3 text-sm font-semibold text-gray-800">Execution Preview</h3>
                {nodes.length ? (
                  <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-1">
                    {nodes.map((n, idx) => (
                      <li key={n.id}>
                        <span className="font-medium">{n.label}</span> <span className="text-gray-500">({n.type})</span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-sm text-gray-500">Add steps to see the execution order.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
