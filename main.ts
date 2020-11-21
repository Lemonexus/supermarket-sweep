namespace SpriteKind {
    export const Grocery = SpriteKind.create()
    export const CartItem = SpriteKind.create()
}
function createSubtotalSprite () {
    subtotalSprite = textsprite.create("$0")
    subtotalSprite.left = 0
    subtotalSprite.top = 0
    subtotalSprite.setFlag(SpriteFlag.RelativeToCamera, true)
}
sprites.onOverlap(SpriteKind.Grocery, SpriteKind.Grocery, function(sprite: Sprite, otherSprite: Sprite) {
    tiles.placeOnRandomTile(sprite, myTiles.tile1)
})
scene.onOverlapTile(SpriteKind.Player, myTiles.tile10, function (sprite, location) {
	let display = "SUBTOTAL: $" + subtotal

    let cartItems = sprites.allOfKind(SpriteKind.CartItem)
    for (let c of cartItems){
        display += "\n" + sprites.readDataString(c, "name") + ": $" + sprites.readDataNumber(c, "cost")
    }
    game.showLongText(display, DialogLayout.Center)
    game.over(true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Grocery, function (p, g) {
    if (controller.A.isPressed()) {
        addToCart(g)
        pause(100)
    }
})
function addToCart (grocery: Sprite) {
    item = sprites.create(grocery.image, SpriteKind.CartItem)
    item.x = player.x
    item.y = player.y
    item.follow(player)
    //update item info
    sprites.setDataNumber(item, "cost", sprites.readDataNumber(grocery, "cost"))
    sprites.setDataString(item, "name", sprites.readDataString(grocery, "name"))
    // update subtotal
    subtotal += sprites.readDataNumber(grocery, "cost")
    subtotalSprite.setText("$" + subtotal)
    // update speed
    speed += 0 - sprites.readDataNumber(grocery, "weight")
    if (speed < 5) {
        speed = 5
    }
    controller.moveSprite(player, speed, speed)
}
function createProduct (productImg: Image, cost: number, weight: number, name: string) {
    p = sprites.create(productImg, SpriteKind.Grocery)
    sprites.setDataNumber(p, "cost", cost)
    sprites.setDataNumber(p, "weight", weight)
    sprites.setDataString(p, "name", name)
    tiles.placeOnRandomTile(p, myTiles.tile1)
}
function createAllProducts () {
    for (let i = 0; i <= groceryImages.length - 1; i++) {
        createProduct(groceryImages[i], groceryCosts[i], groceryWeights[i], groceryNames[i])
    }
}
let p: Sprite = null
let subtotal = 0
let item: Sprite = null
let subtotalSprite: TextSprite = null
let player: Sprite = null
let groceryCosts: number[] = []
let groceryWeights: number[] = []
let groceryNames: string[] = []
let groceryImages: Image[] = []
let speed = 0
let name = ""
let weight = 0
let cost = 0
let image2 = null
speed = 100
groceryImages = [
img`
    . . . 2 2 2 . . . . . . . . . . 
    . . . c c c 6 6 8 8 . . . . . . 
    . . 6 1 1 1 1 1 9 6 8 . . . . . 
    . 6 1 1 1 1 1 1 8 9 6 8 . . . . 
    6 1 1 1 1 1 1 8 . 8 9 8 . . . . 
    6 1 1 1 1 1 1 8 . 8 9 8 . . . . 
    8 9 1 1 1 1 1 8 . 8 9 8 . . . . 
    8 9 1 1 1 1 1 8 8 9 9 8 . . . . 
    8 9 9 9 9 9 9 9 9 9 9 8 . . . . 
    8 6 9 9 9 9 9 9 9 9 9 8 . . . . 
    . 8 6 9 9 9 9 9 9 9 6 8 . . . . 
    . . 8 8 8 8 8 8 8 8 8 . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . 8 8 8 . . . . . . . . . . 
    . . . f f f f f f f . . . . . . 
    . . f e e e e e e f f . . . . . 
    . f e e e e e e f e f f . . . . 
    f e e e e e e f . f e f . . . . 
    f e e e e e e f . f e f . . . . 
    f e e e e e e f . f e f . . . . 
    f e e e e e e f f e e f . . . . 
    f e e e e e e e e e e f . . . . 
    f f e e e e e e e e e f . . . . 
    . f f e e e e e e e e f . . . . 
    . . f f f f f f f f f . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . . . . 6 6 6 . . . . . . 
    . . . . . . . c b c . . . . . . 
    . . . . . c c c b c c c . . . . 
    . . . . c b b b b b b b c . . . 
    . . . . c 1 b b b b b 1 c . . . 
    . . . . c 1 1 7 1 7 1 1 c . . . 
    . . . . c 1 1 1 7 1 1 1 c . . . 
    . . . . c 1 1 a c a 1 1 c . . . 
    . . . . c 1 a c a c a 1 c . . . 
    . . . . c 1 c a c a c 1 c . . . 
    . . . . c 1 a c a c a 1 c . . . 
    . . . . c 1 c a c a 1 1 c . . . 
    . . . . c 1 a c a 1 1 1 c . . . 
    . . . . c b 1 a 1 1 1 b c . . . 
    . . . . c b b b b b b b c . . . 
    . . . . . c c c c c c c . . . . 
    `,
img`
    . c c c c c c c c c c c c c . . 
    c b b b b b b b b b b b b b c . 
    c b b b b b b b b b b b b b c . 
    c c c c c c c c c c c c c c c . 
    c d d 1 1 1 1 1 1 1 1 1 d d c . 
    c d c c c 1 c c c 1 c c c d c . 
    c d c 1 c 1 c 1 c 1 1 c d d c . 
    c d c 1 c 1 c c c 1 1 c d d c . 
    c d c c c 1 c 1 c 1 1 c d d c . 
    c d d 1 1 1 1 1 1 1 1 1 d d c . 
    c d d 1 1 1 2 2 2 1 1 1 d d c . 
    c d d 1 1 2 8 8 8 2 1 1 d d c . 
    c d d 1 1 2 8 d 8 2 1 1 d d c . 
    c d d 1 1 2 8 6 8 2 1 1 d d c . 
    . c d 1 1 1 2 2 2 1 1 1 d c . . 
    . . c c c c c c c c c c c . . . 
    `,
img`
    . . . c c c c . . . . . . . . . 
    . . c e e e e c c c . . . . . . 
    . c e e e e e e e e c . . . . . 
    . c e e e e e e e e e c . . . . 
    f e e e e c c c e e e c . b b . 
    f e e e c e e e c c c c c d d b 
    f c e e f e e e e e e e c d d b 
    f c c c f e e e f f f f c b b b 
    f c c c c f f f c c c f . c c . 
    . f c c c c c c c c c f . . . . 
    . f c c c c c c c c f . . . . . 
    . . f f f f f f f f . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . f f f f f f . . . . . 
    . . . . f e e e e e e f . . . . 
    . . . f e e e e e e e e f . . . 
    . . . f e e f f f f f e f . . . 
    . . . f e f d d d d d e e f . . 
    . . f e e f d f d f d e e f . . 
    . . f e e f d e d e d e e f . . 
    . . f e e f d d d d f e e f . . 
    . f e e f 1 f f f f 1 f e e f . 
    . . f f 1 1 1 1 1 1 1 1 f f . . 
    . . . f c 9 2 1 1 1 1 1 1 f . . 
    . . . f 1 1 1 1 1 1 1 f f . . . 
    . . . f f 1 1 1 1 1 1 1 f . . . 
    . . . . f f f f f f f f f . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . c c c c c c c . . . . . 
    . . . c d d d d d d d c . . . . 
    . . c d d d d d b b d d c . . . 
    . . b c d d d d d d d c b . . . 
    . . b 2 c c c c c c c 2 b . . . 
    . . b 2 2 2 2 2 2 2 2 2 b . . . 
    . . b 2 2 2 2 2 2 2 2 2 b . . . 
    . . b 2 2 2 b b b 2 2 2 b . . . 
    . . b 2 2 b 2 2 2 b 2 2 b . . . 
    . . d 1 2 b 2 2 2 b 2 1 d . . . 
    . . d 1 1 b 2 2 2 b 1 1 d . . . 
    . . d 1 1 b 2 2 2 b 1 1 d . . . 
    . . d 1 1 1 b b b 1 1 1 d . . . 
    . . . d 1 1 1 1 1 1 1 d . . . . 
    . . . . d d d d d d d . . . . . 
    `,
img`
    . . c c c c c c c c c c . . . . 
    . c d d d d d d d c b b c . . . 
    c d d d d d d d c b d b b c . . 
    c c d d d d d d d c b b c c . . 
    c b c c c c c c c c c c b c . . 
    c b 8 9 8 b 8 9 9 9 8 b b c . . 
    c b b 8 9 6 9 6 9 6 9 8 b c . . 
    c b b 8 9 6 9 6 9 6 9 8 b c . . 
    c b 8 9 8 b 8 9 9 9 8 b b c . . 
    . c c c c c c c c c c c c . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . b 1 1 1 1 1 1 1 1 1 . . . 
    . . b 1 1 1 1 1 1 1 1 1 1 1 . . 
    . . b 1 1 1 1 1 1 1 1 1 8 8 . . 
    . . b 1 1 1 1 1 1 1 8 8 8 8 . . 
    . . b 1 1 1 5 5 5 5 8 8 8 8 . . 
    . . b 1 1 5 5 5 5 5 5 8 8 8 . . 
    . . b 1 8 5 5 5 5 5 5 8 8 8 . . 
    . . c 8 8 5 5 5 5 5 5 8 1 1 . . 
    . . c 8 8 5 5 5 5 5 5 1 1 1 . . 
    . . c 8 8 8 5 5 5 5 1 1 1 1 . . 
    . . c 8 8 8 1 1 1 1 1 1 1 1 . . 
    . . c 2 2 2 1 1 1 1 6 6 6 1 . . 
    . . b 1 2 1 1 1 1 1 1 1 1 1 . . 
    . . b 1 1 1 1 1 1 1 1 1 1 1 . . 
    . . . b b b b b b b b b b . . . 
    `,
img`
    . . . . . . . 6 . . . . . . . . 
    . . . . 6 6 6 6 6 6 6 . . . . . 
    . . 6 6 6 6 7 6 7 6 6 6 6 . . . 
    . 6 6 7 6 6 7 6 7 6 6 7 7 6 . . 
    . 6 6 7 6 7 6 6 7 6 6 7 6 6 . . 
    6 7 6 7 6 7 6 6 7 7 6 7 6 7 6 . 
    6 7 6 7 6 7 6 6 7 7 6 7 6 7 6 . 
    6 7 6 7 6 7 6 6 7 7 6 7 6 7 6 . 
    6 7 6 7 6 7 6 6 7 7 6 7 6 7 6 . 
    6 7 6 7 6 7 6 6 7 7 6 7 6 7 6 . 
    6 7 6 7 6 7 6 6 7 6 6 7 6 7 6 . 
    6 6 6 7 6 7 6 6 7 6 6 7 6 6 6 . 
    . 6 6 7 6 7 6 6 7 6 6 7 6 6 . . 
    . 6 6 7 6 7 7 6 7 6 6 7 6 6 . . 
    . . 6 6 6 6 7 6 7 6 6 6 6 . . . 
    . . . . 6 6 6 6 6 6 6 . . . . . 
    `
]
groceryNames = [
"Milk",
"Chocolate Milk",
"Grape Soda",
"Oatmeal",
"Turkey",
"Ashley",
"Chicken soup",
"Sardines",
"Flour",
"Watermelon"
]
groceryWeights = [
8,
8,
2,
1,
12,
13,
0.5,
0.5,
5,
10
]
groceryCosts = [
2,
3,
3,
4,
20,
50,
2,
1,
5,
3
]
scene.setBackgroundColor(9)
tiles.setTilemap(tilemap`level`)
player = sprites.create(img`
    eeeeeee......................
    eeeeedd......................
    eeeeddc......................
    eeedddf......................
    eeedddd......................
    eee11........................
    ee11dddbbbbbbbbbbbb..........
    ee821....b..b..b..b..........
    e1111....bbbbbbbbbb..........
    .1111....b..b..b..b..........
    .1111....bbbbbbbbbb..........
    .6666.....b.b..b.bb..........
    .6.66......bbbbbbb...........
    .d.d.......d.................
    .d..d......ddddddd...........
    .d..dd......c....c...........
    `, SpriteKind.Player)
controller.moveSprite(player, speed, speed)
scene.cameraFollowSprite(player)
tiles.placeOnTile(player, tiles.getTileLocation(1, 3))
createAllProducts()
createSubtotalSprite()
info.startCountdown(30)
