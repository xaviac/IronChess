

// class Board{
//     constructor(){
//         this.x = 0
//         this.y = 0
//         this.width = $canvas.width
//         this.height = $canvas.height
//         this.img = new Image()
//         this.img.src = "https://upload.wikimedia.org/wikipedia/commons/d/d5/Chess_Board.svg"
//         this.img.onload = () => {
//             this.draw()
//         }
//     }
//     draw(){
//         ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
//     }
// }

    

// class WhiteSide{
//     constructor(x, y){
//         this.x = $canvas.width
//         this.y = $canvas.height
//         this.width = 100
//         this.height = 100

//         this.wPawnImg = new Image()
//         this.wPawnImg.src = "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg" //"./white-pawn.svg"
//         this.wPawnImg.onload = () => {
//             this.draw()
//         }
        
//         this.wRookImg = new Image()
//         this.wRookImg.src = "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg" //"./white-rook.svg"
//         this.wRookImg.onload = () => {
//             this.draw()
//         }

//         this.wHorseImg = new Image()
//         this.wHorseImg.src = "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg" //"./white-horse.svg"
//         this.wHorseImg.onload = () => {
//             this.draw()
//         }

//         this.wBishopImg = new Image()
//         this.wBishopImg.src = "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg" //"./white-bishop.svg"
//         this.wBishopImg.onload = () => {
//             this.draw()
//         }

//         this.wQueenImg = new Image()
//         this.wQueenImg.src = "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg" //"./white-queen.svg"
//         this.wQueenImg.onload = () => {
//             this.draw()
//         }

//         this.wKingImg = new Image()
//         this.wKingImg.src = "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg" //"./white-king.svg"
//         this.wKingImg.onload = () => {
//             this.draw()
//         }

        

//     }
//     draw(){
//         ctx.drawImage(this.wPawnImg, 20, 750, this.width, this.height)
//         ctx.drawImage(this.wPawnImg, 145, 750, this.width, this.height)
//         ctx.drawImage(this.wPawnImg, 265, 750, this.width, this.height)
//         ctx.drawImage(this.wPawnImg, 385, 750, this.width, this.height)
//         ctx.drawImage(this.wPawnImg, 505, 750, this.width, this.height)
//         ctx.drawImage(this.wPawnImg, 630, 750, this.width, this.height)
//         ctx.drawImage(this.wPawnImg, 755, 750, this.width, this.height)
//         ctx.drawImage(this.wPawnImg, 875, 750, this.width, this.height)

//         ctx.drawImage(this.wRookImg, 20, 875, this.width, this.height)
//         ctx.drawImage(this.wHorseImg, 145, 875, this.width, this.height)
//         ctx.drawImage(this.wBishopImg, 270, 875, this.width, this.height)
//         ctx.drawImage(this.wQueenImg, 395, 875, this.width, this.height)
//         ctx.drawImage(this.wKingImg, 520, 875, this.width, this.height)
//         ctx.drawImage(this.wBishopImg, 645, 875, this.width, this.height)
//         ctx.drawImage(this.wHorseImg, 770, 875, this.width, this.height)
//         ctx.drawImage(this.wRookImg, 895, 875, this.width, this.height)

        
//     }
// }

// class BlackSide{
//     constructor(x, y){
//         this.x = $canvas.width
//         this.y = $canvas.height
//         this.width = 100
//         this.height = 100
                
//         this.bPawnImg = new Image()
//         this.bPawnImg.src = "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg" //"./black-pawn.svg"
//         this.bPawnImg.onload = () => {
//             this.draw()
//         }

//         this.bRookImg = new Image()
//         this.bRookImg.src = "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg" //"./black-rook.svg"
//         this.bRookImg.onload = () => {
//             this.draw()
//         }
        
//         this.bHorseImg = new Image()
//         this.bHorseImg.src = "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg" //"./black-horse.svg"
//         this.bHorseImg.onload = () => {
//             this.draw()
//         }

//         this.bBishopImg = new Image()
//         this.bBishopImg.src = "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg" //"./black-bishop.svg"
//         this.bBishopImg.onload = () => {
//             this.draw()
//         }

//         this.bQueenImg = new Image()
//         this.bQueenImg.src = "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg" //"./black-queen.svg"
//         this.bQueenImg.onload = () => {
//             this.draw()
//         }

//         this.bKingImg = new Image()
//         this.bKingImg.src = "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg" //"./black-king.svg"
//         this.bKingImg.onload = () => {
//             this.draw()
//         }

//     }
//     draw(){
//         ctx.drawImage(this.bPawnImg, 20, 135, this.width, this.height)
//         ctx.drawImage(this.bPawnImg, 145, 135, this.width, this.height)
//         ctx.drawImage(this.bPawnImg, 265, 135, this.width, this.height)
//         ctx.drawImage(this.bPawnImg, 390, 135, this.width, this.height)
//         ctx.drawImage(this.bPawnImg, 515, 135, this.width, this.height)
//         ctx.drawImage(this.bPawnImg, 640, 135, this.width, this.height)
//         ctx.drawImage(this.bPawnImg, 765, 135, this.width, this.height)
//         ctx.drawImage(this.bPawnImg, 885, 135, this.width, this.height)

//         ctx.drawImage(this.bRookImg, 20, 20, this.width, this.height)
//         ctx.drawImage(this.bHorseImg, 145, 20, this.width, this.height)
//         ctx.drawImage(this.bBishopImg, 270, 20, this.width, this.height)
//         ctx.drawImage(this.bQueenImg, 395, 20, this.width, this.height)
//         ctx.drawImage(this.bKingImg, 520, 20, this.width, this.height)
//         ctx.drawImage(this.bBishopImg, 645, 20, this.width, this.height)
//         ctx.drawImage(this.bHorseImg, 770, 20, this.width, this.height)
//         ctx.drawImage(this.bRookImg, 895, 20, this.width, this.height)


        
//     }
// }