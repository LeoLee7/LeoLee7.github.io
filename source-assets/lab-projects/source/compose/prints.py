import json,os
H=os.path.expanduser
INK,ACC,GR,BG='#0f1a2a','#2443a8','#c3c8d1','#f4f5f7'
O=H('~/Downloads/lab_projects/')
def wrap(i,body):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="1080" height="1080">
<style>.k{{fill:{INK}}}.a{{fill:{ACC}}}.g{{fill:{GR}}}.ln{{fill:none;stroke:{INK}}}.al{{fill:none;stroke:{ACC}}}.gl{{fill:none;stroke:{GR}}}</style>
<defs><filter id="t" x="-6%" y="-6%" width="112%" height="112%">
<feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="{i*7}" result="w"/>
<feDisplacementMap in="SourceGraphic" in2="w" scale="2.2" xChannelSelector="R" yChannelSelector="G" result="d"/>
<feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="1" seed="{i}" result="n"/>
<feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -1.3 1.45" result="m"/>
<feComposite in="d" in2="m" operator="in"/></filter></defs>
<rect width="300" height="300" fill="{BG}"/><g filter="url(#t)">{body}</g></svg>'''
# 1 Right This Way: the view misses the object; a shifted frame finds it
b1=f'''<circle class="g" cx="190" cy="196" r="46"/><circle class="k" cx="190" cy="196" r="7"/>
<rect class="ln" x="46" y="50" width="138" height="138" rx="8" stroke-width="3"/>
<rect class="al" x="121" y="127" width="138" height="138" rx="8" stroke-width="3.5" stroke-dasharray="7 6"/>
<path class="al" d="M116 118 L150 152" stroke-width="5" stroke-linecap="round"/><path class="a" d="M158 160 L140 154 L152 142 Z"/>'''
# 2 ASCII: the sketch grid from the paper figure, with B, C, A as cells
c=[]
x0,y0,s=50,50,50
for r in range(5):
    for q in range(5):
        x,y=x0+q*s,y0+r*s
        c.append(f'<path class="ln" d="M{x-5} {y}H{x+5}M{x} {y-5}V{y+5}" stroke-width="2.2"/>')
    if r<4:
        for q in range(4):
            c.append(f'<path class="gl" d="M{x0+q*s+11} {y0+r*s}H{x0+q*s+39}" stroke-width="2" stroke-dasharray="4 5"/>')
            pass
c.append(f'<rect class="k" x="{x0+8}" y="{y0+8}" width="34" height="34" rx="3"/>')
c.append(f'<rect class="a" x="{x0+s*2+8}" y="{y0+s+8}" width="34" height="34" rx="3"/>')
c.append(f'<rect class="k" x="{x0+s*3+8}" y="{y0+s*3+8}" width="34" height="34" rx="3"/>')
c.append(f'<path class="al" d="M{x0+25} {y0+25}L{x0+s*2+25} {y0+s+25}L{x0+s*3+25} {y0+s*3+25}" stroke-width="2.6" stroke-dasharray="2 6" stroke-linecap="round"/>')
b2="".join(c)
# 3 TouchingSpace: real building footprints from the map, finger point, rings
m=json.load(open(H('~/gtc2027_poster/poster/hero/map.json')))
sc=210/560; cx,cy=150,150
def P(p): return f'{cx+p[0]*sc:.1f},{cy+p[1]*sc:.1f}'
polys=[]
target=None
for b in m['b']:
    pts=b['p']
    mx=sum(p[0] for p in pts)/len(pts); my=sum(p[1] for p in pts)/len(pts)
    if abs(mx)>265 or abs(my)>265: continue
    polys.append((mx,my,pts,b.get('name','')))
polys.sort(key=lambda t:t[0]**2+t[1]**2)
tgt=polys[0]
body=[f'<rect class="ln" x="34" y="34" width="232" height="232" rx="16" stroke-width="3"/>']
for mx,my,pts,n in polys:
    cls='a' if pts is tgt[2] else 'g'
    body.append(f'<polygon class="{cls}" points="{" ".join(P(p) for p in pts)}"/>')
fx,fy=cx+tgt[0]*sc,cy+tgt[1]*sc
for r,o in [(16,1),(27,.7),(38,.45)]:
    body.append(f'<circle class="al" cx="{fx:.1f}" cy="{fy:.1f}" r="{r}" stroke-width="2.4" opacity="{o}"/>')
body.append(f'<circle class="k" cx="{fx:.1f}" cy="{fy:.1f}" r="2.4"/>')
b3="".join(body)
print('ts target',tgt[3],len(polys))
# 4 Tactile: real label positions and real Braille patterns from the printed campus map
pj=json.load(open(H('~/homepage/LeoLee7.github.io/assets/scene/print/print.json')))
BR={'a':'1','b':'12','c':'14','d':'145','e':'15','f':'124','g':'1245','h':'125','i':'24','j':'245','k':'13','l':'123','m':'134','n':'1345','o':'135','p':'1234','q':'12345','r':'1235','s':'234','t':'2345','u':'136','v':'1236','w':'2456','x':'1346','y':'13456','z':'1356'}
DIG=dict(zip('1234567890','abcdefghij'))
g=pj['groups']; xs=[a['cx'] for a in g]; ys=[a['cy'] for a in g]
x1,x2,y1,y2=min(xs),max(xs),min(ys),max(ys); k=min(176/(x2-x1),196/(y2-y1))
ox=136-k*(x1+x2)/2; oy=150-k*(y1+y2)/2
pick=min((a for a in g if 2<=len(a['code'])<=4),key=lambda a:(a['cx']-(x1+x2)/2)**2+(a['cy']-(y1+y2)/2)**2)
d=[f'<rect class="ln" x="26" y="26" width="248" height="248" rx="10" stroke-width="3"/>']
def cell(ch,x,y,cls,r):
    ch=DIG.get(ch.lower(),ch.lower()); o=[]
    for n in BR.get(ch,''):
        n=int(n); col=0 if n<=3 else 1; row=(n-1)%3
        o.append(f'<circle class="{cls}" cx="{x+col*r*2.6:.1f}" cy="{y+row*r*2.6:.1f}" r="{r}"/>')
    return "".join(o)
for a in sorted(g,key=lambda a:a is pick):
    X,Y=ox+k*a['cx'],oy+k*(y2+y1-a['cy'])
    sel=a is pick; cls='a' if sel else 'k'; r=1.9 if sel else 1.15
    if not sel: d.append(f'<rect class="g" x="{X-9:.1f}" y="{Y-6:.1f}" width="{min(len(a["code"]),4)*6+9:.1f}" height="15" rx="2" opacity=".55"/>')
    for i,ch in enumerate(a['code'][:4]):
        d.append(cell(ch,X-5+i*(r*7.5),Y-3,cls,r))
    if sel:
        d.append(f'<circle fill="{BG}" cx="{X+6:.1f}" cy="{Y+3:.1f}" r="0"/><circle class="al" cx="{X+6:.1f}" cy="{Y+3:.1f}" r="24" stroke-width="2.8"/>')
b4="".join(d)
print('tactile',pick['code'],len(g))
# 5 Frames: samples feed object tracks, tracks feed one scene frame
f=[f'<rect class="ln" x="36" y="44" width="228" height="48" rx="6" stroke-width="3"/>',
'<rect class="g" x="50" y="56" width="110" height="7" rx="3.5"/><rect class="a" x="88" y="66" width="120" height="7" rx="3.5"/><rect class="k" x="150" y="76" width="100" height="6" rx="3"/>']
cols=[('g',64),('a',150),('k',236)]
for cl,x in cols:
    f.append(f'<rect class="{cl}" x="{x-27}" y="130" width="54" height="40" rx="7"/>')
    f.append(f'<path class="{"al" if cl=="a" else "ln"}" d="M{x} 128V96" stroke-width="2.2" stroke-dasharray="3 5" stroke-linecap="round"/>')
for i in range(7):
    x=42+i*36
    near=[64,150,236][min(2,i//3 if i<6 else 2)]
    cl='a' if 2<=i<=4 else 'k'
    f.append(f'<path class="{"al" if cl=="a" else "gl"}" d="M{x+8} 214L{near} 172" stroke-width="1.8" stroke-dasharray="3 4"/>')
    f.append(f'<rect class="{cl}" x="{x}" y="216" width="16" height="16" rx="2"/>')
f.append('<path class="ln" d="M36 256H264M36 250V262M264 250V262" stroke-width="2.4"/>')
b5="".join(f)
for i,(d_,b) in enumerate([('01_right_this_way',b1),('02_learning_to_draw_ascii',b2),('03_touchingspace',b3),('04_tactile_map_annotation',b4),('05_frame_based_scene_understanding',b5)],1):
    open(O+d_+'/hero.svg','w').write(wrap(i,b))
