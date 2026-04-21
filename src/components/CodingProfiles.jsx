import React, { useEffect, useState } from 'react';
import PixelCard from './PixelCard';
import './CodingProfiles.css';

const GITHUB_USER = 'lord230';
const CF_HANDLE = 'LORD009';

/* ── Codeforces rank colours ── */
const CF_RANK_COLORS = {
    newbie: '#808080',
    pupil: '#008000',
    specialist: '#03a89e',
    expert: '#0000ff',
    'candidate master': '#aa00aa',
    master: '#ff8c00',
    'international master': '#ff8c00',
    grandmaster: '#ff0000',
    'international grandmaster': '#ff0000',
    'legendary grandmaster': '#ff0000',
};
const rankColor = (rank = '') => CF_RANK_COLORS[rank.toLowerCase()] || '#808080';

const verdictBadge = (verdict) => {
    const map = {
        OK: { label: 'AC', cls: 'verdict-ac' },
        WRONG_ANSWER: { label: 'WA', cls: 'verdict-wa' },
        TIME_LIMIT_EXCEEDED: { label: 'TLE', cls: 'verdict-tle' },
        COMPILATION_ERROR: { label: 'CE', cls: 'verdict-ce' },
    };
    return map[verdict] || { label: (verdict || '?').slice(0, 3), cls: 'verdict-other' };
};

const timeAgo = (sec) => {
    const d = Math.floor((Date.now() / 1000 - sec) / 86400);
    if (d === 0) return 'today';
    if (d === 1) return '1d ago';
    if (d < 30) return `${d}d ago`;
    if (d < 365) return `${Math.floor(d / 30)}mo ago`;
    return `${Math.floor(d / 365)}y ago`;
};

const Stat = ({ label, value, accent }) => (
    <div className="cp-stat">
        <span className="cp-stat-value" style={accent ? { color: accent } : {}}>{value ?? '—'}</span>
        <span className="cp-stat-label" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem' }}>{label}</span>
    </div>
);

/* ── GitHub SVG icon ── */
const GitHubIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482
        0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463
        -.908-.62.069-.607.069-.607 1.003.07 1.531 1.03 1.531 1.03.891 1.529 2.341 1.087 2.91.831
        .092-.646.349-1.086.635-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683
        -.103-.253-.447-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.578 9.578 0 0 1 12 6.836c.85.004
        1.705.114 2.504.336 1.909-1.295 2.748-1.026 2.748-1.026.546 1.377.202 2.394.1 2.647.64.699
        1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.337
        -.012 2.415-.012 2.744 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12
        c0-5.523-4.477-10-10-10z" />
    </svg>
);

