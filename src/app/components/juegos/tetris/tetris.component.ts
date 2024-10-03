import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';

@Component({
  selector: 'app-tetris',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tetris.component.html',
  styleUrl: './tetris.component.scss',
})
export class TetrisComponent {
  @ViewChild('canvas', { static: false })
  canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('nextShapeCanvas', { static: false })
  canvasProximaForma!: ElementRef<HTMLCanvasElement>;
  @ViewChild('scoreCanvas', { static: false })
  canvasPuntuacion!: ElementRef<HTMLCanvasElement>;
  tamañoCuadrado: number = 24;
  tamaño: number = 40;
  fps: number = 24;
  velocidad: number = 5;
  ctx!: CanvasRenderingContext2D;
  cantidadCuadradosX!: number;
  cantidadCuadradosY!: number;
  formas: Tetris[] = [];
  initialTwoDArr: any[] = [];
  puntuacion: number = 0;
  gameOver: boolean = false;
  formaActual!: Tetris;
  proximaForma!: Tetris;
  mapa: Array<Array<{ imageX: number; imageY: number }>> = [];
  grosorLineaBlanca: number = 4;
  window: Window = window;
  nctx!: CanvasRenderingContext2D;
  sctx!: CanvasRenderingContext2D;
  image!: HTMLImageElement;

