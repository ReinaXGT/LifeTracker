#!/usr/bin/env python3
"""Cache-busting: stamps every local js/css reference in the HTML files with ?v=<content hash>.

Firefox caches static files heuristically (no Cache-Control from simple servers), so after an edit
different pages can run different versions of ui.js/store.js. Run this after editing any js/css file:

    python3 tools/stamp.py
"""
import hashlib, re, pathlib, json, time

root = pathlib.Path(__file__).resolve().parent.parent
pat = re.compile(r'((?:src|href)=")((?:js|css)/[^"?#]+\.(?:js|css))(?:\?v=[^"]*)?(")')

def stamp(m):
    f = root / m.group(2)
    if not f.exists():
        return m.group(0)
    h = hashlib.sha1(f.read_bytes()).hexdigest()[:8]
    return f'{m.group(1)}{m.group(2)}?v={h}{m.group(3)}'

# Build id: changes only when some js/css file changed. Pages compare it with the newest id seen in
# localStorage and reload themselves when they are stale (e.g. HTML served from Firefox's cache).
state_f = pathlib.Path(__file__).resolve().parent / '.build.json'
digest = hashlib.sha1(b''.join(f.read_bytes() for f in sorted([*(root / 'js').rglob('*.js'), *(root / 'css').glob('*.css')]))).hexdigest()
state = json.loads(state_f.read_text()) if state_f.exists() else {}
if state.get('digest') != digest:
    state = {'digest': digest, 'ts': int(time.time())}
    state_f.write_text(json.dumps(state))
GUARD = ('<script>/*lt-build*/(function(){try{var b=%d,k="lt_build",s=+localStorage.getItem(k)||0;'
         'if(b>s){localStorage.setItem(k,b);sessionStorage.removeItem("lt_bl")}'
         'else if(b<s){var n=+sessionStorage.getItem("lt_bl")||0;if(n<2){sessionStorage.setItem("lt_bl",n+1);location.reload()}}'
         'else sessionStorage.removeItem("lt_bl")}catch(e){}})();</script>') % state['ts']
guard_pat = re.compile(r'<script>/\*lt-build\*/.*?</script>')

for html in sorted(root.glob('*.html')):
    s = html.read_text(encoding='utf-8')
    n = pat.sub(stamp, s)
    if guard_pat.search(n):
        n = guard_pat.sub(lambda m: GUARD, n, count=1)
    else:
        n = re.sub(r'<head>', lambda m: '<head>\n' + GUARD, n, count=1)
    if n != s:
        html.write_text(n, encoding='utf-8')
        print('stamped', html.name)
