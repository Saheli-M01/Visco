// Frontend runner abstraction for executing code in various languages.
// Currently supports only C++ via backend proxy (Piston) and stubs for future JS/others.

export async function runCode({ language, source, stdin = '' }) {
  if (language === 'cpp') {
    return runCpp({ source, stdin });
  }
  throw new Error(`Language not supported yet: ${language}`);
}

async function runCpp({ source, stdin }) {
  try {
    const resp = await fetch('/api/run-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language: 'cpp', source, stdin }),
    });
    if (!resp.ok) {
      const data = await resp.json().catch(() => ({}));
      throw new Error(data.error || `Backend error: ${resp.status}`);
    }
    return await resp.json();
  } catch (e) {
    // Dev fallback: try calling Piston directly if /api is unavailable (may fail due to CORS)
    try {
      const direct = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: 'cpp',
          version: 'latest',
          files: [{ name: 'main.cpp', content: source }],
          stdin,
        }),
      });
      if (!direct.ok) throw new Error(`Piston error: ${direct.status}`);
      const data = await direct.json();
      const compile = data.compile || {};
      const run = data.run || {};
      return {
        stdout: run.output || '',
        stderr: run.stderr || '',
        compileOutput: compile.output || '',
        exitCode: run.code ?? null,
        timeMs: run.time ?? null,
        memoryKb: run.memory ?? null,
        status: (compile && compile.code && compile.code !== 0) ? 'compile-error' : ((run && run.code && run.code !== 0) ? 'runtime-error' : 'ok'),
      };
    } catch (fallbackErr) {
      throw e;
    }
  }
}
