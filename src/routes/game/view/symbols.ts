export type vec2 = {x:number,y:number};
export type ScoreContext = {
    width: number;
    lineSpacing: number;
    height: number;
    noteSpacing: number;
    origin: number;
    bottomPosition:number;
    topPosition:number;
    noteLine:number;
};


class MusicSymbol {
  path: string;
  size: vec2;
  offset: vec2;
  scale: number;

  constructor(path: string, size: vec2, scale = 1, offset: vec2 = {x:0,y:0}) {
    this.path = path;
    this.size = size;
    this.offset = offset;
    this.scale = scale;
  }

}

export const MUSIC_SYMBOLS: MusicSymbol[] = [
    new MusicSymbol('src/lib/notes/whole.svg', {x:460, y:308}, 0.9),
    new MusicSymbol('src/lib/notes/half.png', {x:315, y:899},3, {x:0, y:-2}),
    new MusicSymbol('src/lib/notes/4th.png', {x:171, y:479},3, {x:0, y:-2}),
    new MusicSymbol('src/lib/notes/treble_clef.png', {x:751, y:1280},6, {x:0, y:-2.4})
];
