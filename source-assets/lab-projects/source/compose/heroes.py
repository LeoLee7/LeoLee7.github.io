import os,sys
from PIL import Image
H=os.path.expanduser('~/homepage/LeoLee7.github.io/assets/'); O=os.path.expanduser('~/Downloads/lab_projects/')
def sq(src,box,dst,pad=0.05):
    im=Image.open(src).convert('RGBA'); bg=Image.new('RGBA',im.size,'white'); im=Image.alpha_composite(bg,im).convert('RGB')
    if box: im=im.crop(box)
    s=1080; inner=int(s*(1-2*pad)); r=min(inner/im.width,inner/im.height)
    im=im.resize((int(im.width*r),int(im.height*r)),Image.LANCZOS)
    c=Image.new('RGB',(s,s),'white'); c.paste(im,((s-im.width)//2,(s-im.height)//2)); c.save(O+dst+'/hero.jpg',quality=92)
sq(H+'img/full/rtw.png',(830,240,1725,722),'01_right_this_way')
sq(H+'img/full/2604.14641.png',(1150,0,3200,800),'02_learning_to_draw_ascii')
sq(os.path.expanduser('~/gtc2027_poster/poster/hero/hero_full.png'),None,'03_touchingspace')
sq(H+'scene/print/poster.jpg',(930,0,2510,1300),'04_tactile_map_annotation',pad=0.02)
sq(H+'img/full/www.jpg',(410,1600,1683,2580),'05_pattern_insights_explorer')
