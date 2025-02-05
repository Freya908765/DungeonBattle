let tileSize = 128
let tilemapCount = 0
let playerSpeed = 6.5
let ease = 0.9

function preload() {
    cursorImg = loadImage('kenney_cursor-pack/PNG/Outline/Default/cursor_none.png')
    playerSheet = loadImage('kenney_scribble-dungeons/PNG/Double/Characters/green_character.png')
    handsSheet = loadImage('kenney_scribble-dungeons/PNG/Double/Characters/green_hands.png')
    grassImg = loadImage('kenney_scribble-dungeons/PNG/Double/grass.png')
    woodFloorImg = loadImage('kenney_scribble-dungeons/PNG/Double/wood.png')
    stoneFloorImg = loadImage('kenney_scribble-dungeons/PNG/Double/tiles.png')
    pathImg = loadImage('kenney_scribble-dungeons/PNG/Double/floor_path_crossing.png')
    trackImg = loadImage('kenney_scribble-dungeons/PNG/Double/track.png')
    treeImg = loadImage('kenney_scribble-dungeons/PNG/Double/tree.png')
    doorImg = loadImage('kenney_scribble-dungeons/PNG/Double/floor_doorway.png')

    wallTImg = loadImage('kenney_scribble-dungeons/PNG/Double/wall_middle_t.png')
    wallRImg = loadImage('kenney_scribble-dungeons/PNG/Double/wall_middle_long_r.png')
    wallBImg = loadImage('kenney_scribble-dungeons/PNG/Double/wall_middle_b.png')
    wallLImg = loadImage('kenney_scribble-dungeons/PNG/Double/wall_middle_long_l.png')
}

function tileSetup() {
    grass = new Group();
    grass.collider = 'n';
    grass.image = grassImg;
    grass.tile = 'g';
    grass.w = tileSize;
    grass.h = tileSize;
    grass.layer = 1

    wallT = new Group();
    wallT.collider = 's';
    wallT.image = wallTImg;
    wallT.tile = 'W';
    wallT.w = tileSize;
    wallT.h = tileSize/4;
    wallT.layer = 1

    wallB = new Group();
    wallB.collider = 's';
    wallB.image = wallBImg;
    wallB.tile = 'w';
    wallB.w = tileSize;
    wallB.h = tileSize/4;
    wallB.layer = 1

    wallR = new Group();
    wallR.collider = 's';
    wallR.image = wallRImg;
    wallR.tile = 'R';
    wallR.w = tileSize/4;
    wallR.h = tileSize;
    wallR.layer = 1

    wallL = new Group();
    wallL.collider = 's';
    wallL.image = wallLImg;
    wallL.tile = 'L';
    wallL.w = tileSize/4;
    wallL.h = tileSize;
    wallL.layer = 1

    sFloor = new Group();
    sFloor.collider = 'n';
    sFloor.image = stoneFloorImg;
    sFloor.tile = 'F';
    sFloor.w = tileSize;
    sFloor.h = tileSize;
    sFloor.layer = 1

    door = new Group();
    door.collider = 'n';
    door.image = doorImg;
    door.tile = 'D';
    door.w = tileSize;
    door.h = tileSize;
    door.layer = 1

    path = new Group();
    path.collider = 'n';
    path.image = pathImg;
    path.tile = 'P';
    path.w = tileSize;
    path.h = tileSize;
    path.layer = 1

    track = new Group();
    track.collider = 'n';
    track.image = trackImg;
    track.tile = 'T';
    track.w = tileSize;
    track.h = tileSize;
    track.layer = 1

    tree = new Group();
    tree.collider = 's';
    tree.image = treeImg;
    tree.tile = 't';
    tree.w = tileSize/3;
    tree.h = tileSize/3;
    tree.layer = 3
}

function levelSetup() {
    underlay = [
        "ggggggggggggggggggggggggg",
        "ggggggggggggggggggggggggg",
        "ggggggggggggggggggggggggg",
        "ggggggggggggggggggggggggg",
        "ggggggggggggggggggggggggg",
        "ggggggggggggggggggggggggg",
        "ggggggggggggggggggggggggg",
        "ggggggggggggggggggggggggg",
        "ggggggggggggggggggggggggg",
        "ggggggggggggggggggggggggg",
        "ggggggggggggggggggggggggg",
        "ggggggggggggggggggggggggg",
        "ggggggggggggggggggggggggg",
        "ggggggggggggggggggggggggg",
        "ggggggggggggggggggggggggg",
        "ggggggggggggggggggggggggg",
        "ggggggggggggggggggggggggg",
        "ggggggggggggggggggggggggg",
        "ggggggggggggggggggggggggg",
        "ggggggggggggggggggggggggg",
        "ggggggggggggggggggggggggg",
        "ggggggggggggggggggggggggg",
        "ggggggggggggggggggggggggg",
        "ggggggggggggggggggggggggg",
        "ggggggggggggggggggggggggg",
        ]
    tilemaps = [
        [
        "gggggggggggggggggtgTggggg",
        "gggWWWWWWWggtggggggTgtggg",
        "gggLFFFFFWWWWWWggggTggggg",
        "ggtLFFFFFFFFFFRggggTggggg",
        "gggLFFFFFFFFFFRggggTggggg",
        "gggLFFFFFFFFFFRggggTggggg",
        "gggLFFFFFWwDwwWggggTggggt",
        "tggLFFFFFRgPgggggggTtgggg",
        "gggLFFFFFRgPPPPPPPgTggggg",
        "gggLFFFFFRgPgggtgPgTTTTTT",
        "gggLFFFFFRgPgggggPgggtggg",
        "gggWwwDwwWgPtggggPggggggg",
        "gtggggPggggPgggggPggggggg",
        "PPPPPPPPPPPPgggggPgggggtg",
        "ggggtggPgtgggggggPgtggggg",
        "tggggggPggggggtggPPPPPPPP",
        "gggggWWDWWWWWWgggggggggPt",
        "ggggtLFFFFFFFRgWWWWWWWgPg",
        "gggggLFFFFFFFWWWFFFFFRgPg",
        "gtgggLFFFFFFFDFDFFFFFRtPg",
        "gggggLFFFFFFFRWWFFFFFRgPg",
        "ggggtWwwwwwwwWgWFFFFFDPPg",
        "gggggggggggggtgLFFFFFRggg",
        "gtgggggggggggggWwwwwwWggg",
        "ggggggtggggggggggggggggtg",
        ]
    ]
    underlayTiles = new Tiles (underlay,
        64,
        64,
        tileSize - 5,
        tileSize - 5
        );
        
    levelTiles = new Tiles (tilemaps[tilemapCount],
        64,
        64,
        tileSize - 5,
        tileSize - 5
        );
}