  constructor() {}

  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.nctx = this.canvasProximaForma.nativeElement.getContext('2d')!;
    this.sctx = this.canvasPuntuacion.nativeElement.getContext('2d')!;
    this.cantidadCuadradosX = this.canvas.nativeElement.width / this.tamaño;
    this.cantidadCuadradosY = this.canvas.nativeElement.height / this.tamaño;
    this.loadImage('bloques.png').then(() => {
      window.addEventListener('keydown', this.handleKeyDown);
      this.resetVars();
      this.formas = [
        new Tetris(
          0,
          120,
          [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 0],
          ],
          this.mapa
        ),
        new Tetris(
          0,
          96,
          [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
          ],
          this.mapa
        ),
        new Tetris(
          0,
          72,
          [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 1],
          ],
          this.mapa
        ),
        new Tetris(
          0,
          48,
          [
            [0, 0, 0],
            [0, 1, 1],
            [1, 1, 0],
          ],
          this.mapa
        ),
        new Tetris(
          0,
          24,
          [
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
          ],
          this.mapa
        ),
        new Tetris(
          0,
          0,
          [
            [1, 1],
            [1, 1],
          ],
          this.mapa
        ),
        new Tetris(
          0,
          48,
          [
            [0, 0, 0],
            [1, 1, 0],
            [0, 1, 1],
          ],
          this.mapa
        ),
      ];
      this.formaActual = this.getRandomShape();
      this.proximaForma = this.getRandomShape();
      this.gameLoop();
    });
  }

  getRandomShape(): Tetris {
    let nuevaForma =
      this.formas[Math.floor(Math.random() * this.formas.length)];
    return nuevaForma;
  }

  loadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.image = new Image();
      this.image.src = src;
      this.image.onload = () => resolve(); // Resolve when image is loaded
      this.image.onerror = reject; // Reject if there's an error
    });
  }

  gameLoop = () => {
    setInterval(this.update, 1000 / this.velocidad);
    setInterval(this.draw, 1000 / this.fps);
  };

  deleteCompleteRows = () => {
    for (let i = 0; i < this.mapa.length; i++) {
      let t = this.mapa[i];
      let isComplete = true;
      for (let j = 0; j < t.length; j++) {
        if (t[j].imageX == -1) isComplete = false;
      }
      if (isComplete) {
        console.log('complete row');
        this.puntuacion += 1000;
        for (let k = i; k > 0; k--) {
          this.mapa[k] = this.mapa[k - 1];
        }
        let temp = [];
        for (let j = 0; j < this.cantidadCuadradosX; j++) {
          temp.push({ imageX: -1, imageY: -1 });
        }
        this.mapa[0] = temp;
      }
    }
  };

  update = () => {
    if (this.gameOver) return;
    if (this.formaActual.checkFondo()) {
      this.formaActual.y += 1;
    } else {
      for (let k = 0; k < this.formaActual.template.length; k++) {
        for (let l = 0; l < this.formaActual.template.length; l++) {
          if (this.formaActual.template[k][l] == 0) continue;
          this.mapa[this.formaActual.posicionTrancada().y + l][
            this.formaActual.posicionTrancada().x + k
          ] = {
            imageX: this.formaActual.imagenX,
            imageY: this.formaActual.imagenY,
          };
        }
      }

      this.deleteCompleteRows();
      this.formaActual = this.proximaForma;
      this.proximaForma = this.getRandomShape();
      if (!this.formaActual.checkFondo()) {
        this.gameOver = true;
      }
      this.puntuacion += 100;
    }
  };

  drawRect = (
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ) => {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
  };

  drawBackground = () => {
    this.drawRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height,
      '#bca0dc'
    );
    for (let i = 0; i < this.cantidadCuadradosX + 1; i++) {
      this.drawRect(
        this.tamaño * i - this.grosorLineaBlanca,
        0,
        this.grosorLineaBlanca,
        this.canvas.nativeElement.height,
        'white'
      );
    }

    for (let i = 0; i < this.cantidadCuadradosY + 1; i++) {
      this.drawRect(
        0,
        this.tamaño * i - this.grosorLineaBlanca,
        this.canvas.nativeElement.width,
        this.grosorLineaBlanca,
        'white'
      );
    }
  };

  drawCurrentTetris = () => {
    for (let i = 0; i < this.formaActual.template.length; i++) {
      for (let j = 0; j < this.formaActual.template.length; j++) {
        if (this.formaActual.template[i][j] == 0) continue;
        this.ctx.drawImage(
          this.image,
          this.formaActual.imagenX,
          this.formaActual.imagenY,
          this.tamañoCuadrado,
          this.tamañoCuadrado,
          Math.trunc(this.formaActual.x) * this.tamaño + this.tamaño * i,
          Math.trunc(this.formaActual.y) * this.tamaño + this.tamaño * j,
          this.tamaño,
          this.tamaño
        );
      }
    }
  };

  drawSquares = () => {
    for (let i = 0; i < this.mapa.length; i++) {
      let t = this.mapa[i];
      for (let j = 0; j < t.length; j++) {
        if (t[j].imageX == -1) continue;
        this.ctx.drawImage(
          this.image,
          t[j].imageX,
          t[j].imageY,
          this.tamañoCuadrado,
          this.tamañoCuadrado,
          j * this.tamaño,
          i * this.tamaño,
          this.tamaño,
          this.tamaño
        );
      }
    }
  };

  drawproximaForma = () => {
    this.nctx.fillStyle = '#bca0dc';
    this.nctx.fillRect(
      0,
      0,
      this.canvasProximaForma.nativeElement.width,
      this.canvasProximaForma.nativeElement.height
    );
    for (let i = 0; i < this.proximaForma.template.length; i++) {
      for (let j = 0; j < this.proximaForma.template.length; j++) {
        if (this.proximaForma.template[i][j] == 0) continue;
        this.nctx.drawImage(
          this.image,
          this.proximaForma.imagenX,
          this.proximaForma.imagenY,
          this.tamañoCuadrado,
          this.tamañoCuadrado,
          this.tamaño * i,
          this.tamaño * j + this.tamaño,
          this.tamaño,
          this.tamaño
        );
      }
    }
  };

  drawpuntuacion = () => {
    this.sctx.clearRect(
      0,
      0,
      this.canvasPuntuacion.nativeElement.width,
      this.canvasPuntuacion.nativeElement.height
    );
    this.sctx.font = '64px Poppins';
    this.sctx.fillStyle = 'black';
    this.sctx.fillText(this.puntuacion.toString(), 10, 50);
  };

  drawGameOver = () => {
    this.ctx.font = '64px Poppins';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText('Game Over!', 10, this.canvas.nativeElement.height / 2);
  };

  draw = () => {
    this.ctx.clearRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );
    this.drawBackground();
    this.drawSquares();
    this.drawCurrentTetris();
    this.drawproximaForma();
    this.drawpuntuacion();
    if (this.gameOver) {
      this.drawGameOver();
    }
  };

  resetVars = () => {
    for (let i = 0; i < this.cantidadCuadradosY; i++) {
      let temp = [];
      for (let j = 0; j < this.cantidadCuadradosX; j++) {
        temp.push({ imageX: -1, imageY: -1 });
      }
      this.initialTwoDArr.push(temp);
    }
    this.puntuacion = 0;
    this.gameOver = false;
    this.formaActual = this.getRandomShape();
    this.proximaForma = this.getRandomShape();
    this.mapa = this.initialTwoDArr;
  };

  handleKeyDown = (event: KeyboardEvent): void => {
    switch (event.key) {
      case 'ArrowLeft':
        this.formaActual.moverIzquierda();
        break;
      case 'ArrowUp':
        this.formaActual.cambiarRotacion();
        break;
      case 'ArrowRight':
        this.formaActual.moverDerecha();
        break;
      case 'ArrowDown':
        this.formaActual.bajar();
        break;
    }
  };
}

