import os,html
from PIL import Image,ImageFilter
O=os.path.expanduser('~/Downloads/lab_projects/')
BG=(230,233,241); M=64; S=1080
P=[
dict(d='01_right_this_way',t='Right This Way',v='NeurIPS 2024',
 h="When a photo can't answer the question, our models tell blind users how to move the camera.",
 s="Training on our label-free synthetic data raised open vision-language models by up to 16 points, and the best model beat GPT-4o.",
 p='Li Liu, Diji Yang, Sijia Zhong, Kalyana Suma Sree Tholeti, Lei Ding, Yi Zhang, Leilani H. Gilpin',
 l=[('Project page','https://leolee7.github.io/#project-right-this-way'),('Paper','https://proceedings.neurips.cc/paper_files/paper/2024/file/efe4e50d492fedc0dfd2959f3320a974-Paper-Conference.pdf'),('Code','https://github.com/LeoLee7/Directional_guidance')],po=1),
dict(d='02_learning_to_draw_ascii',t='Learning to Draw ASCII',v='COLM 2026',
 h="Language models read spatial layouts better than they build them, so we taught them to draw.",
 s="Training on ASCII layouts more than doubled drawing accuracy and improved spatial reasoning from text alone.",
 p='Shiyuan Huang, Li Liu, Jincheng He, Leilani H. Gilpin',
 l=[('Project page','https://aiea-lab.github.io/Text2Space/'),('Paper','https://arxiv.org/abs/2604.14641'),('Code','https://github.com/aiea-lab/Text2Space'),('Dataset','https://huggingface.co/datasets/ShiyuanHuang/Text2Space')],po=1),
dict(d='03_touchingspace',t='TouchingSpace',v='Under review, 2026',
 h="Blind users explore a map by touch and ask a voice agent about the place under their finger.",
 s="We built it with a blind co-designer and tested it in person with 14 blind and low-vision adults.",
 p='Li Liu, Ashmita Dua, Jacob Wei (more undergraduates to confirm)',
 l=[('Project page','https://leolee7.github.io/#project-touchingspace'),('Paper','https://arxiv.org/abs/2609.36404'),('Video','https://youtu.be/SRBqu2IxBNY')],po=0),
dict(d='04_tactile_map_annotation',t='Tactile Map Annotation',v='ASSETS 2026 Demo',
 h="On a tactile map, a building under the finger is an unnamed shape. Our tool gives it a name in Braille.",
 s="Ten blind and low-vision readers compared labeled and unlabeled prints. Each label also links to a real place, so it can drive an audio readout.",
 p='Li Liu, Ashmita Dua, Jiaming Qu, David T. Lee, Leilani H. Gilpin',
 l=[('Project page','https://leolee7.github.io/#project-tactile-annotation'),('Paper','https://doi.org/10.1145/3797867.3841235'),('Demo','https://leolee7.github.io/Annotate_Braille/'),('Video','https://youtu.be/4KqVa0DeqdM')],po=1),
dict(d='05_frame_based_scene_understanding',t='Frame-Based Scene Understanding',v='ACS 2025',
 h="Self-driving systems detect objects, but they rarely say what a scene means.",
 s="We organize raw driving data into sample, object, and scene frames that people can read.",
 p='Li Liu, Leilani H. Gilpin',
 l=[('Paper','https://openreview.net/forum?id=ld73i8PBhh')],po=1),
]
def trim(im):
    g=im.convert('L').point(lambda x:255 if x<245 else 0); b=g.getbbox(); return im.crop(b) if b else im
cards=[]; rows=["# Lab project submissions","","| Project name | Representative image | People | Start date | End date |","|---|---|---|---|---|"]
for x in P:
    D=O+x['d']+'/'
    if not os.path.exists(D+'hero_plain.jpg'): os.rename(D+'hero.jpg',D+'hero_plain.jpg')
    art=trim(Image.open(D+'hero_plain.jpg').convert('RGB'))
    c=Image.new('RGB',(S,S),BG)
    w=S-2*M; sh=Image.new('RGBA',(S,S),(0,0,0,0)); sh.paste((27,43,78,38),(M,M+10,M+w,M+w+10)); sh=sh.filter(ImageFilter.GaussianBlur(16))
    c=Image.alpha_composite(c.convert('RGBA'),sh).convert('RGB'); c.paste((255,255,255),(M,M,M+w,M+w))
    inner=w-2*36; r=min(inner/art.width,inner/art.height); art=art.resize((int(art.width*r),int(art.height*r)),Image.LANCZOS)
    c.paste(art,((S-art.width)//2,(S-art.height)//2)); c.save(D+'hero.jpg',quality=93)
    m=[f"# {x['t']}","",f"**Representative image:** hero.jpg","",f"**People:** {x['p']}","","**Start date:** TBD","","**End date:** TBD","",f"**Venue:** {x['v']}","",f"**{x['h']}**","",x['s'],"","## Resources",""]+[f"- {a}: {u}" for a,u in x['l']]
    if x['po']: m.append("- Poster: poster.pdf")
    open(D+'info.md','w').write("\n".join(m)+"\n")
    rows.append(f"| {x['t']} | {x['d']}/hero.jpg | {x['p']} | TBD | TBD |")
    links=" ".join(f'<a href="{html.escape(u)}">{a}</a>' for a,u in x['l'])+(f' <a href="{x["d"]}/poster.pdf">Poster</a>' if x['po'] else '')
    cards.append(f'<article><img src="{x["d"]}/hero.jpg" alt="{html.escape(x["t"])} representative image"><div class="b"><p class="v">{html.escape(x["v"])}</p><h2>{html.escape(x["h"])}</h2><p class="s">{html.escape(x["s"])}</p><h3>{html.escape(x["t"])}</h3><p class="p">{html.escape(x["p"])}</p><p class="l">{links}</p></div></article>')
open(O+'README.md','w').write("\n".join(rows)+"\n\nEach folder has `hero.jpg` (1080 x 1080, styled), `hero_plain.jpg` (same art on white), `info.md`, and `poster.pdf` where a poster exists. Open `preview.html` to see all cards.\n")
open(O+'preview.html','w').write('''<!doctype html><html lang="en"><meta charset="utf-8"><title>Lab projects</title><style>
body{margin:0;background:#e6e9f1;color:#1b2b4e;font:16px/1.5 "Helvetica Neue",Arial,sans-serif;padding:40px}
h1{font:400 40px Georgia,serif;margin:0 0 28px}main{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;max-width:1180px}
article{background:#fff;box-shadow:0 2px 10px rgba(27,43,78,.12)}img{width:100%;display:block}.b{padding:18px 20px 20px}
.v{margin:0 0 8px;font-size:13px;color:#56647f}h2{font:400 21px/1.3 Georgia,serif;margin:0 0 10px}.s{margin:0 0 14px;font-size:15px;color:#42506c}
h3{font-size:14px;margin:0}.p{font-size:13px;color:#56647f;margin:2px 0 10px}.l{margin:0;font-size:14px}a{color:#1f5fa8;margin-right:10px}
</style><h1>Projects</h1><main>'''+"".join(cards)+'</main></html>')
