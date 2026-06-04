export function indexPage(): string {
  return htmlPage({
    title: "Fake Issuer",
    body: [
      '<header class="app-header">',
      "<div>",
      '<p class="eyebrow">Credimi Fake VCI Capture Issuer</p>',
      "<h1>Wallet metadata capture</h1>",
      "</div>",
      '<span class="status-label">local issuer</span>',
      "</header>",
      '<main class="launch-layout">',
      '<section class="panel launch-panel">',
      "<h2>Create a fake issuance</h2>",
      "<p>Start a one-time fake issuance session and scan the generated QR with an EUDI Wallet.</p>",
      '<form action="/ui/sessions" method="post" target="_blank">',
      '<button class="button-primary" type="submit">New fake-issuance session</button>',
      "</form>",
      "</section>",
      '<section class="panel info-panel">',
      "<h2>Captured values</h2>",
      '<dl class="compact-list">',
      "<div><dt>client_id</dt><dd>Wallet OAuth client identifier</dd></div>",
      "<div><dt>redirect_uri</dt><dd>Wallet authorization callback</dd></div>",
      "<div><dt>wallet_jwks</dt><dd>Holder-binding public key from proof headers</dd></div>",
      "<div><dt>dpop_jwk</dt><dd>DPoP public key when present</dd></div>",
      "</dl>",
      "</section>",
      "</main>",
    ].join(""),
  });
}

export function sessionPage(sessionId: string, deeplink: string, qrSvg: string): string {
  const escapedDeeplink = escapeHtml(deeplink);
  return htmlPage({
    title: "Fake Issuance Session",
    body: [
      '<header class="app-header">',
      "<div>",
      '<p class="eyebrow">Fake issuance session</p>',
      "<h1>Scan with an EUDI Wallet</h1>",
      "</div>",
      '<span class="status-label" id="status-label">waiting</span>',
      "</header>",
      '<main class="session-layout">',
      '<section class="panel qr-panel">',
      '<div class="qr-box" id="qr-box" aria-live="polite">',
      '<div class="qr-code" id="qr-code">',
      qrSvg,
      "</div>",
      '<div class="qr-empty" id="qr-empty" hidden></div>',
      "</div>",
      '<p class="scan-text" id="scan-text">Scan with an EUDI Wallet</p>',
      '<a class="deeplink" href="',
      escapedDeeplink,
      '">',
      escapedDeeplink,
      "</a>",
      "</section>",
      '<section class="panel metadata-panel">',
      '<div class="section-head">',
      "<h2>Wallet metadata</h2>",
      '<span class="status-label" id="updated-label">not observed</span>',
      "</div>",
      '<div class="metadata-grid" id="metadata-grid">',
      '<div class="metadata-row"><span>client_id</span><code>not observed</code></div>',
      '<div class="metadata-row"><span>redirect_uri</span><code>not observed</code></div>',
      '<div class="metadata-row"><span>wallet_jwks</span><code>not observed</code></div>',
      '<div class="metadata-row"><span>dpop_jwk</span><code>not observed</code></div>',
      "</div>",
      '<pre class="metadata-json" id="metadata-json">{}</pre>',
      "</section>",
      "</main>",
      "<script>window.__FAKE_ISSUER_SESSION_ID__ = ",
      JSON.stringify(sessionId),
      ";</script>",
      "<script>",
      clientScript(),
      "</script>",
    ].join(""),
  });
}

export function errorPage(message: string): string {
  return htmlPage({
    title: "Fake Issuer Error",
    body: [
      '<main class="launch-layout">',
      '<section class="panel danger-panel">',
      '<p class="eyebrow">Error</p>',
      "<h1>",
      escapeHtml(message),
      "</h1>",
      '<a class="button-primary" href="/">Back to launcher</a>',
      "</section>",
      "</main>",
    ].join(""),
  });
}

