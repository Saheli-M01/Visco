// Vercel serverless function: C++ code execution via Piston API
// Minimal MVP for compiling and running C++ code submitted from the frontend.
// Security notes:
//  - Limits source length
//  - Single file only
//  - Timeouts enforced by fetch AbortController
//  - Returns normalized output shape

const PISTON_ENDPOINT = "https://emkc.org/api/v2/piston/execute"; // Public Piston endpoint
const MAX_SOURCE_LENGTH = 50 * 1024; // 50KB limit
const DEFAULT_VERSION = "latest"; // Piston allows "latest" shortcut

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Vercel's Node serverless may not auto-parse JSON for raw requests; handle both cases.
    let body = req.body;
    if (!body || typeof body !== 'object') {
      body = await readJsonBody(req);
    }
    const { language, source, stdin = '' } = body || {};

    if (!language || !source) {
      res.status(400).json({ error: 'language and source are required' });
      return;
    }

    if (language !== 'cpp') {
      res.status(400).json({ error: 'Only cpp supported for now' });
      return;
    }

    if (source.length > MAX_SOURCE_LENGTH) {
      res.status(413).json({ error: 'Source too large' });
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000); // 12s timeout

    // Build Piston payload
    const payload = {
      language: 'cpp',
      version: DEFAULT_VERSION,
      files: [
        {
          name: 'main.cpp',
          content: source,
        },
      ],
      stdin,
      args: [],
      compile_timeout: 8000,
      run_timeout: 8000,
      compile_memory_limit: -1,
      run_memory_limit: -1,
    };

    const pistonResp = await fetch(PISTON_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!pistonResp.ok) {
      const text = await pistonResp.text();
      res.status(502).json({ error: 'Upstream error', upstream: text });
      return;
    }

    const data = await pistonResp.json();

    // Normalize output
    const compile = data.compile || {};
    const run = data.run || {};

    const result = {
      stdout: run.output || '',
      stderr: run.stderr || '',
      compileOutput: compile.output || '',
      exitCode: run.code ?? null,
      timeMs: run.time ?? null,
      memoryKb: run.memory ?? null,
      status: determineStatus({ compile, run }),
    };

    res.status(200).json(result);
  } catch (err) {
    if (err.name === 'AbortError') {
      res.status(504).json({ error: 'Execution timed out' });
      return;
    }
    res.status(500).json({ error: 'Internal error', detail: err.message });
  }
}

function determineStatus({ compile, run }) {
  if (compile && compile.code && compile.code !== 0) return 'compile-error';
  if (run && typeof run.signal === 'string' && run.signal.length) return 'runtime-error';
  if (run && run.code && run.code !== 0) return 'runtime-error';
  return 'ok';
}

async function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}
