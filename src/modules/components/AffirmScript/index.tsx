import {
  AFFIRM_SNIPPET_URL,
  NEXT_PUBLIC_AFFIRM_PUBLIC_KEY_ID,
} from '@modules/app'
import Script from 'next/script'
const baseUrl = AFFIRM_SNIPPET_URL

export const AffirmScript = () =>
  baseUrl ? (
    <Script defer id="affirm-script">
      {`
        _affirm_config = {
            public_api_key:  "${NEXT_PUBLIC_AFFIRM_PUBLIC_KEY_ID}",
            script:          "${baseUrl}/js/v2/affirm.js"
          };
         (function(m,g,n,d,a,e,h,c){var b=m[n]||{},k=document.createElement(e),p=document.getElementsByTagName(e)[0],l=function(a,b,c){return function(){a[b]._.push([c,arguments])}};b[d]=l(b,d,"set");var f=b[d];b[a]={};b[a]._=[];f._=[];b._=[];b[a][h]=l(b,a,h);b[c]=function(){b._.push([h,arguments])};a=0;for(c="set add save post open empty reset on off trigger ready setProduct".split(" ");a<c.length;a++)f[c[a]]=l(b,d,c[a]);a=0;for(c=["get","token","url","items"];a<c.length;a++)f[c[a]]=function(){};k.async=
         !0;k.src=g[e];p.parentNode.insertBefore(k,p);delete g[e];f(g);m[n]=b})(window,_affirm_config,"affirm","checkout","ui","script","ready","jsReady"); console.log();
    `}
    </Script>
  ) : (
    <></>
  )