/* ══════════════════════════════════════════════ */
const CodingProfiles = () => {
    const [gh, setGh] = useState(null);
    const [ghRepos, setGhRepos] = useState([]);
    const [cf, setCf] = useState(null);
    const [cfSubs, setCfSubs] = useState([]);
    const [ghErr, setGhErr] = useState(false);
    const [cfErr, setCfErr] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let pending = 2; // count of pending async groups
        const done = () => { pending -= 1; if (pending === 0) setLoading(false); };

        /* ── GitHub (two separate fetches so one failure doesn't kill the other) ── */
        fetch(`https://api.github.com/users/${GITHUB_USER}`, {
            headers: { Accept: 'application/vnd.github+json' },
        })
            .then(r => r.json())
            .then(d => { if (!d.message) setGh(d); })
            .catch(() => setGhErr(true))
            .finally(() => {
                /* also fetch repos */
                fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=6&sort=pushed`, {
                    headers: { Accept: 'application/vnd.github+json' },
                })
                    .then(r => r.json())
                    .then(d => { if (Array.isArray(d)) setGhRepos(d); })
                    .catch(() => { })
                    .finally(done);
            });

        /* ── Codeforces ── */
        fetch(`https://codeforces.com/api/user.info?handles=${CF_HANDLE}`)
            .then(r => r.json())
            .then(d => {
                if (d.status === 'OK') setCf(d.result[0]);
                else setCfErr(true);
            })
            .catch(() => setCfErr(true))
            .finally(() => {
                fetch(`https://codeforces.com/api/user.status?handle=${CF_HANDLE}&from=1&count=15`)
                    .then(r => r.json())
                    .then(d => { if (d.status === 'OK') setCfSubs(d.result); })
                    .catch(() => { })
                    .finally(done);
            });
    }, []);

    /* deduplicate CF problems */
    const uniqueProblems = [];
    const seen = new Set();
    for (const s of cfSubs) {
        const key = `${s.problem.contestId}-${s.problem.index}`;
        if (!seen.has(key)) { seen.add(key); uniqueProblems.push(s); }
        if (uniqueProblems.length >= 6) break;
    }

    return (
        <section id="coding" className="cp-section" style={{ marginTop: '4rem' }}>
            <div className="container">
                <h2 className="section-title" style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', textAlign: 'center', marginBottom: '1rem' }}><i className="fas fa-code"></i> CODING_ACTIVITY</h2>
                <p className="cp-subtitle" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '3rem' }}>
                    {'>'} Live stats from GitHub {'&'} Codeforces
                </p>

                {loading ? (
                    <div className="cp-loading" style={{ fontFamily: 'var(--font-sans)' }}>
                        <span>[ Fetching profiles... ]</span>
                    </div>
                ) : (
                    <div className="cp-grid" style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>

                        {/* ══ GITHUB PANEL ══ */}
                        <PixelCard isMajor={true} className="cp-card cp-card-github">
                            <div className="cp-card-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', borderBottom: '2px dotted var(--border-color)', paddingBottom: '0.5rem' }}>
                                <div className="cp-platform-logo"><GitHubIcon /></div>
                                <div>
                                    <div className="cp-platform-name" style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9rem' }}>GitHub</div>
                                    <a href={`https://github.com/${GITHUB_USER}`}
                                        target="_blank" rel="noreferrer"
                                        className="cp-handle" style={{ fontFamily: 'var(--font-sans)' }}>@{GITHUB_USER}</a>
                                </div>
                            </div>

                            {gh && (
                                <div className="cp-stats-row" style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-sans)' }}>
                                    <Stat label="Repos" value={gh.public_repos} />
                                    <Stat label="Followers" value={gh.followers} />
                                    <Stat label="Following" value={gh.following} />
                                    <Stat label="Since" value={new Date(gh.created_at).getFullYear()} />
                                </div>
                            )}

                            {ghErr && !gh && (
                                <p className="cp-api-err">Could not load GitHub stats right now.</p>
                            )}

                            {/* Contribution heatmap — always shown, loaded as an img from external service */}
                            <div className="cp-contrib-wrap" style={{ marginTop: '2rem' }}>
                                <div className="cp-contrib-label" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>// Contribution Graph</div>
                                <div className="cp-contrib-img-wrap" style={{ border: '2px solid var(--border-color)', padding: '0.5rem' }}>
                                    <img
                                        src={`https://ghchart.rshah.org/0B1F3B/${GITHUB_USER}`}
                                        alt="GitHub contribution heatmap"
                                        className="cp-contrib-chart"
                                        onError={e => { e.target.style.display = 'none'; }}
                                        style={{ width: '100%', filter: 'grayscale(0%)' }}
                                    />
                                </div>
                            </div>

                            {ghRepos.length > 0 && (
                                <div className="cp-repo-list" style={{ marginTop: 'auto', paddingTop: '2rem', fontFamily: 'var(--font-sans)' }}>
                                    <div className="cp-sub-label" style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>// Recent Repositories</div>
                                    {ghRepos.slice(0, 5).map(repo => (
                                        <a key={repo.id}
                                            href={repo.html_url}
                                            target="_blank" rel="noreferrer"
                                            className="cp-repo-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', borderBottom: '1px dotted var(--border-color)', textDecoration: 'none', color: 'var(--text-primary)' }}>
                                            <span className="cp-repo-name" style={{ fontWeight: 'bold' }}>{repo.name}</span>
                                            <span className="cp-repo-lang" style={{ fontSize: '0.8rem' }}>{repo.language || '—'}</span>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </PixelCard>

                        {/* ══ CODEFORCES PANEL ══ */}
                        <PixelCard isMajor={false} className="cp-card cp-card-cf">
                            <div className="cp-card-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', borderBottom: '2px dotted var(--border-color)', paddingBottom: '0.5rem' }}>
                                <div className="cp-platform-logo cf-logo" style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--accent-color)' }}>CF</div>
                                <div>
                                    <div className="cp-platform-name" style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9rem' }}>Codeforces</div>
                                    <a href={`https://codeforces.com/profile/${CF_HANDLE}`}
                                        target="_blank" rel="noreferrer"
                                        className="cp-handle" style={{ fontFamily: 'var(--font-sans)' }}>{CF_HANDLE}</a>
                                </div>
                            </div>

                            {/* If Live API works, show dynamic data; else show hardcoded fallback */}
                            {cf ? (
                                <>
                                    <div className="cp-rank-badge"
                                        style={{ borderColor: rankColor(cf.rank), color: rankColor(cf.rank), padding: '0.5rem', border: '2px solid', marginBottom: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                                        <span className="cp-rank-title" style={{ fontFamily: 'var(--font-serif)', fontSize: '0.8rem', textTransform: 'uppercase' }}>{cf.rank}</span>
                                        <span className="cp-rank-rating" style={{ fontFamily: 'var(--font-sans)' }}>{cf.rating}</span>
                                    </div>
                                    <div className="cp-stats-row" style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-sans)' }}>
                                        <Stat label="Rating" value={cf.rating} accent={rankColor(cf.rank)} />
                                        <Stat label="Max Rating" value={cf.maxRating} accent={rankColor(cf.maxRank)} />
                                        <Stat label="Max Rank" value={cf.maxRank} />
                                        <Stat label="Friends" value={cf.friendOfCount} />
                                    </div>

                                </>
                            ) : (
                                /* Hardcoded fallback when CORS blocks the live fetch */
                                <>
                                    <div className="cp-rank-badge"
                                        style={{ borderColor: '#808080', color: '#808080', padding: '0.5rem', border: '2px solid', marginBottom: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                                        <span className="cp-rank-title" style={{ fontFamily: 'var(--font-serif)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Newbie</span>
                                        <span className="cp-rank-rating" style={{ fontFamily: 'var(--font-sans)' }}>1001</span>
                                    </div>
                                    <div className="cp-stats-row" style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-sans)' }}>
                                        <Stat label="Rating" value="1001" accent="#808080" />
                                        <Stat label="Max Rating" value="1001" accent="#808080" />
                                        <Stat label="Max Rank" value="Newbie" />
                                        <Stat label="Country" value="India" />
                                    </div>

                                </>
                            )}

                            {uniqueProblems.length > 0 && (
                                <div className="cp-sub-list" style={{ marginTop: 'auto', paddingTop: '2rem', fontFamily: 'var(--font-sans)' }}>
                                    <div className="cp-sub-label" style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>// Recent Submissions</div>
                                    {uniqueProblems.map((s, i) => {
                                        const { label, cls } = verdictBadge(s.verdict);
                                        return (
                                            <a key={i}
                                                href={`https://codeforces.com/contest/${s.contestId}/problem/${s.problem.index}`}
                                                target="_blank" rel="noreferrer"
                                                className="cp-sub-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', borderBottom: '1px dotted var(--border-color)', textDecoration: 'none', color: 'var(--text-primary)' }}>
                                                <span className={`cp-verdict ${cls}`} style={{ fontWeight: 'bold' }}>[{label}]</span>
                                                <span className="cp-sub-name" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '120px' }}>{s.problem.name}</span>
                                                <span className="cp-sub-time" style={{ fontSize: '0.7rem' }}>{timeAgo(s.creationTimeSeconds)}</span>
                                            </a>
                                        );
                                    })}
                                </div>
                            )}

                            {cfErr && uniqueProblems.length === 0 && (
                                /* fallback hardcoded recent submissions */
                                <div className="cp-sub-list" style={{ marginTop: 'auto', paddingTop: '2rem', fontFamily: 'var(--font-sans)' }}>
                                    <div className="cp-sub-label" style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>// Recent Submissions</div>
                                    {[
                                        { name: 'Swap to Rearrange', verdict: 'WRONG_ANSWER', lang: 'C++', contest: 2192, idx: 'E', ago: 'today' },
                                        { name: 'Cost of Tree', verdict: 'WRONG_ANSWER', lang: 'Python', contest: 2192, idx: 'D', ago: 'today' },
                                        { name: 'Flipping Binary String', verdict: 'OK', lang: 'C', contest: 2192, idx: 'B', ago: 'today' },
                                        { name: 'All-in-one Gun', verdict: 'OK', lang: 'C', contest: 2192, idx: 'C', ago: 'today' },
                                        { name: 'String Rotation Game', verdict: 'OK', lang: 'C', contest: 2192, idx: 'A', ago: 'today' },
                                        { name: 'Chicken Jockey', verdict: 'WRONG_ANSWER', lang: 'C', contest: 2133, idx: 'D', ago: '7mo ago' },
                                    ].map((s, i) => {
                                        const { label, cls } = verdictBadge(s.verdict);
                                        return (
                                            <a key={i}
                                                href={`https://codeforces.com/contest/${s.contest}/problem/${s.idx}`}
                                                target="_blank" rel="noreferrer"
                                                className="cp-sub-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', borderBottom: '1px dotted var(--border-color)', textDecoration: 'none', color: 'var(--text-primary)' }}>
                                                <span className={`cp-verdict ${cls}`} style={{ fontWeight: 'bold' }}>[{label}]</span>
                                                <span className="cp-sub-name" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '120px' }}>{s.name}</span>
                                                <span className="cp-sub-time" style={{ fontSize: '0.7rem' }}>{s.ago}</span>
                                            </a>
                                        );
                                    })}
                                </div>
                            )}
                        </PixelCard>

                    </div>
                )}
            </div>
        </section>
    );
};

export default CodingProfiles;
