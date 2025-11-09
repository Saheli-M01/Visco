import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { runCode } from "@/lib/runners/codeRunner";

const DEFAULT_CPP = `#include <bits/stdc++.h>
using namespace std;

int main(){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n; if(!(cin >> n)) return 0;
    long long s = 0; for(int i=1;i<=n;i++) s += i; 
    cout << s << "\n";
    return 0;
}`;

export default function CppRunner(){
  const [source, setSource] = useState(DEFAULT_CPP);
  const [stdin, setStdin] = useState("10\n");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const onRun = async () => {
    setLoading(true); setError(null); setResult(null);
    try {
      const out = await runCode({ language: 'cpp', source, stdin });
      setResult(out);
    } catch (e) {
      setError(e.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-5xl py-6 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>C++ Online Runner (Piston)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Source (main.cpp)</label>
            <textarea className="w-full min-h-48 rounded-md border p-3 font-mono text-sm" value={source} onChange={(e)=>setSource(e.target.value)} rows={16} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">stdin</label>
            <input className="w-full rounded-md border p-2 font-mono text-sm" value={stdin} onChange={(e)=>setStdin(e.target.value)} />
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={onRun} disabled={loading}>{loading ? 'Running…' : 'Run'}</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Output</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <pre className="text-red-600 whitespace-pre-wrap">{error}</pre>
          )}
          {!error && result && (
            <div className="space-y-3">
              {result.compileOutput ? (
                <div>
                  <div className="font-semibold">Compilation</div>
                  <pre className="bg-muted p-3 rounded whitespace-pre-wrap">{result.compileOutput}</pre>
                </div>
              ) : null}
              <div>
                <div className="font-semibold">Stdout</div>
                <pre className="bg-muted p-3 rounded whitespace-pre-wrap">{result.stdout || '(empty)'}
                </pre>
              </div>
              {result.stderr ? (
                <div>
                  <div className="font-semibold">Stderr</div>
                  <pre className="bg-muted p-3 rounded whitespace-pre-wrap">{result.stderr}</pre>
                </div>
              ) : null}
              <div className="text-sm text-muted-foreground">
                <span className="mr-3">Status: {result.status}</span>
                {result.timeMs != null && <span className="mr-3">Time: {result.timeMs} ms</span>}
                {result.memoryKb != null && <span>Mem: {result.memoryKb} KB</span>}
              </div>
            </div>
          )}
          {!error && !result && (
            <div className="text-sm text-muted-foreground">Run to see results</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
