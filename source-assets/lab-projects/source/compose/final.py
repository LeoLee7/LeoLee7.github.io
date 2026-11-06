import os,html,re
src=open('restyle.py').read(); pre=src[:src.index('def trim')]; exec(pre)
from PIL import Image
for x in P:
    D=O+x['d']+'/'
    Image.open(x['d']+'.png').convert('RGB').resize((1080,1080),Image.LANCZOS).save(D+'hero.jpg',quality=94)
    for f in ('hero_plain.jpg','info.md'):
        if os.path.exists(D+f): os.remove(D+f)
    L=[f"Project name: {x['t']}","Representative image: hero.jpg (vector source: hero.svg)",f"People: {x['p']}","Start date: TBD","End date: TBD",f"Venue: {x['v']}","","Short description:",x['h'],x['s'],"","Resources:"]+[f"{a}: {u}" for a,u in x['l']]
    if x['po']: L.append("Poster: poster.pdf")
    if not any(a=='Video' for a,_ in x['l']): L.append("Video: none yet")
    open(D+'info.txt','w').write("\n".join(L)+"\n")
if os.path.exists(O+'README.md'): os.remove(O+'README.md')
R=["Lab project submissions",""]
for x in P: R+= [f"Project name: {x['t']}",f"Representative image: {x['d']}/hero.jpg",f"People: {x['p']}","Start date: TBD","End date: TBD",""]
open(O+'README.txt','w').write("\n".join(R))
cards=[]
for x in P:
    links=" ".join(f'<a href="{html.escape(u)}">{a}</a>' for a,u in x['l'])+(f' <a href="{x["d"]}/poster.pdf">Poster</a>' if x['po'] else '')
    cards.append(f'<article><img src="{x["d"]}/hero.jpg" alt="{html.escape(x["t"])} representative image"><div class="b"><h2>{html.escape(x["t"])}</h2><p class="v">{html.escape(x["v"])}</p><p class="s">{html.escape(x["h"])} {html.escape(x["s"])}</p><p class="p">{html.escape(x["p"])}</p><p class="l">{links}</p></div></article>')
open(O+'preview.html','w').write('''<!doctype html><html lang="en"><meta charset="utf-8"><title>Lab projects</title><style>
body{margin:0;background:#fff;color:#0f1a2a;font:16px/1.5 "Helvetica Neue",Arial,sans-serif;padding:40px}
h1{font:400 34px "Helvetica Neue",Arial,sans-serif;margin:0 0 26px;text-align:center}main{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;max-width:1120px;margin:auto}
article{box-shadow:0 1px 6px rgba(15,26,42,.16)}img{width:100%;display:block}.b{padding:16px 18px 18px}
h2{font-size:18px;font-weight:600;color:#2443a8;margin:0}.v{margin:2px 0 10px;font-size:13px;color:#5f6774}.s{margin:0 0 12px;font-size:15px}
.p{font-size:13px;color:#5f6774;margin:0 0 10px}.l{margin:0;font-size:14px}a{color:#2443a8;margin-right:10px}
</style><h1>Projects</h1><main>'''+"".join(cards)+'</main></html>')