class Tetris {
  imagenX: number;
  imagenY: number;
  template: Array<Array<Number>>;
  x: number;
  y: number;
  mapa: any[];

  constructor(
    imagenX: number,
    imagenY: number,
    template: Array<Array<Number>>,
    mapa: any[]
  ) {
    this.imagenX = imagenX;
    this.imagenY = imagenY;
    this.template = template;
    (this.x = 10 / 2), (this.y = 0);
    this.mapa = mapa;
  }
  posicionTrancada() {
    return { x: Math.trunc(this.x), y: Math.trunc(this.y) };
  }

  checkFondo() {
    console.log(this.mapa);
    console.log(this.template);
    for (let i = 0; i < this.template.length; i++) {
      for (let j = 0; j < this.template.length; j++) {
        if (this.template[i][j] == 0) continue;
        let realX = i + this.posicionTrancada().x;
        let realY = j + this.posicionTrancada().y;
        if (realY + 1 >= 20) {
          return false;
        }
        if (this.mapa[realY + 1][realX].imageX != -1) {
          return false;
        }
      }
    }
    return true;
  }
  checkIzquierda() {
    for (let i = 0; i < this.template.length; i++) {
      for (let j = 0; j < this.template.length; j++) {
        if (this.template[i][j] == 0) continue;
        let realX = i + this.posicionTrancada().x;
        let realY = j + this.posicionTrancada().y;
        if (realX - 1 < 0) {
          return false;
        }

        if (this.mapa[realY][realX - 1].imageX != -1) return false;
      }
    }
    return true;
  }
  checkDerecha() {
    for (let i = 0; i < this.template.length; i++) {
      for (let j = 0; j < this.template.length; j++) {
        if (this.template[i][j] == 0) continue;
        let realX = i + this.posicionTrancada().x;
        let realY = j + this.posicionTrancada().y;
        if (realX + 1 >= 10) {
          return false;
        }

        if (this.mapa[realY][realX + 1].imageX != -1) return false;
      }
    }
    return true;
  }
  moverIzquierda() {
    if (this.checkIzquierda()) {
      this.x -= 1;
    }
  }
  moverDerecha() {
    if (this.checkDerecha()) {
      this.x += 1;
    }
  }
  bajar() {
    if (this.checkFondo()) {
      this.y += 1;
    }
  }
  cambiarRotacion() {
    let tempTemplate = [];
    for (let i = 0; i < this.template.length; i++)
      tempTemplate[i] = this.template[i].slice();
    let n = this.template.length;
    for (let layer = 0; layer < n / 2; layer++) {
      let first = layer;
      let last = n - 1 - layer;
      for (let i = first; i < last; i++) {
        let offset = i - first;
        let top = this.template[first][i];
        this.template[first][i] = this.template[i][last]; // top = right
        this.template[i][last] = this.template[last][last - offset]; //right = bottom
        this.template[last][last - offset] =
          this.template[last - offset][first];
        //bottom = left
        this.template[last - offset][first] = top; // left = top
      }
    }

    for (let i = 0; i < this.template.length; i++) {
      for (let j = 0; j < this.template.length; j++) {
        if (this.template[i][j] == 0) continue;
        let realX = i + this.posicionTrancada().x;
        let realY = j + this.posicionTrancada().y;
        if (realX < 0 || realX >= 20 || realY < 0 || realY >= 10) {
          this.template = tempTemplate;
        }
      }
    }
  }
}

class Mapa {
  value: any[] = [];
  getValue() {
    return this.value;
  }
  setValue(newValue: any) {
    this.value = newValue;
  }
}
