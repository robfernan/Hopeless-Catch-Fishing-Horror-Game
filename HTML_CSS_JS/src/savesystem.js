// Simple SaveSystem using localStorage
export const SaveSystem = {
  prefix: 'hopelesscatch_save_',
  autosaveKey: 'hopelesscatch_autosave',
  _key(name){ return this.prefix + name },
  save(name, data){
    try{
      const json = JSON.stringify(data)
      localStorage.setItem(this._key(name), json)
      return true
    }catch(e){ console.error('Save failed', e); return false }
  },
  load(name){
    try{
      const json = localStorage.getItem(this._key(name))
      if(!json) return null
      return JSON.parse(json)
    }catch(e){ console.error('Load failed', e); return null }
  },
  delete(name){
    try{ localStorage.removeItem(this._key(name)); return true }catch(e){ console.error(e); return false }
  },
  list(){
    const saves = []
    for(let i=0;i<localStorage.length;i++){
      const k = localStorage.key(i)
      if(k && k.indexOf(this.prefix) === 0){ saves.push(k.substring(this.prefix.length)) }
    }
    return saves
  },
  autosave(data){
    try{ localStorage.setItem(this.autosaveKey, JSON.stringify(data)); return true }catch(e){ console.error('Autosave failed', e); return false }
  },
  loadAutosave(){
    try{ const j = localStorage.getItem(this.autosaveKey); return j ? JSON.parse(j) : null }catch(e){ console.error('Load autosave failed', e); return null }
  }
}

// If loaded via <script type="module"> nothing else to do. For file:// inline fallback
if(typeof window !== 'undefined') window.SaveSystem = window.SaveSystem || SaveSystem