function htmlPage({ title, body }: { title: string; body: string }): string {
  return [
    "<!doctype html>",
    '<html lang="en">',
    "<head>",
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    "<title>",
    escapeHtml(title),
    "</title>",
    "<style>",
    appCss(),
    "</style>",
    "</head>",
    "<body>",
    body,
    '<script>console.log("%cFake Issuer%c Credimi capture UI", "background:#FFD23F;color:#000;border:2px solid #000;padding:4px 8px;font-weight:800;", "background:#000;color:#FFFDF5;padding:6px 8px;font-weight:700;");</script>',
    "</body>",
    "</html>",
  ].join("");
}

function appCss(): string {
  return [
    ":root { --black: #000000; --paper: #FFFDF5; --yellow: #FFD23F; --pink: #FF6B6B; --blue: #74B9FF; --green: #88D498; --lavender: #B8A9FA; --grey: #D9D9D9; }",
    "* { box-sizing: border-box; }",
    "body { margin: 0; min-height: 100vh; background: var(--paper); color: var(--black); font-family: Inter, system-ui, sans-serif; font-size: 16px; line-height: 1.55; }",
    "h1, h2, p { margin: 0; }",
    "h1 { font-family: Syne, Space Grotesk, system-ui, sans-serif; font-size: clamp(32px, 5vw, 56px); line-height: 1; font-weight: 800; letter-spacing: 0; }",
    "h2 { font-family: Space Grotesk, Inter, system-ui, sans-serif; font-size: 28px; line-height: 1.15; font-weight: 700; letter-spacing: 0; }",
    'code, pre, .eyebrow, .status-label, .button-primary, dt { font-family: "Space Mono", ui-monospace, SFMono-Regular, Menlo, monospace; }',
    ".app-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; padding: 32px; border-bottom: 3px solid var(--black); background: var(--blue); }",
    ".eyebrow { margin-bottom: 8px; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; }",
    ".status-label { display: inline-flex; align-items: center; min-height: 28px; padding: 4px 8px; border: 2px solid var(--black); background: var(--green); box-shadow: 3px 3px 0 0 var(--black); font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; white-space: nowrap; }",
    ".launch-layout, .session-layout { display: grid; grid-template-columns: minmax(0, 1fr) minmax(320px, 520px); gap: 24px; width: min(1180px, calc(100vw - 32px)); margin: 32px auto; }",
    ".panel { border: 3px solid var(--black); background: var(--paper); box-shadow: 8px 8px 0 0 var(--black); padding: 24px; }",
    ".launch-panel { display: grid; gap: 24px; align-content: start; background: var(--yellow); }",
    ".info-panel, .metadata-panel { background: var(--paper); }",
    ".danger-panel { background: var(--pink); }",
    ".button-primary { display: inline-flex; align-items: center; justify-content: center; min-height: 48px; padding: 10px 16px; border: 3px solid var(--black); background: var(--yellow); color: var(--black); box-shadow: 5px 5px 0 0 var(--black); font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; text-decoration: none; cursor: pointer; }",
    ".button-primary:hover { transform: translate(2px, 2px); box-shadow: 3px 3px 0 0 var(--black); }",
    ".compact-list { display: grid; gap: 12px; margin: 24px 0 0; }",
    ".compact-list div { border: 2px solid var(--black); padding: 12px; background: var(--lavender); }",
    "dt { font-size: 12px; font-weight: 700; letter-spacing: 0.06em; }",
    "dd { margin: 4px 0 0; }",
    ".qr-panel { display: grid; gap: 16px; align-content: start; background: var(--yellow); }",
    ".qr-box { width: min(100%, 336px); aspect-ratio: 1; display: grid; place-items: center; border: 3px solid var(--black); background: var(--paper); padding: 20px; }",
    ".qr-code svg { display: block; width: 100%; height: auto; }",
    ".qr-empty { width: 100%; height: 100%; background: var(--grey); border: 3px dashed var(--black); }",
    ".scan-text { font-family: Space Grotesk, Inter, system-ui, sans-serif; font-size: 28px; font-weight: 700; line-height: 1.15; }",
    '.deeplink { overflow-wrap: anywhere; color: var(--black); font-family: "Space Mono", ui-monospace, monospace; font-size: 12px; }',
    ".section-head { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 16px; }",
    ".metadata-grid { display: grid; gap: 8px; margin-bottom: 16px; }",
    ".metadata-row { display: grid; grid-template-columns: 140px minmax(0, 1fr); gap: 8px; border: 2px solid var(--black); background: var(--blue); padding: 10px; }",
    '.metadata-row span { font-family: "Space Mono", ui-monospace, monospace; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; }',
    ".metadata-row code { overflow-wrap: anywhere; font-size: 12px; }",
    ".metadata-json { min-height: 280px; max-height: 50vh; overflow: auto; margin: 0; border: 3px solid var(--black); background: var(--paper); padding: 16px; white-space: pre-wrap; }",
    "@media (max-width: 860px) { .app-header, .section-head { flex-direction: column; } .launch-layout, .session-layout { grid-template-columns: 1fr; } .metadata-row { grid-template-columns: 1fr; } }",
  ].join("\n");
}

