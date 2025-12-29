// assets.js - manifest and loader that augments the inline Assets object
(function(){
  const manifest = {
    player: 'assets/player.png',
    // bait
    bait_cheese: 'assets/bait/cheese.png',
    bait_corn: 'assets/bait/corn.png',
    bait_minnows: 'assets/bait/minnows.png',
    bait_worms: 'assets/bait/worms.png',
    // fish - day fish
    fish_sunfish: 'assets/fish/sunfish.png',
    fish_bass: 'assets/fish/bass.png',
    fish_trout: 'assets/fish/trout.png',
    fish_catfish: 'assets/fish/catfish.png',
    fish_golden_carp: 'assets/fish/golden_carp.png',
    // fish - night fish
    fish_pale_crawler: 'assets/fish/pale_crawler.png',
    fish_bleeding_carp: 'assets/fish/bleeding_carp.png',
    fish_whispering_eel: 'assets/fish/whispering_eel.png',
    fish_fishman: 'assets/fish/fishman.png'
  }

  // Ensure a global Assets object exists (index.html defines a minimal one)
  if(typeof window !== 'undefined'){
    window.AssetManifest = window.AssetManifest || manifest
    window.Assets = window.Assets || { images: {}, loadImage(name,path){ return new Promise((res,rej)=>{ const img=new Image(); img.onload=()=>{window.Assets.images[name]=img;res(img)}; img.onerror=()=>{ console.warn('Asset failed:',name,path); rej(new Error('load failed')) }; img.src = path }) }, getImage(name){return this.images[name]} }

    // augment or replace loadAll to load the manifest plus any previous ones
    const oldLoadAll = window.Assets.loadAll && typeof window.Assets.loadAll === 'function' ? window.Assets.loadAll : null
    window.Assets.loadAll = async function(){
      const toLoad = Object.assign({}, window.AssetManifest || {})
      // Keep previous items loaded by oldLoadAll by running it first
      if(oldLoadAll){ try{ await oldLoadAll.call(window.Assets) }catch(e){} }
      const promises = []
      for(const k in toLoad){ if(!toLoad.hasOwnProperty(k)) continue; const p = toLoad[k]; if(!p) continue; promises.push(this.loadImage(k,p).catch(()=>{})) }
      await Promise.all(promises)
    }
  }

  if(typeof module !== 'undefined') module.exports = { manifest }
})();
