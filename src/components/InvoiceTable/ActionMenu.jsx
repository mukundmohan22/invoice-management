// ClickOnlyActionMenu.jsx
import { useState, useRef, useEffect } from "react";

import "./ActionMenu.css";
export default function ActionMenu({ onView, markInvoicePaid, onDuplicate, id }) {
  const [open, setOpen] = useState(false);
  const menuId = useRef(`menu-${Math.random().toString(36).slice(2)}`).current;
  const wrapRef = useRef(null);

  const close = () => setOpen(false);
  const OpenMenu = () => {
    setOpen((v) => !v);
  };

  useEffect(() => {
    if (!open) return;
    function onDocClick(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  return (
    <div ref={wrapRef} className="action-menu">
      <button type="button" className="menu-button" aria-haspopup="menu" onClick={OpenMenu}>
        •••
      </button>

      {open && (
        <ul id={menuId} role="menu" className="menu">
          <li>
            <button
              role="menuitem"
              className="menu-item"
              onClick={() => {
                console.log("onView is running");
                onView?.();
                close();
              }}
            >
              View
            </button>
          </li>
          <li>
            <button
              role="menuitem"
              className="menu-item"
              onClick={() => {
                markInvoicePaid?.(id);
                close();
              }}
            >
              Make Paid
            </button>
          </li>
          <li>
            <button
              role="menuitem"
              className="menu-item"
              onClick={() => {
                onDuplicate?.();
                close();
              }}
            >
              Duplicate
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
