from django.shortcuts import render
import pandas as pd 
from  fuzzysearch import *

# Create your views here.
def home(request):
	return render(request,'index.html')


def submit(request):
    text = request.GET['dialogue']
    ip=text.lower()
    op=dict()
    file='staticfiles/data/friends_quotes.csv'
    df = pd.read_csv(file,encoding='iso-8859-1')
    quotes=df['quote']
	
    previous_season=1
    previous_episode=1
    dl=[]
    l=0
    for i in range(len(quotes)):
       print(i)
       if(previous_season!=df['season'][i] or previous_episode!=df['episode_number'][i]):
           previous_episode+=1
           dl=[]
           previous_season+=1

           L=len(ip.split())
		#if L==1:
        
       if len(ip)<=3:
            L=0
       else:
            
            L=2

       if len(find_near_matches(ip, quotes[i], max_l_dist=(L//2)))>0:
           ep_number=df['episode_number'][i]
           for j in [-2,-1,0,1,2]:
               if i>=2 and i<=len(quotes)-2 and df['episode_number'][i+j]==ep_number:
                   dl.append(df['author'][i+j]+':'+quotes[i+j] )
                   l=1

       
      
       dl=[dl]


       if(len(dl)!=0 and l==1):
                l=0
                if( 'Season :'+str(df['season'][i])+'\tEpisode :'+str(df['episode_number'][i])+'\nEpisode Name : '+str(df['episode_title'][i]) in op):
                    op['Season :'+str(df['season'][i])+'\tEpisode :'+str(df['episode_number'][i])+'\nEpisode Name : '+str(df['episode_title'][i])]+=dl
                else:
                    op['Season :'+str(df['season'][i])+'\tEpisode :'+str(df['episode_number'][i])+'\nEpisode Name : '+str(df['episode_title'][i])]=dl

    return render(request,'index1.html',{'dialogue':op})
