#!/usr/bin/env python3
"""Static dev server that disables browser caching (avoids stale JS/CSS in Firefox).

    python3 tools/serve.py [port]    # default 8080
"""
import http.server, os, sys, functools

class NoCache(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        super().end_headers()

port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
http.server.ThreadingHTTPServer(('', port), NoCache).serve_forever()
