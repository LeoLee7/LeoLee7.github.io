import os,json
INK,ACC,GR,BG='#0f1a2a','#2443a8','#c3c8d1','#f4f5f7'
m=json.load(open(os.path.expanduser('~/gtc2027_poster/poster/hero/map.json')))
sc=1.05; ox,oy=106,196
ps=[]
for b in m['b']:
    p=b['p']; mx=sum(q[0] for q in p)/len(p); my=sum(q[1] for q in p)/len(p)
    if abs(mx)<130 and abs(my)<130: ps.append((mx*mx+my*my,p))
ps.sort(key=lambda t:t[0]); tgt=ps[0][1]
big=sorted(ps,key=lambda t:-abs(sum(t[1][i][0]*t[1][(i+1)%len(t[1])][1]-t[1][(i+1)%len(t[1])][0]*t[1][i][1] for i in range(len(t[1])))))[:1]
pts=lambda p:" ".join(f"{ox+q[0]*sc:.1f},{oy+q[1]*sc:.1f}" for q in p)
b=[f'<clipPath id="c"><rect x="18" y="104" width="176" height="176" rx="10"/></clipPath><g clip-path="url(#c)">']
for _,p in ps:
    b.append(f'<polygon points="{pts(p)}" fill="{ACC if p is tgt else GR}"/>')
b.append('</g>')
b.append(f'<rect x="18" y="104" width="176" height="176" rx="10" fill="none" stroke="{INK}" stroke-width="5"/>')
tx=ox+sum(q[0] for q in tgt)/len(tgt)*sc; ty=oy+sum(q[1] for q in tgt)/len(tgt)*sc
# mental map
b.append(f'<circle cx="214" cy="86" r="66" fill="{GR}" opacity=".55"/>')
b.append(f'<path d="M176 52 V118 H254" fill="none" stroke="{INK}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>')
b.append(f'<rect x="192" y="60" width="26" height="26" rx="3" fill="{INK}"/><rect x="226" y="88" width="16" height="16" rx="2" fill="{INK}" opacity=".7"/>')
b.append(f'<circle cx="240" cy="62" r="15" fill="{ACC}"/>')
b.append(f'<path d="M{tx:.1f} {ty:.1f} C {tx+60:.1f} {ty-10:.1f}, 262 170, 243 82" fill="none" stroke="{ACC}" stroke-width="4.5" stroke-dasharray="1 11" stroke-linecap="round"/>')
svg=f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="1080" height="1080"><defs><filter id="t" x="-6%" y="-6%" width="112%" height="112%">
<feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="2" seed="28" result="w"/><feDisplacementMap in="SourceGraphic" in2="w" scale="4.5" xChannelSelector="R" yChannelSelector="G" result="d"/>
<feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="1" seed="4" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -1.3 1.45" result="m"/><feComposite in="d" in2="m" operator="in"/></filter></defs>
<rect width="300" height="300" fill="{BG}"/><g filter="url(#t)">{"".join(b)}</g></svg>'''
open(os.path.expanduser('~/Downloads/lab_projects/04_tactile_map_annotation/hero_print.svg'),'w').write(svg); print(len(ps),round(tx),round(ty))
