// Copyright (c) 2026 Saheli Mondal.

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Check } from "lucide-react";

/**
 * Minimal custom Select component
 * - colorless by default (no background/text colors applied)
 * - accepts `color` prop to tint the chevron and highlight selected option
 * - options: [{ value, label }]
 */
const Select = ({
  value,
  onChange,
  options = [],
  className = "",
  ariaLabel = "select",
  color = "#000",
  compact = false,
  panelless = false,
  chevronSize = 16,
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const buttonRef = containerRef; // button wrapper ref
  const [menuStyle, setMenuStyle] = useState(null);
  const menuRef = useRef(null);
  const [hovered, setHovered] = useState(null);

  // convert hex like #34D399 to rgba with provided alpha
  const hexToRgba = (hex, alpha = 1) => {
    if (!hex) return `rgba(0,0,0,${alpha})`;
    let h = hex.replace('#', '');
    if (h.length === 3) {
      h = h.split('').map((c) => c + c).join('');
    }
    const int = parseInt(h, 16);
    const r = (int >> 16) & 255;
    const g = (int >> 8) & 255;
    const b = int & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  useEffect(() => {
    const onDocClick = (e) => {
      const target = e.target;
      const clickedInsideTrigger = containerRef.current?.contains(target);
      const clickedInsideMenu = menuRef.current?.contains(target);
      if (!clickedInsideTrigger && !clickedInsideMenu) {
        setOpen(false);
      }
    };
    // use capture phase on click so we don't close before item handlers run
    document.addEventListener("click", onDocClick, true);
    return () => document.removeEventListener("click", onDocClick, true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const update = () => {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (!rect) return;
      const desiredMin = compact ? 160 : rect.width;
      setMenuStyle({
        position: "absolute",
        left: `${rect.left + window.scrollX}px`,
        top: `${rect.bottom + window.scrollY + 6}px`,
        minWidth: `${Math.max(rect.width, desiredMin)}px`,
        zIndex: 9999,
      });
    };

    // close the menu if the user scrolls the page (but let internal menu scroll continue)
    const onWindowScrollClose = (e) => {
      // If the event target is inside the menu or trigger, ignore — usually window scroll target is document/window
      const tgt = e?.target;
      try {
        if (menuRef.current && (menuRef.current.contains(tgt) || containerRef.current?.contains(tgt))) {
          return;
        }
      } catch (err) {
        // ignore containment errors
      }
      setOpen(false);
    };

    // initial
    update();
    window.addEventListener("resize", update);
    // update position on scroll (capture) so the menu tracks trigger
    window.addEventListener("scroll", update, true);
    // close menu on any window scroll (non-capture) — keeps menu from lingering while user scrolls the page
    window.addEventListener("scroll", onWindowScrollClose, { passive: true });
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("scroll", onWindowScrollClose, { passive: true });
    };
  }, [open]);

  const selected = options.find((o) => o.value === value) || options[0] || {};

  return (
    <div
      ref={containerRef}
      className={`flex items-center relative ${className}`}
    >
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className={`transition-shadow duration-150 ${compact ? 'flex items-center justify-center p-1 rounded-md border w-8 h-8' : 'flex items-center justify-between gap-2 px-3 py-1 rounded-md border min-w-[150px]' } ${className}`}
        style={{
          // when compact+panelless we want the trigger to be visually minimal (no bg/border/shadow)
          background: compact && panelless ? 'transparent' : 'rgba(255,255,255,0.9)',
          color: 'inherit',
          boxShadow: compact && panelless ? 'none' : '0 6px 18px rgba(15, 23, 42, 0.06)',
          borderColor: compact && panelless ? 'transparent' : 'rgba(15, 23, 42, 0.25)',
          borderStyle: 'solid',
        }}
      >
        {!compact && <span className="truncate text-sm font-medium">{selected.label}</span>}
        <ChevronDown
          className="ml-1 transition-transform duration-150"
          size={chevronSize}
          strokeWidth={2}
          style={{ color, transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      {open &&
        menuStyle &&
        createPortal(
          <ul
            role="listbox"
            tabIndex={-1}
            ref={menuRef}
            className={
              panelless
                ? "overflow-auto transform transition-all duration-150 origin-top-right"
                : "bg-white overflow-auto rounded-md shadow-lg ring-1 ring-black ring-opacity-5 border border-gray-200 transform transition-all duration-150 origin-top-right"
            }
            style={{
              ...menuStyle,
              padding: "6px 4px",
              ...(panelless
                ? { background: 'white', boxShadow: 'none', border: '1px solid #c9c9c9ff', borderRadius: "10px" }
                : {}),
            }}
          >
            {options.map((opt) => {
              const isHovered = hovered === opt.value;
              const isSelected = opt.value === value;
              const hoverBg = hexToRgba(color, 0.12);
              const liStyle = {
                transition: 'background 140ms ease, color 140ms ease',
                ...(isHovered || isSelected ? { background: hoverBg, color } : {}),
                ...(isHovered || isSelected ? { borderLeft: `4px solid ${color}`, paddingLeft: 10 } : {}),
              };
              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange && onChange(opt.value);
                    setOpen(false);
                  }}
                  onMouseEnter={() => setHovered(opt.value)}
                  onMouseLeave={() => setHovered(null)}
                  className={`cursor-pointer px-3 py-2 text-sm flex items-center gap-2 whitespace-nowrap items-center`}
                  style={liStyle}
                >
                  <span className="flex-1">{opt.label}</span>
                  {isSelected && <Check size={14} style={{ color }} />}
                </li>
              );
            })}
          </ul>,
          document.body
        )}
    </div>
  );
};

export default Select;
