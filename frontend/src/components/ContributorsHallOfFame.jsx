import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./ContributorsHallOfFame.css";

const CACHE_KEY = "contributors_cache";
const CACHE_duration = 3600000; // 1 hour in ms

const ContributorsHallOfFame = ({ onBack }) => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContributors = async () => {
    setLoading(true);
    setError(null);

    // Check Cache
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      const now = new Date().getTime();
      if (now - parsed.timestamp < CACHE_duration) {
        setContributors(parsed.data);
        setLoading(false);
        return;
      }
    }

    try {
      // 1. Fetch Contributors and PRs in parallel
      const [contributorsRes, prsRes] = await Promise.all([
        fetch(
          "https://api.github.com/repos/Rohanrathod7/GrindMap/contributors?per_page=100",
        ),
        fetch(
          "https://api.github.com/repos/Rohanrathod7/GrindMap/pulls?state=closed&per_page=100",
        ),
      ]);

      if (!contributorsRes.ok) {
        throw new Error("Failed to fetch contributors");
      }

      const contributorsData = await contributorsRes.json();
      let mergedData = contributorsData;

      // 2. Process PRs (Graceful Failure)
      if (prsRes.ok) {
        const prsData = await prsRes.json();

        // Count Merged PRs by User ID
        const prCounts = {};
        prsData.forEach((pr) => {
          if (pr.merged_at && pr.user) {
            prCounts[pr.user.id] = (prCounts[pr.user.id] || 0) + 1;
          }
        });

        // Merge Counts
        mergedData = contributorsData.map((contributor) => ({
          ...contributor,
          prCount: prCounts[contributor.id] || 0,
        }));
      }

      // Update Cache
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          timestamp: new Date().getTime(),
          data: mergedData,
        }),
      );

      setContributors(mergedData);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(
        "Could not load the Hall of Fame. Please check your connection.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContributors();
  }, []);

  if (error) {
    return (
      <div className="contributors-container">
        <button onClick={onBack} className="back-btn-modern">
          ← Back
        </button>
        <div className="error-container">
          <h3>Connection Error</h3>
          <p>{error}</p>
          <button onClick={fetchContributors} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="contributors-container">
      <div className="contributors-nav">
        <button onClick={onBack} className="back-btn-modern">
          ← Home
        </button>
      </div>

      <div className="contributors-header">
        <h2>Hall of Fame</h2>
        <p>Honoring the minds building GrindMap</p>
      </div>

      <div className="contributors-grid">
        {loading
          ? Array(8)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="skeleton-card">
                  <Skeleton
                    circle
                    width={80}
                    height={80}
                    style={{ marginBottom: 16 }}
                  />
                  <Skeleton
                    width={120}
                    height={20}
                    style={{ marginBottom: 8 }}
                  />
                  <Skeleton
                    width={80}
                    height={24}
                    style={{ borderRadius: 20 }}
                  />
                </div>
              ))
          : contributors.map((contributor) => (
              <a
                key={contributor.id}
                href={contributor.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="contributor-card"
              >
                <div className="avatar-wrapper">
                  <img
                    src={contributor.avatar_url}
                    alt={contributor.login}
                    className="contributor-avatar"
                  />
                </div>
                <div className="contributor-info">
                  <h3>{contributor.login}</h3>
                  <div className="contribution-badges">
                    <div className="contribution-badge">
                      <span>⚡</span>
                      <span>{contributor.contributions} Commits</span>
                    </div>
                    <div className="contribution-badge pr-badge">
                      <span>🔀</span>
                      <span>{contributor.prCount} PRs</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
      </div>
    </div>
  );
};

export default ContributorsHallOfFame;
