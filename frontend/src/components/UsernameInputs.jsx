import React, { useState, useEffect } from "react";

const PLATFORM_CONFIG = {
  leetcode: {
    name: "LeetCode",
    placeholder: "e.g. tourist",
    urlPart: "leetcode.com/",
    regex: /^[a-zA-Z0-9_.-]+$/,
  },
  codeforces: {
    name: "Codeforces",
    placeholder: "e.g. tourist",
    urlPart: "codeforces.com/profile/",
    regex: /^[a-zA-Z0-9_.-]+$/,
  },
  codechef: {
    name: "CodeChef",
    placeholder: "e.g. gennady",
    urlPart: "codechef.com/users/",
    regex: /^[a-zA-Z0-9_.]+$/,
  },
};

const HISTORY_KEY = "grindmap_history";
const MAX_HISTORY = 5;

function UsernameInputs({ usernames, onChange, onFetch, loading }) {
  const [errors, setErrors] = useState({});
  const [history, setHistory] = useState(() => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      console.error("Failed to parse history", e);
      return {};
    }
  });

  const saveHistory = (newHistory) => {
    setHistory(newHistory);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  };

  const validateAndChange = (platform, value) => {
    let newValue = value.trim();
    let error = null;

    // URL Handling
    if (
      newValue.includes("http") ||
      newValue.includes("www.") ||
      newValue.includes(".com") ||
      newValue.includes(".jp")
    ) {
      // try extract
      const config = PLATFORM_CONFIG[platform];
      // Match strict part
      const lowerValue = newValue.toLowerCase();
      if (lowerValue.includes(config.urlPart)) {
        try {
          // Basic split logic
          const afterDomain = lowerValue.split(config.urlPart)[1];
          newValue = afterDomain.split("/")[0].split("?")[0]; // simple extraction
        } catch (e) {
          error = "Invalid URL format";
        }
      } else {
        error = `Not a valid ${config.name} URL`;
      }
    }

    // Regex Validation
    if (!error && newValue) {
      const config = PLATFORM_CONFIG[platform];
      if (config.regex && !config.regex.test(newValue)) {
        error = "Invalid username format";
      }
    }

    setErrors((prev) => ({ ...prev, [platform]: error }));
    onChange(platform, newValue);
  };

  const handleFetch = () => {
    // Check for blocking errors
    const hasErrors = Object.values(errors).some((e) => e);
    // basic check: at least one username should probably be present, but user request only said "Prevent ... if input field is empty"
    // Assuming this means "don't fetch for empty fields" which App.js already does.
    // But if ALL are empty, maybe warn?
    const allEmpty = Object.keys(PLATFORM_CONFIG).every((k) => !usernames[k]);

    if (hasErrors) {
      return; // Button should be disabled or we just return.
    }
    if (allEmpty) {
      // Optional: could set a general error
      return;
    }

    // Save to history before fetching
    const newHistory = { ...history };
    let changed = false;

    Object.keys(PLATFORM_CONFIG).forEach((platform) => {
      const user = usernames[platform];
      if (user && !errors[platform]) {
        const currentList = newHistory[platform] || [];
        // Remove if exists to move to top
        const filtered = currentList.filter((u) => u !== user);
        // Add to front
        filtered.unshift(user);
        // Limit
        newHistory[platform] = filtered.slice(0, MAX_HISTORY);
        changed = true;
      }
    });

    if (changed) {
      saveHistory(newHistory);
    }

    onFetch();
  };

  const removeHistoryItem = (platform, user, e) => {
    e.stopPropagation(); // Prevent clicking chip
    const newHistory = { ...history };
    if (newHistory[platform]) {
      newHistory[platform] = newHistory[platform].filter((u) => u !== user);
      saveHistory(newHistory);
    }
  };

  const hasErrors = Object.values(errors).some((e) => e);
  const allEmpty = Object.keys(PLATFORM_CONFIG).every((k) => !usernames[k]);

  return (
    <div className="username-inputs">
      <h2>Enter Your Usernames</h2>
      {Object.keys(PLATFORM_CONFIG).map((key) => {
        const config = PLATFORM_CONFIG[key];
        const platformHistory = history[key] || [];

        return (
          <div
            key={key}
            className="input-group"
            style={{ alignItems: "flex-start" }}
          >
            <label style={{ marginTop: "12px" }}>{config.name}</label>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <input
                type="text"
                value={usernames[key]}
                onChange={(e) => validateAndChange(key, e.target.value)}
                placeholder={config.placeholder}
                style={{
                  borderColor: errors[key] ? "#ef4444" : undefined,
                  outlineColor: errors[key] ? "#ef4444" : undefined,
                }}
              />
              {/* History Chips */}
              {platformHistory.length > 0 && (
                <div
                  style={{
                    marginTop: "5px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "5px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.8em",
                      color: "#888",
                      marginRight: "5px",
                      alignSelf: "center",
                    }}
                  >
                    Recent:
                  </span>
                  {platformHistory.map((user) => (
                    <div
                      key={user}
                      onClick={() => validateAndChange(key, user)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        backgroundColor: "#f3f4f6", // light gray
                        border: "1px solid #e5e7eb",
                        borderRadius: "15px",
                        padding: "2px 8px",
                        fontSize: "0.85em",
                        cursor: "pointer",
                        color: "#374151",
                      }}
                      title={`Use ${user}`}
                    >
                      {user}
                      <span
                        onClick={(e) => removeHistoryItem(key, user, e)}
                        style={{
                          marginLeft: "6px",
                          color: "#9ca3af",
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => (e.target.style.color = "#ef4444")}
                        onMouseLeave={(e) => (e.target.style.color = "#9ca3af")}
                      >
                        ×
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {errors[key] && (
                <span
                  className="error-msg"
                  style={{
                    color: "#ef4444",
                    fontSize: "0.9em",
                    marginTop: "5px",
                    marginBottom: "10px",
                    textAlign: "left",
                  }}
                >
                  {errors[key]}
                </span>
              )}
            </div>
          </div>
        );
      })}
      <button
        onClick={handleFetch}
        disabled={loading || hasErrors || allEmpty}
        className="refresh-btn"
        style={{ opacity: loading || hasErrors || allEmpty ? 0.6 : 1 }}
      >
        {loading ? "Loading..." : "Refresh All"}
      </button>
    </div>
  );
}

export default UsernameInputs;
