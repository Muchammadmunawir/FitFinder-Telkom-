export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return <button type="button" aria-label={label} onClick={onChange} className={`relative h-5 w-9 shrink-0 rounded-full transition ${checked ? "bg-black" : "bg-gray-200"}`}><span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition ${checked ? "left-[18px]" : "left-0.5"}`} /></button>;
}