function clientScript(): string {
  return '(function () {\n  const sessionId = window.__FAKE_ISSUER_SESSION_ID__;\n  const qrCode = document.getElementById("qr-code");\n  const qrEmpty = document.getElementById("qr-empty");\n  const scanText = document.getElementById("scan-text");\n  const statusLabel = document.getElementById("status-label");\n  const updatedLabel = document.getElementById("updated-label");\n  const metadataGrid = document.getElementById("metadata-grid");\n  const metadataJson = document.getElementById("metadata-json");\n\n  function setQrConsumed(consumed) {\n    qrCode.hidden = consumed;\n    qrEmpty.hidden = !consumed;\n    scanText.textContent = consumed ? "QR consumed" : "Scan with an EUDI Wallet";\n  }\n\n  function metadataRows(session) {\n    const walletJwks = session.observed.wallet_jwks.observed\n      ? JSON.stringify(session.observed.wallet_jwks.jwks)\n      : "not observed";\n    const dpopJwk = session.observed.dpop_jwk.observed\n      ? JSON.stringify(session.observed.dpop_jwk.jwk)\n      : "not observed";\n    return [\n      ["client_id", session.observed.client_id.value || "not observed"],\n      ["redirect_uri", session.observed.redirect_uri.value || "not observed"],\n      ["wallet_jwks", walletJwks],\n      ["dpop_jwk", dpopJwk],\n    ];\n  }\n\n  function render(session) {\n    setQrConsumed(session.status !== "created");\n    statusLabel.textContent = session.status.replaceAll("_", " ");\n    const observed = Boolean(\n      session.observed.client_id.value ||\n        session.observed.redirect_uri.value ||\n        session.observed.wallet_jwks.observed ||\n        session.observed.dpop_jwk.observed,\n    );\n    updatedLabel.textContent = observed ? "observed" : "not observed";\n    metadataGrid.innerHTML = metadataRows(session)\n      .map(function (row) {\n        return \'<div class="metadata-row"><span>\' + escapeHtml(row[0]) + \'</span><code>\' + escapeHtml(row[1]) + \'</code></div>\';\n      })\n      .join("");\n    metadataJson.textContent = JSON.stringify(\n      {\n        session_id: session.session_id,\n        status: session.status,\n        observed: session.observed,\n        checks: session.checks,\n        events: session.events,\n      },\n      null,\n      2,\n    );\n  }\n\n  function escapeHtml(value) {\n    return String(value).replace(/[&<>"\']/g, function (char) {\n      return {\n        "&": "&amp;",\n        "<": "&lt;",\n        ">": "&gt;",\n        \'"\': "&quot;",\n        "\'": "&#39;",\n      }[char];\n    });\n  }\n\n  async function poll() {\n    const response = await fetch("/sessions/" + encodeURIComponent(sessionId), {\n      headers: { accept: "application/json" },\n    });\n    if (!response.ok) throw new Error("session fetch failed");\n    render(await response.json());\n  }\n\n  poll().catch(console.error);\n  setInterval(function () {\n    poll().catch(console.error);\n  }, 1500);\n})();';
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[char] ?? char;
  });
}
