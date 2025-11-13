const KEY = "aryamanflix:list";
const EVT = "aryamanflix:mylist"; // custom event for same-tab updates

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

function write(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

function emit() {
  // notify the app (same tab) that the list changed
  window.dispatchEvent(new Event(EVT));
}

export function getList(profileSlug) {
  const all = read();
  return new Set(all[profileSlug] || []);
}

export function inList(profileSlug, projectSlug) {
  return getList(profileSlug).has(projectSlug);
}

export function toggleInList(profileSlug, projectSlug) {
  const all = read();
  const set = new Set(all[profileSlug] || []);
  if (set.has(projectSlug)) set.delete(projectSlug);
  else set.add(projectSlug);
  all[profileSlug] = Array.from(set);
  write(all);
  emit(); // 👈 broadcast change
  return set.has(projectSlug);
}

// Optional helper to subscribe (used by Home.jsx)
export function onListChange(handler) {
  window.addEventListener(EVT, handler);
  return () => window.removeEventListener(EVT, handler);
}
