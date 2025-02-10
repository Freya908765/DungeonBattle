let tileSize = 128
let tilemapCount = 0
let playerSpeed = 6.5
let ease = 0.9
let bowActive = false
let arrowAngled = false
let arrowExists = false
let angle, adj, opp, hyp
let tempx, tempy
let arrowsUsed
let bRotate = false
let rotVal

function preload() {
    cursorImg = loadImage('kenney_cursor-pack/PNG/Outline/Default/cursor_none.png')
    playerSheet = loadImage('kenney_scribble-dungeons/PNG/Double/Characters/green_character.png')
    handsSheet = loadImage('kenney_scribble-dungeons/PNG/Double/Characters/green_hands.png')

    arrowImg = loadImage('kenney_scribble-dungeons/PNG/Double/Items/weapon_arrow.png')
    bowImg = loadImage('kenney_scribble-dungeons/PNG/Double/Items/weapon_bow_arrow.png')
    purpImg = loadImage('kenney_scribble-dungeons/PNG/Double/Characters/purple_character.png')
    splatImg = loadImage('kenney_splat-pack/PNG/Default/splat19.png')

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
    wallTLImg = loadImage('kenney_scribble-dungeons/PNG/Double/wall_corner_tl.png')
    wallTRImg = loadImage('kenney_scribble-dungeons/PNG/Double/wall_corner_tr.png')
    wallBLImg = loadImage('kenney_scribble-dungeons/PNG/Double/wall_corner_bl.png')
    wallBRImg = loadImage('kenney_scribble-dungeons/PNG/Double/wall_corner_br.png')
}

function tileSetup() {
    blockable = new Group()

    grass = new Group();
    grass.collider = 'n';
    grass.image = grassImg;
    grass.tile = 'g';
    grass.w = tileSize;
    grass.h = tileSize;
    grass.layer = 1

    wallT = new blockable.Group();
    wallT.collider = 's';
    wallT.image = wallTImg;
    wallT.tile = 'W';
    wallT.w = tileSize;
    wallT.h = tileSize/4;
    wallT.layer = 3

    wallB = new blockable.Group();
    wallB.collider = 's';
    wallB.image = wallBImg;
    wallB.tile = 'w';
    wallB.w = tileSize;
    wallB.h = tileSize/4;
    wallB.layer = 3

    wallR = new blockable.Group();
    wallR.collider = 's';
    wallR.image = wallRImg;
    wallR.tile = 'R';
    wallR.w = tileSize/4;
    wallR.h = tileSize;
    wallR.layer = 3

    wallL = new blockable.Group();
    wallL.collider = 's';
    wallL.image = wallLImg;
    wallL.tile = 'L';
    wallL.w = tileSize/4;
    wallL.h = tileSize;
    wallL.layer = 3

    wallTL = new blockable.Group();
    wallTL.collider = 's';
    wallTL.image = wallTLImg;
    wallTL.tile = 'l';
    wallTL.w = tileSize/3;
    wallTL.h = tileSize/3;
    wallTL.layer = 3

    wallTR = new blockable.Group();
    wallTR.collider = 's';
    wallTR.image = wallTRImg;
    wallTR.tile = 'r';
    wallTR.w = tileSize/3;
    wallTR.h = tileSize/3;
    wallTR.layer = 3

    wallBL = new blockable.Group();
    wallBL.collider = 's';
    wallBL.image = wallBLImg;
    wallBL.tile = 'k';
    wallBL.w = tileSize/3;
    wallBL.h = tileSize/3;
    wallBL.layer = 3

    wallBR = new blockable.Group();
    wallBR.collider = 's';
    wallBR.image = wallBRImg;
    wallBR.tile = 'K';
    wallBR.w = tileSize/3;
    wallBR.h = tileSize/3;
    wallBR.layer = 3

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

    tree = new blockable.Group();
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
        ".................t.T.....",
        "...lWWWWWr..t......T.t...",
        "...LFFFFFkWWWWr....T.....",
        "..tLFFFFFFFFFFR....T.....",
        "...LFFFFFFFFFFR....T.....",
        "...LFFFFFFFFFFR....T.....",
        "...LFFFFFlwDwwK....T....t",
        "t..LFFFFFR.P.......Tt....",
        "...LFFFFFR.PPPPPPP.T.....",
        "...LFFFFFR.P...t.P.TTTTTT",
        "...LFFFFFR.P.....P...t...",
        "...kwwDwwK.Pt....P.......",
        ".t....P....P.....P.......",
        "PPPPPPPPPPPP.....P.....t.",
        "....t..P.t.......P.t.....",
        "t......P......t..PPPPPPPP",
        ".....lWDWWWWWr.........Pt",
        "....tLFFFFFFFR.lWWWWWr.P.",
        ".....LFFFFFFFkWKFFFFFR.P.",
        ".t...LFFFFFFFDFDFFFFFRtP.",
        ".....LFFFFFFFlWrFFFFFR.P.",
        "....tkwwwwwwwK.WFFFFFDPP.",
        ".............t.LFFFFFR...",
        ".t.............kwwwwwK...",
        "......t................t.",
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
    playerBody.layer = 3
    playerBody.scale = 0.8
    playerBody.drag = 10

    playerHands = new Sprite(200,200,65)
    playerHands.image = handsSheet
    playerHands.scale = 0.8
    new HingeJoint(playerBody, playerHands)

    bow = new Sprite(floor(Math.random()*3000),floor(Math.random()*3000), 20, 20)
    bow.image = bowImg
    bow.color = '#000'
    bow.collider = 'n'
    bow.layer = 2

    purp = new Sprite(floor(Math.random()*3000), floor(Math.random()*3000), 150)
    purp.image = purpImg
    purp.layer = 3
    purp.scale = 0.8
    purp.drag = 10
    purp.collider = 'd'

    createBorder()
    tileSetup()
    levelSetup()
    
}

