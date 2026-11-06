from PIL import Image, ImageDraw, ImageFont, ImageChops
D='/Users/liliu/Downloads/lab_projects/01_right_this_way/'
h=Image.open(D+'hero.jpg').convert('RGB')
o=Image.open('o1.png').convert('RGB')
print(o.size)
d=ImageChops.difference(o.resize(h.size,Image.LANCZOS),h); print('diff',d.getbbox(),max(e[1] for e in d.getextrema()))
base=o.resize((2160,2160),Image.LANCZOS) if max(e[1] for e in d.getextrema())<40 else h
base.save('h1_base.png')
S=4
F='/Applications/Microsoft PowerPoint.app/Contents/Resources/DFonts/Candarab.ttf'
f=ImageFont.truetype(F,47*S)
lay=Image.new('L',(2160*S,2160*S),0); dr=ImageDraw.Draw(lay)
cx=1793*S
for t,y in (('Directional guidance',1420),('for moving cameras',1478)):
    dr.text((cx,y*S),t,font=f,fill=255,anchor='ma')
lay=lay.resize((2160,2160),Image.LANCZOS)
out=base.copy(); out.paste(Image.new('RGB',out.size,(78,122,82)),(0,0),lay)
print('text bbox',lay.getbbox())
out.save('h1_caption.png'); out.save('h1_caption.jpg',quality=95,subsampling=0)
out.crop((1200,800,2160,1700)).save('h1_crop.jpg',quality=90)
