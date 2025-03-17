let tileSize = 128
let tilemapCount = 0
let playerSpeed = 6.5
let ease = 0.9
let bowActive = false
let spearActive = false
let swordActive = false
let arrowAngled = false
let spearAngled = false
let arrowExists = false
let spearExist = false
let swordExists = false
let shieldActive = true
let sUsed = false
let angle, adj, opp, hyp
let tempx, tempy
let arrowsUsed
let bRotate = false
let sRotate = false
let swRotate = false
let rotVal
let spawnLocations = [
    [[2401, -25], [3030, 1909], [-10, 1663]] 
    ]
let spawnVal = Math.floor(Math.random()*3)
let ammo = 0
let weaponCount = 5
let spearA = false
let spearB = false
let spearCount = 3
let spearDelay = 10
let durab = 0
let pFreeze = 60

function preload() {
    playerSheet = loadImage('kenney_scribble-dungeons/PNG/Double/Characters/green_character.png')
    handsSheet = loadImage('kenney_scribble-dungeons/PNG/Double/Characters/green_hands.png')

    arrowImg = loadImage('kenney_scribble-dungeons/PNG/Double/Items/weapon_arrow.png')
    bowImg = loadImage('kenney_scribble-dungeons/PNG/Double/Items/weapon_bow_arrow.png')
    spearImg = loadImage('kenney_scribble-dungeons/PNG/Double/Items/weapon_spear.png')
    shieldImg = loadImage('kenney_scribble-dungeons/PNG/Double/Items/shield_curved2.png')
    swordImg = loadImage('kenney_scribble-dungeons/PNG/Double/Items/weapon_longsword.png')
    purpImg = loadImage('kenney_scribble-dungeons/PNG/Double/Characters/purple_character.png')
    //purpImg = loadImage('maks.png')
    splatImg = loadImage('kenney_splat-pack/PNG/Double/splat19.png')

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
    tree.layer = 4
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
        "....tkwwwwwwwK.LFFFFFDPP.",
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

    cursor = new Sprite(5,5,5,'n')
    cursor.layer = 10
    cursor.x = mouse.x
    cursor.y = mouse.y

    playerBody = new Sprite(200,200,85)
    playerBody.image = playerSheet
    playerBody.layer = 4
    playerBody.scale = 0.8
    playerBody.drag = 10

    playerHands = new Sprite(200,200,65)
    playerHands.image = handsSheet
    playerHands.scale = 0.8
    playerHands.layer = 4
    new HingeJoint(playerBody, playerHands)

    bow = new Sprite(floor(Math.random()*3000),floor(Math.random()*3000), 20, 20)
    bow.image = bowImg
    bow.collider = 'n'
    bow.layer = 4
    bow.scale = 0.8

    spear = new Sprite(floor(Math.random()*3000),floor(Math.random()*3000), 20, 20)
    spear.image = spearImg
    spear.collider = 'n'
    spear.layer = 4
    spear.scale = 0.8

    //sword = new Sprite(floor(Math.random()*3000),floor(Math.random()*3000), 20, 20)
    sword = new Sprite(50,50,20,20)
    //sword.image = spearImg
    sword.collider = 'n'
    sword.layer = 4
    sword.scale = 0.8

    purple = new Group()

    purp = new purple.Sprite(spawnLocations[0][Math.floor(Math.random()*3)][0], spawnLocations[0][Math.floor(Math.random()*3)][1], 85)
    purp.image = purpImg
    purp.layer = 4
    purp.scale = 0.8
    purp.drag = 10
    purp.collider = 'd'

    purp1 = new purple.Sprite(spawnLocations[0][Math.floor(Math.random()*3)][0], spawnLocations[0][Math.floor(Math.random()*3)][1], 85)
    purp1.image = purpImg
    purp1.layer = 4
    purp1.scale = 0.8
    purp1.drag = 10
    purp1.collider = 'd'

    purp2 = new purple.Sprite(spawnLocations[0][Math.floor(Math.random()*3)][0], spawnLocations[0][Math.floor(Math.random()*3)][1], 85)
    purp2.image = purpImg
    purp2.layer = 4
    purp2.scale = 0.8
    purp2.drag = 10
    purp2.collider = 'd'

    createBorder()
    tileSetup()
    levelSetup()
    
}

function draw() {
    clear()
    mouseSprite()

    enemyMove()
    move()
    cameraMovement()

    spawnBow()
    spawnSpear()
    spawnSword()
    pickup()
    use()
}

