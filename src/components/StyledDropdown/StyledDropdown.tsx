import { DropdownOption } from "@/src/types";
import { useEffect, useRef, useState } from "react";

type StyledDropdownProps<T extends string> = {
  label: string;
  value: T;
  options: DropdownOption<T>[];
  onChange: (value: T) => void;
};

export function StyledDropdown<T extends string>({
  label,
  value,
  options,
  onChange,
}: StyledDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onOutsideClick = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", onOutsideClick);
    document.addEventListener("keydown", onEscape);

    return () => {
      document.removeEventListener("mousedown", onOutsideClick);
      document.removeEventListener("keydown", onEscape);
    };
  }, [isOpen]);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <label className="movies-page__field movies-page__field--select">
      <span>{label}</span>
      <div className="movies-page__dropdown" ref={dropdownRef}>
        <button
          type="button"
          className="movies-page__dropdown-trigger"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span>{selectedOption?.label ?? options[0]?.label}</span>
        </button>

        {isOpen && (
          <ul className="movies-page__dropdown-menu" role="listbox">
            {options.map((option) => {
              const isActive = option.value === value;

              return (
                <li key={option.value} role="option" aria-selected={isActive}>
                  <button
                    type="button"
                    className={`movies-page__dropdown-option${isActive ? " is-active" : ""}`}
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                  >
                    <span className="movies-page__dropdown-option-label">
                      {option.label}
                    </span>
                    {isActive && (
                      <span className="movies-page__dropdown-check">✓</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </label>
  );
}