function setup() {
    createCanvas(1400, 900)
    displayMode('centered')
    background(0)
    
    cursor('kenney_cursor-pack/PNG/Outline/Default/cursor_none.png')

    playerBody = new Sprite(200,200,85)
    playerBody.image = playerSheet
    playerBody.scale = 1
    playerBody.layer = 2
    playerBody.scale = 0.8
    playerBody.drag = 10

    playerHands = new Sprite(200,200,65)
    playerHands.image = handsSheet
    playerHands.scale = 0.8
    new HingeJoint(playerBody, playerHands)

    createBorder()

    tileSetup()
    levelSetup()
    
}

function draw() {
    clear()

    

    move()
    cameraMovement()
}

function move() {
    playerHands.rotateTowards(mouse, 0.15)

    if(playerBody.y > 45 && playerBody.y < 3036) {
        if(playerBody.y > 50){
            if(kb.pressing('w')) {
                if(playerBody.vel.y < playerSpeed) {
                    playerBody.vel.y -= 1 * ease
                    playerBody.rotateMinTo(90, 4)
                }
            }
        }
        if(playerBody.y < 3031) {
            if(kb.pressing('s')) {
                if(playerBody.vel.y < playerSpeed) {
                    playerBody.vel.y += 1 * ease
                    playerBody.rotateMinTo(270, 4)
                }
            }
        }
    }
    else {
        if(playerBody.y < 45) {
            playerBody.vel.y = 1
        }
        if(playerBody.y >3036) {
            playerBody.vel.y = -1
        }
    }

    if(playerBody.x > 45 && playerBody.x < 3036) {
        if(playerBody.x > 50) {
            if(kb.pressing('a')) {
                if(playerBody.vel.y < playerSpeed) {
                    playerBody.vel.x -= 1 * ease
                    playerBody.rotateMinTo(0, 4)
                }
            }
        }
        if(playerBody.x < 3031) {
          if(kb.pressing('d')) {
                if(playerBody.vel.y < playerSpeed) {
                    playerBody.vel.x += 1 * ease
                    playerBody.rotateMinTo(180, 4)
                }
            }  
        }
    }
    else {
        if(playerBody.x < 45) {
            playerBody.vel.x = 1
        }
        if(playerBody.x >3036) {
            playerBody.vel.x = -1
        }
    }

    if(kb.pressing('w') && kb.pressing('d')) {
        playerBody.rotateMinTo(135, 4)
    }
    else if(kb.pressing('w') && kb.pressing('a')) {
        playerBody.rotateMinTo(45, 4)
    }
    else if(kb.pressing('s') && kb.pressing('a')) {
        playerBody.rotateMinTo(315, 4)
    }
    else if(kb.pressing('s') && kb.pressing('d')) {
        playerBody.rotateMinTo(225, 4)
    }
}

function cameraMovement() {
    if(playerBody.x < 700) {
        camera.x = 700
        leftBorder.x = camera.x - width/2 + 5
        rightBorder.x = camera.x + width/2 - 5
    }
    else if(playerBody.x > 2380) {
        camera.x = 2380
        leftBorder.x = camera.x - width/2 + 5
        rightBorder.x = camera.x + width/2 - 5
    }
    else {
        camera.x = playerBody.x
        leftBorder.x = playerBody.x - width/2 + 5
        rightBorder.x = playerBody.x + width/2 - 5
    }

    if(playerBody.y < 450) {
        camera.y = 450
        topBorder.y = camera.y - height/2 + 5
        bottomBorder.y = camera.y + height/2 - 5
    }
    else if(playerBody.y > 2630) {
        camera.y = 2630
        topBorder.y = camera.y - height/2 + 5
        bottomBorder.y = camera.y + height/2 - 5
    }
    else {
        camera.y = playerBody.y
        topBorder.y = playerBody.y - height/2 + 5
        bottomBorder.y = playerBody.y + height/2 - 5
    } 
}

function createBorder() {
    border = new Group()
    leftBorder = new border.Sprite(5,0,10,6400)

    rightBorder = new border.Sprite(3076,0,10,6400)

    topBorder = new border.Sprite(0,5,6400,10)

    bottomBorder = new border.Sprite(0,3076,6400,10)

    border.collider = 'n'
    border.color = '#000'
    border.stroke = '#000'
}