function spawnBow() {
    if(bow.overlaps(blockable)) {
        bow.x = floor(Math.random()*3000)
        bow.y = floor(Math.random()*3000)
    }
    if(!bRotate) {
        rotVal = floor(Math.random()*360)
        bRotate = true
    }
    bow.rotateMinTo(rotVal,100)
}

function spawnSpear() {
    if(spear.overlaps(blockable)) {
        spear.x = floor(Math.random()*3000)
        spear.y = floor(Math.random()*3000)
    }
    if(!sRotate) {
        rotVal = floor(Math.random()*360)
        sRotate = true
    }
    spear.rotateMinTo(rotVal,100)
}

function spawnSword() {
    if(sword.overlaps(blockable)) {
        sword.x = floor(Math.random()*3000)
        sword.y = floor(Math.random()*3000)
    }
    if(!swRotate) {
        rotVal = floor(Math.random()*360)
        swRotate = true
    }
    sword.rotateMinTo(rotVal,100)
}

function mouseSprite() {
    cursor.x = mouse.x
    cursor.y = mouse.y
}

function pickup() {
    if(playerBody.overlaps(bow)) {
        bow.remove()
        bowActive = true
        spearActive = false
        if(swordActive) {
            shield.remove()
            swordSwing.remove()
            swordJoint.remove()
            swordActive = false
        }
        ammo += 5
    }
    if(playerBody.overlaps(spear)) {
        spear.remove()
        spearActive = true
        bowActive = false
        if(swordActive) {
            shield.remove()
            swordSwing.remove()
            swordJoint.remove()
            swordActive = false
        }
        ammo = 0
        spearA = true
        console.log("spear pickup")
    }
    if(sUsed) {
        if(playerBody.overlaps(spearUsed)) {
            spearUsed.remove()
            spearActive = true
            bowActive = false
            ammo = 0
            spearA = true
            console.log("spear pickup")
        }
    }
    if(playerBody.overlaps(sword)) {
        sword.remove()
        swordActive = true
        bowActive = false
        spearActive = false
        ammo = 0
        durab = 3
        console.log("sword pickup")
    }
}

