import Document_, { Html, Head, Main, NextScript } from 'next/document'
import { GA_ID } from '../lib/metrics'
import { useAmp } from 'next/amp'

function AmpWrap({ ampOnly, nonAmp }) {
  const isAmp = useAmp()
  if (ampOnly) return isAmp && ampOnly
  return !isAmp && nonAmp
}

export default class Document extends Document_ {
  render() {
    return (
      <Html lang="en">
        <Head>
          <AmpWrap
            ampOnly={
              <>
                <script
                  async
                  key="amp-analytics"
                  custom-element="amp-analytics"
                  src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
                />
                <script
                  async
                  key="amp-bind"
                  custom-element="amp-bind"
                  src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
                />
                <script
                  async
                  key="amp-form"
                  custom-element="amp-form"
                  src="https://cdn.ampproject.org/v0/amp-form-0.1.js"
                />
              </>
            }
          />
        </Head>
        <body>
          <Main />
          <AmpWrap
            ampOnly={
              <>
                <amp-analytics type="gtag" data-credentials="include">
                  <script
                    type="application/json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify({
                        vars: {
                          gtag_id: GA_ID,
                          config: {
                            [GA_ID]: { groups: 'default' }
                          }
                        }
                      })
                    }}
                  />
                </amp-analytics>
              </>
            }
          />
          <AmpWrap
            nonAmp={
              <>
                <script
                  async
                  src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                />
                <script
                  dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_ID}');
                  `
                  }}
                />
                <script
                  dangerouslySetInnerHTML={{
                    __html: `
                  (function(f,a){if(!a.__SV){var b=window;try{var d,m,j,k=b.location,c=k.hash;d=function(a,b){return(m=a.match(RegExp(b+"=([^&]*)")))?m[1]:null};c&&d(c,"state")&&(j=JSON.parse(decodeURIComponent(d(c,"state"))),"mpeditor"===j.action&&(b.sessionStorage.setItem("_mpcehash",c),history.replaceState(j.desiredHash||"",f.title,k.pathname+k.search)))}catch(n){}var l,h;window.freshpaint=a;a._i=[];a.init=function(b,d,g){function c(b,i){var a=i.split(".");2==a.length&&(b=b[a[0]],i=a[1]);b[i]=function(){b.push([i].concat(Array.prototype.slice.call(arguments,
                  0)))}}var e=a;"undefined"!==typeof g?e=a[g]=[]:g="freshpaint";e.people=e.people||[];e.toString=function(b){var a="freshpaint";"freshpaint"!==g&&(a+="."+g);b||(a+=" (stub)");return a};e.people.toString=function(){return e.toString(1)+".people (stub)"};l="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");
                  for(h=0;h<l.length;h++)c(e,l[h]);var f="set set_once union unset remove delete".split(" ");e.get_group=function(){function a(c){b[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));e.push([d,call2])}}for(var b={},d=["get_group"].concat(Array.prototype.slice.call(arguments,0)),c=0;c<f.length;c++)a(f[c]);return b};a._i.push([b,d,g])};a.__SV=1.3;b=f.createElement("script");b.type="text/javascript";b.async=!0;b.src="undefined"!==typeof FRESHPAINT_CUSTOM_LIB_URL?
                  FRESHPAINT_CUSTOM_LIB_URL:"//perfalytics.com/static/js/freshpaint.js";d=f.getElementsByTagName("script")[0];d.parentNode.insertBefore(b,d)}})(document,window.freshpaint||[]);
                  freshpaint.init("a6dd3e0f-516a-450c-acc1-a17c0af70ea5");
                  `
                  }}
                />
                <script
                  async
                  dangerouslySetInnerHTML={{
                    __html: `
              if (window.location.hostname === 'vercel.com'){
                window['_fs_debug'] = false;
                window['_fs_host'] = 'fullstory.com';
                window['_fs_org'] = 'N63EP';
                window['_fs_namespace'] = 'FS';
                (function(m,n,e,t,l,o,g,y){
                      if (e in m) {if(m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].');} return;}
                      g=m[e]=function(a,b,s){g.q?g.q.push([a,b,s]):g._api(a,b,s);};g.q=[];
                      o=n.createElement(t);o.async=1;o.crossOrigin='anonymous';o.src='https://'+_fs_host+'/s/fs.js';
                      y=n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o,y);
                      g.identify=function(i,v,s){g(l,{uid:i},s);if(v)g(l,v,s)};g.setUserVars=function(v,s){g(l,v,s)};g.event=function(i,v,s){g('event',{n:i,p:v},s)};
                      g.shutdown=function(){g("rec",!1)};g.restart=function(){g("rec",!0)};
                      g.log = function(a,b) { g("log", [a,b]) };
                      g.consent=function(a){g("consent",!arguments.length||a)};
                      g.identifyAccount=function(i,v){o='account';v=v||{};v.acctId=i;g(o,v)};
                      g.clearUserCookie=function(){};
                })(window,document,window['_fs_namespace'],'script','user');
              }`
                  }}
                />
              </>
            }
          />
          <NextScript />
        </body>
      </Html>
    )
  }
}