function draw() {
    clear()

    move()
    cameraMovement()
    spawnBow()
    pickup()
    use()
}

function spawnBow() {
    if(bow.collides(blockable)) {
        bow.x = floor(Math.random()*3000)
        bow.y = floor(Math.random()*3000)
    }
    if(!bRotate) {
        rotVal = floor(Math.random()*360)
        console.log("k")
        bRotate = true
    }
    bow.rotateMinTo(rotVal,100)
}

function use() {
    if(bowActive) {
        if(mouse.presses() && !arrowExists) {
            arrow = new Sprite(playerHands.x, playerHands.y, 30, 10, 'n')
            arrow.image = arrowImg
            arrow.layer = 2
            arrowExists = true
            arrow.rotateMinTo(mouse, 1000)
            console.log('created')
        }

        else if(arrowExists) {
            console.log('moved')
            if(!arrowAngled) {
                opp = playerBody.y - mouse.y
                if(playerBody.x > mouse.x) {
                    adj = mouse.x - playerBody.x
                    angle = -Math.atan(opp/adj) * (180/PI) + 180;
                }
                else if(mouse.x > playerBody.x){
                    adj = playerBody.x - mouse.x 
                    angle = Math.atan(opp/adj) * (180/PI)
                }
                arrowAngled = true
                arrow.move(1000000, angle, 15)
            }

            if(arrow.overlaps(blockable) || arrow.x < 0 || arrow.x > 3200 ||arrow.y < 0 || arrow.y > 3200) {
                tempx = arrow.x
                tempy = arrow.y

                arrowsUsed = new Sprite(tempx, tempy, 30, 10, 'n')
                arrowsUsed.rotateMinTo(angle, 100)
                arrowsUsed.image = arrowImg
                arrowsUsed.layer = 2

                arrow.remove()
                arrowExists = false
                arrowAngled = false
            }

            if(arrow.overlaps(purp)) {
                splat = new Sprite(purp.x, purp.y, 128, 128)
                splat.image = splatImg
                splat.layer = 2
                splat.collider = 'n'
                purp.remove()
            }
        }
    }
}

function pickup() {
    if(playerBody.overlaps(bow)) {
        bow.remove()
        bowActive = true
    }
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