function use() {
    if(bowActive) {
        if(mouse.presses() && !arrowExists && ammo != 0) {
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

            if(arrow.overlaps(blockable) || arrow.x < 0 || arrow.x > 3060 ||arrow.y < 0 || arrow.y > 3060) {
                tempx = arrow.x
                tempy = arrow.y

                arrowsUsed = new Sprite(tempx, tempy, 30, 10, 'n')
                arrowsUsed.rotateMinTo(angle, 100)
                arrowsUsed.image = arrowImg
                arrowsUsed.layer = 2

                arrow.remove()
                arrowExists = false
                arrowAngled = false
                ammo -= 1
            }

            for(p of purple) {
                if(arrow.overlaps(p)) {
                    splat = new Sprite(p.x, p.y, 128, 128)
                    splat.image = splatImg
                    splat.layer = 1
                    splat.collider = 'n'
                    splat.scale = 0.5
                    splat.rotateMinTo(floor(Math.random()*360), 1000)
                    p.remove()
                    arrow.remove()
                    arrowExists = false
                    arrowAngled = false
                    ammo -= 1
                }
            }
        }
    }
    if(ammo < 0) {
        bowActive = false
    }

    if(spearActive) {
        if(mouse.presses('right') && spearA) {
            spearThrow = new Sprite(playerHands.x, playerHands.y, 30, 10, 'n')
            spearThrow.image = spearImg
            spearThrow.layer = 2
            spearA = false
            spearThrow.rotateMinTo(mouse, 1000)
            spearExist = true
            console.log('created')
        }
        else if(spearExist) {
            console.log('moved')
            if(!spearAngled) {
                opp = playerBody.y - mouse.y
                if(playerBody.x > mouse.x) {
                    adj = mouse.x - playerBody.x
                    angle = -Math.atan(opp/adj) * (180/PI) + 180;
                }
                else if(mouse.x > playerBody.x){
                    adj = playerBody.x - mouse.x 
                    angle = Math.atan(opp/adj) * (180/PI)
                }
                spearAngled = true
                spearThrow.move(1000000, angle, 15)
            }

            if(spearThrow.overlaps(blockable) || spearThrow.x < 0 || spearThrow.x > 3060 ||spearThrow.y < 0 || spearThrow.y > 3060) {
                tempx = spearThrow.x
                tempy = spearThrow.y

                spearUsed = new Sprite(tempx, tempy, 30, 10, 'n')
                spearUsed.rotateMinTo(angle, 100)
                spearUsed.image = spearImg
                spearUsed.layer = 2
                sUsed = true

                spearThrow.remove()
                spearExist = false
                spearAngled = false
                spearCount = 3
            }

            for(p of purple) {
                if(spearThrow.overlaps(p)) {
                    tempx = spearThrow.x
                    tempy = spearThrow.y
                    
                    splat = new Sprite(p.x, p.y, 128, 128)
                    splat.image = splatImg
                    splat.layer = 1
                    splat.collider = 'n'
                    splat.scale = 0.5
                    splat.rotateMinTo(floor(Math.random()*360), 1000)
                    p.remove()
                    spearCount -= 1
                    if(spearCount == 0) {
                        spearThrow.remove()
                        spearExist = false
                        spearAngled = false

                        spearUsed = new Sprite(tempx, tempy, 30, 10, 'n')
                        spearUsed.rotateMinTo(angle, 100)
                        spearUsed.image = spearImg
                        spearUsed.layer = 2
                        sUsed = true
                    }
                }
            }
        }
        if(mouse.presses('left') && !spearB) {
            spearB = true
            spearMelee = new Sprite(playerHands.x, playerHands.y, 30, 10, 'n')
            spearMelee.image = spearImg
            spearMelee.layer = 2
            
            
            opp = playerBody.y - mouse.y
            if(playerBody.x > mouse.x) {
                adj = mouse.x - playerBody.x
                angle = -Math.atan(opp/adj) * (180/PI) + 180;
            }
            else if(mouse.x > playerBody.x){
                adj = playerBody.x - mouse.x 
                angle = Math.atan(opp/adj) * (180/PI)
            }
            spearMelee.rotateMinTo(angle, 1000)
        }

        if(spearB) {
            for(p of purple) {
                if(spearMelee.overlaps(p)) {
                    splat = new Sprite(p.x, p.y, 128, 128)
                    splat.image = splatImg
                    splat.layer = 1
                    splat.collider = 'n'
                    splat.scale = 0.5
                    splat.rotateMinTo(floor(Math.random()*360), 1000)
                    p.remove()
                }
            }
            if(spearDelay > 0) {
                spearMelee.move(10, angle, 30)
            }
            if(spearDelay == 0) {
                spearMelee.remove()
                spearDelay = 10
                spearB = false
            }
            spearDelay -= 1
        }
    }

    if(swordActive) {
        if(shieldActive) {
            shield = new Sprite(playerHands.x + 30, playerHands.y + 30, 70, 'n')
            shield.image = shieldImg
            opp = playerHands.y - mouse.y
            if(playerBody.x > mouse.x) {
                adj = mouse.x - playerBody.x
                angle = -Math.atan(opp/adj) * (180/PI) + 180;
            }
            else if(mouse.x > playerBody.x){
                adj = playerBody.x - mouse.x 
                angle = Math.atan(opp/adj) * (180/PI)
            }
            
            swordJoint = new GlueJoint(playerBody, shield)
            shieldActive = false
        }
        
        if(!swordExists && durab != 0) {
            swordSwing = new Sprite(playerBody.x + 70, playerBody.y - 30, 80, 20, 'n')
            swordSwing.image = swordImg
            swordSwing.layer = 2
            swordExists = true
            new GlueJoint(playerBody, swordSwing)
            console.log('created')
        }
        else if(swordExists) {
            console.log('moved')
            if(!cursor.overlapping(playerBody)) {
                swordSwing.rotateTowards(mouse, 0.15)
                shield.rotateTowards(mouse, 0.15)
            }
            
            for(p of purple) {
                if(swordSwing.overlaps(p)) {
                    splat = new Sprite(p.x, p.y, 128, 128)
                    splat.image = splatImg
                    splat.layer = 1
                    splat.collider = 'n'
                    splat.scale = 0.5
                    splat.rotateMinTo(floor(Math.random()*360), 1000)
                    p.remove()
                    durab -= 1
                }
            }
        }
    }
    if(durab <= 0 && swordExists) {
        swordActive = false
        shield.remove()
        swordSwing.remove()
        swordJoint.remove()
    }
}

function enemyMove() {
    for(p of purple) {
        p.rotateMinTo(playerBody, 10)

        if(!(p.collides(blockable))) {
            p.moveTowards(playerBody, 0.02)
        }
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
    border.layer = 6
}