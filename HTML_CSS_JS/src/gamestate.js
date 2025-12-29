// gamestate.js - lightweight port of gamestate.lua responsibilities
(function(){
  const GameState = {
    state: 'menu', // 'menu' | 'playing' | 'paused'
    listeners: [],
    init(){ this.state = 'menu'; this._broadcast(); if(typeof window !== 'undefined') window.menuActive = true },
    getState(){ return this.state },
    setState(s){ if(this.state === s) return; this.state = s; this._onStateChange(); },
    enterMenu(){ this.setState('menu') },
    enterPlaying(){ this.setState('playing') },
    enterPaused(){ this.setState('paused') },
    togglePause(){ if(this.state === 'paused') this.enterPlaying(); else this.enterPaused() },
    isPaused(){ return this.state === 'paused' },
    onChange(cb){ if(typeof cb === 'function') this.listeners.push(cb) },
    _onStateChange(){ this._broadcast(); if(typeof window !== 'undefined'){ window.menuActive = (this.state !== 'playing') } },
    _broadcast(){ for(const cb of this.listeners){ try{ cb(this.state) }catch(e){} } }
  }

  if(typeof window !== 'undefined') window.GameState = window.GameState || GameState
  if(typeof module !== 'undefined') module.exports = GameState
})();
