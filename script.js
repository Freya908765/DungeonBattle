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
let shieldActive = false
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
let pHealth = 100
let healthAdjust = 0
let spearSpawn = true
let swordSpawn = true
let bowSpawn = true
let state = 0
let tempStateM = 0
let tempStateG = 0
let tempStateI = 0
let tempStateS = 0
let tempStateD = 0
let score = 0
let msg = ' '
let msgSet = false
let levelChoice = 0
let scoreMsg = ''

function preload() {
    font = loadFont('PIXEL.otf')
    playerSheet = loadImage('kenney_scribble-dungeons/PNG/Double/Characters/green_character.png')
    handsSheet = loadImage('kenney_scribble-dungeons/PNG/Double/Characters/green_hands.png')
    backgroundImg = loadImage('GAME3.png')
    selectImg = loadImage('SELECT.png')
    deadImg = loadImage('DEAD.png')

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

    level1Img = loadImage('level1.png')
    level2Img = loadImage('level2.png')
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
            "gggggggggggggggggggggggggggggggggggggggg",
            "gggggggggggggggggggggggggggggggggggggggg",
            "gggggggggggggggggggggggggggggggggggggggg",
            "gggggggggggggggggggggggggggggggggggggggg",
            "gggggggggggggggggggggggggggggggggggggggg",
            "gggggggggggggggggggggggggggggggggggggggg",
            "gggggggggggggggggggggggggggggggggggggggg",
            "gggggggggggggggggggggggggggggggggggggggg",
            "gggggggggggggggggggggggggggggggggggggggg",
            "gggggggggggggggggggggggggggggggggggggggg",
            "gggggggggggggggggggggggggggggggggggggggg",
            "gggggggggggggggggggggggggggggggggggggggg",
            "gggggggggggggggggggggggggggggggggggggggg",
            "gggggggggggggggggggggggggggggggggggggggg",
            "gggggggggggggggggggggggggggggggggggggggg",
            "gggggggggggggggggggggggggggggggggggggggg",
            "gggggggggggggggggggggggggggggggggggggggg",
            "gggggggggggggggggggggggggggggggggggggggg",
            "gggggggggggggggggggggggggggggggggggggggg",
            "gggggggggggggggggggggggggggggggggggggggg",
            "gggggggggggggggggggggggggggggggggggggggg",
            "gggggggggggggggggggggggggggggggggggggggg",
            "gggggggggggggggggggggggggggggggggggggggg",
            "gggggggggggggggggggggggggggggggggggggggg",
            "gggggggggggggggggggggggggggggggggggggggg",
            "gggggggggggggggggggggggggggggggggggggggg",
            "gggggggggggggggggggggggggggggggggggggggg",
            "gggggggggggggggggggggggggggggggggggggggg",
            "gggggggggggggggggggggggggggggggggggggggg",
            "gggggggggggggggggggggggggggggggggggggggg",
            "gggggggggggggggggggggggggggggggggggggggg",
            "gggggggggggggggggggggggggggggggggggggggg",
            "gggggggggggggggggggggggggggggggggggggggg",
            "gggggggggggggggggggggggggggggggggggggggg",
            "gggggggggggggggggggggggggggggggggggggggg",
            "gggggggggggggggggggggggggggggggggggggggg",
            "gggggggggggggggggggggggggggggggggggggggg",
            "gggggggggggggggggggggggggggggggggggggggg",
            "gggggggggggggggggggggggggggggggggggggggg",
            "gggggggggggggggggggggggggggggggggggggggg",
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
        ],
        [
            "........t............................t..",
            "....t...............t..........t........",
            "...lWWWWWWWWWr........lWWWWWWWWWWr......",
            "t..LFFFFFFFFFR........LFFFFFFFFFFR......",
            "...LFFFFFFFFFR........LFFFFFFFFFFR......",
            "...LFFFFFFFFFR.t......LFFFFFFFFFFR......",
            "...LFFFFFFFFFR........LFFFFFFFFFFR.t....",
            "...LFFFFFlLDLK....t...LFFFFFlwwwwK......",
            "..tLFFFFFR.P..........LFFFFFR...........",
            "...LFFFFFR.P..........kwwDwwK..........t",
            "...LFFFFFR.P.............P.....t........",
            "...LFFFFFR.P.............P.......PPPPPPP",
            "...kwwwwwK.PPPPPPPPPPPPPPPPPPPPPPP......",
            "...........P...............t.P..........",
            "...........P..........t......P........t.",
            "PPPPPPPPPPPP...t.............P..lWWWWr..",
            "........P....................P..LFFFFR..",
            "...t....P.lWWWWWr....t.....t.P..LFFFFR..",
            "........P.LFFFFFR............P..LFFFFR..",
            "........P.LFFFFFRt...........P..LFFFFR..",
            "......t.P.LFFFFFR............PPPDFFFFR..",
            "t.......P.LFFFFFR............P..LFFFFR..",
            "........P.LFFFFFR.t.....t....P..kwwwwK..",
            "........P.kwwDwwK............P......t...",
            "........P..............PPPPPPPPPPPPPPPPP",
            "........PPPPPPPPPPPPPPPP...........P....",
            "...............P..t.........lWWWr..P....",
            ".............t.P..........t.LFFFR..P....",
            "..t....t.......P....t.......LFFFR..P....",
            ".....TTTTTTTTTTTTTTTTTTTTTT.LFFFR..P..t.",
            ".....T.........P..........T.LFFFR..P....",
            "....tT...t.....P.......t..T.LFFFkWWDWr..",
            ".....T.....lWWWDWWWWWWWr..T.LFFFFFFFFR..",
            "TTTTTT.....LFFFFFFFFFFFR..T.LFFFFFFFFR..",
            "...........LFFFFFFFFFFFR..T.LFFFFFFFFR..",
            ".lWWWDWr...LFFFFFFFFFFFR..T.LFFFFFFFFR..",
            ".LFFFFFR.t.LFFFFFFFFFFFRt.T.kwwwwwwwwK..",
            ".LFFFFFR...LFFFFFFFFFFFR..T.............",
            ".kwwwwwK...kwwwwwwwwwwwK..T.............",
            "................t.........T......t......",  
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
    cursor('kenney_cursor-pack/PNG/Outline/Default/cursor_none.png')
}

function gameSetup() {
    createCanvas(1400, 900)
    displayMode('centered')
    background(0)
    textSize(30)
    textFont('Arial')

    cursorS = new Sprite(5,5,5,'n')
    cursorS.layer = 10
    cursorS.x = mouse.x
    cursorS.y = mouse.y

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

    healthBar = new Sprite(playerBody.x,playerBody.y, 500,30, 'n')
    healthBar.color = 'red'
    healthBar.layer = 10

    healthContainer = new Sprite(playerBody.x,playerBody.y, 510,40, 'n')
    healthContainer.color = 'black'
    healthContainer.layer = '9'

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

    scoreSprite = new Sprite(0,0,100,20, 'n')
    scoreSprite.color = 'transparent'
    scoreSprite.text = "Score: " + score.toString()

    ammoSprite = new Sprite(400,400,100,20, 'n')
    ammoSprite.color = 'transparent'
    ammoSprite.text = msg

    createBorder()
    tileSetup()
    levelSetup()
    
}

function menuSetup() {
    createCanvas(1400, 900)
    displayMode('centered')
    background(backgroundImg)
    textSize(128);

    selectButton = createButton('Level Select');
    selectButton.class("button");
    selectButton.position(760, 350);
    selectButton.mousePressed(loadSelect);

    instructButton = createButton('Instructions');
    instructButton.class("button");
    instructButton.position(755, 440);
    instructButton.mousePressed(loadInstruct);
    
    exitButton = createButton('Exit');
    exitButton.class("button");
    exitButton.position(875, 530);
    exitButton.mousePressed(exit)
}

function selectSetup() {
    cursorS = new Sprite(5,5,5,'n')
    cursorS.layer = 10
    cursorS.x = mouse.x
    cursorS.y = mouse.y

    createCanvas(1400, 900)
    displayMode('centered')
    background(backgroundImg)
    textSize(128);

    level = new Group()
    level1 = new level.Sprite(400,500,400,400, 'n')
    level1.image = level1Img
    level2 = new level.Sprite(1000,500,400,400, 'n')
    level2.image = level2Img
}

function instructSetup() {
    createCanvas(1400, 900)
    displayMode('centered')
    background(backgroundImg)
    textSize(40);

    backButton = createButton('Back');
    backButton.class("button");
    backButton.position(875, 730);
    backButton.mousePressed(back)
}

function deathSetup() {
    createCanvas(1400, 900)
    displayMode('centered')
    background(deadImg)
    textSize(128);
    textFont(font)

    retryButton = createButton('Try Again');
    retryButton.class("button");
    retryButton.position(780, 350);
    retryButton.mousePressed(loadGame);

    menuButton = createButton('Main Menu');
    menuButton.class("button");
    menuButton.position(765, 440);
    menuButton.mousePressed(back);
}

function draw() { 
    if(state == 0) {
        if(tempStateM == 0) {
           menuSetup() 
           tempStateM = 1
        }
        tempStateG = 0
        tempStateI = 0
        drawMenu()
    }
    else if(state == 1) {
        if(tempStateG == 0) {
            gameSetup()
            tempStateG = 1
            tempStateS = 0
            tempStateD = 0
        }
        console.log('game start')
        drawGame()
    }
    else if(state == 2) {
        if(tempStateI == 0) {
            instructSetup()
            tempStateI = 1
        }
        drawInstruct()
    }
    else if(state == 3) {
        if(tempStateS == 0) {
            selectSetup()
            tempStateI = 0
            tempStateM = 0
            tempStateS = 1
        }
        drawSelect()
    }
    else if(state == 4) {
        if(tempStateD == 0) {
           deathSetup()
            tempStateI = 0
            tempStateM = 0
            tempStateS = 0
            tempStateD = 1
            tempStateG = 0
        }
        drawDeath()
    }
}

function drawMenu() {
    textFont(font)
    stroke(255)
    strokeWeight(0)
    text("DUNGEON BATTLE", 230, 125)
    console.log('menu' + state)
}

function drawDeath() {
    fill(0)
    text("YOU DIED", 430, 125)
    underlayTiles.remove()
    levelTiles.remove()
    allSprites.remove()
}

function drawGame() {
    clear()
    background(255)
    selectButton.remove()
    instructButton.remove()
    exitButton.remove()

    mouseSprite()

    enemyMove()
    
    if(tilemapCount==0) {
        cameraMovement1()
        move1()
    }
    if(tilemapCount==1) {
        cameraMovement2()
        move2()
    }
    
    console.log(playerBody.x, playerBody.y)

    playerHit()

    spawnBow()
    spawnSpear()
    spawnSword()
    pickup()
    use()

    if(kb.presses('escape')) {
        window.open("index.html", "_self")
    }

    stroke(255)
    strokeWeight(0)
    fill(0)
    text(msg, 400, 400)
    scoreSprite.text = "Score: " + score.toString()
    ammoSprite.text = msg

    if(bowActive) {
        msg = "Ammo: " + ammo
    }
    else if(swordActive) {
        msg = "Durability: " + durab 
    }
    else {
        msg = ' '
    }

    if(pHealth <= 0) {
        die()
    }
}

function drawInstruct() {
    selectButton.remove()
    instructButton.remove()
    exitButton.remove()
    fill(255)
    stroke(0)
    strokeWeight(5)
    rect(100,100,1200,700)
    fill(0)
    stroke(255)
    text('Survive oncoming waves of enemies using weapons around the', 120, 150)
    text('map.', 120, 180)
    text('Weapons spawn randomly throughout levels and have limited', 120, 230)
    text('uses.', 120, 270)
    text('Use WASD to move and the mouse to aim. Left click fires', 120, 320)
    text('arrows and uses the spear while right click throws the spear.', 120, 360)
    text('Getting hit by enemies will reduce your health get hit too many', 120, 410)
    text('times and you die.', 120, 450)

    text('Deafeating enemies will score points, more enemies killed', 120, 500)
    text('leads to a higher score', 120, 540)

    text('There are two levels to choose from level one is smaller and', 120, 590)
    text('level two is large.', 120, 630)
}

function drawSelect() {
    clear()
    background(selectImg)

    selectButton.remove()
    instructButton.remove()
    exitButton.remove()
    mouseSprite()

    textFont(font)
    fill(0)
    stroke(255)
    strokeWeight(0)
    text("LEVEL SELECT", 280, 125)
    fill(255)

    if(cursorS.overlapping(level1)) {
        console.log('overlap')
        if(mouse.presses()) {
            tilemapCount = 0
            loadGame()
            console.log('press')
            level1.remove()
            level2.remove()
            
        }
    }
    if(cursorS.overlapping(level2)) {
        console.log('overlap')
        if(mouse.presses()) {
            tilemapCount = 1
            loadGame()
            console.log('press')
            level1.remove()
            level2.remove()
            
        }
    }

}

function playerHit() {
    if(pHealth == 0) {
        noLoop()
    }
    for(p of purple) {
        if(p.collides(playerBody)) {
            pHealth -= 5
            healthBar.w -= 25
            healthAdjust += 12.5
            console.log(pHealth, healthBar.w, healthAdjust)          
        }
    }
}

function spawnBow() {
    if(bowSpawn){
        bow = new Sprite(floor(Math.random()*3000),floor(Math.random()*3000), 20, 20)
        bow.image = bowImg
        bow.collider = 'n'
        bow.layer = 4
        bow.scale = 0.8
        if(bow.overlaps(blockable)) {
            bow.x = floor(Math.random()*3000)
            bow.y = floor(Math.random()*3000)
        }
        if(!bRotate) {
            rotVal = floor(Math.random()*360)
            bRotate = true
        }
        bow.rotateMinTo(rotVal,100) 
        bowSpawn = false
        console.log('bow spawn')
    }
    
}

function spawnSpear() {
    if(spearSpawn) {
        spear = new Sprite(floor(Math.random()*3000),floor(Math.random()*3000), 20, 20)
        spear.image = spearImg
        spear.collider = 'n'
        spear.layer = 4
        spear.scale = 0.8
        if(spear.overlaps(blockable)) {
            spear.x = floor(Math.random()*3000)
            spear.y = floor(Math.random()*3000)
        }
        if(!sRotate) {
            rotVal = floor(Math.random()*360)
            sRotate = true
        }
        spear.rotateMinTo(rotVal,100)
        spearSpawn = false
        console.log('spear spawn')
    }
    
}

function spawnSword() {
    if(swordSpawn) {
        sword = new Sprite(floor(Math.random()*3000),floor(Math.random()*3000),20,20)
        sword.image = swordImg
        sword.collider = 'n'
        sword.layer = 4
        sword.scale = 0.8
        if(sword.overlaps(blockable)) {
            sword.x = floor(Math.random()*3000)
            sword.y = floor(Math.random()*3000)
        }
        if(!swRotate) {
            rotVal = floor(Math.random()*360)
            swRotate = true
        }
        sword.rotateMinTo(rotVal,100) 
        swordSpawn = false
        console.log('sword spawn')
    }
    
}

function mouseSprite() {
    cursorS.x = mouse.x
    cursorS.y = mouse.y 
    cursorS.visible = false
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
        bowSpawn = true
    }
    if(playerBody.overlaps(spear)) {
        spear.remove()
        sThrown = false
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
        spearSpawn = true
    }
    if(sUsed) {
        if(playerBody.overlaps(spearUsed)) {
            sThrown = false
            sUsed = false
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
        swordSpawn = true
        shieldActive = true
        swordExists = false
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

            if(arrow.overlaps(blockable) || arrow.x < 0 || arrow.x > 4884 ||arrow.y < 0 || arrow.y > 4884) {
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
                    score += 1
                }
            }
        }
    }
    if(ammo < 0) {
        bowActive = false
        bowSpawn = true
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
            sThrown = true
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
                    score += 1
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
        if(mouse.presses('left') && !spearB && !sThrown) {
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
                    score += 1
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
            shield.layer = 4
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
            swordSwing.rotateTowards(mouse)
            shield.rotateTowards(mouse)
            
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
                    score += 1
                }
            }
        }
    }
    if(durab <= 0 && swordExists) {
        swordActive = false
        shield.remove()
        swordSwing.remove()
        swordJoint.remove()
        swordSpawn = true
        swordExists = false
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

function move1() {
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

function move2() {
    playerHands.rotateTowards(mouse, 0.15)

    if(playerBody.y > 45 && playerBody.y < 4884) {
        if(playerBody.y > 50){
            if(kb.pressing('w')) {
                if(playerBody.vel.y < playerSpeed) {
                    playerBody.vel.y -= 1 * ease
                    playerBody.rotateMinTo(90, 4)
                }
            }
        }
        if(playerBody.y < 4884) {
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
        if(playerBody.y >4884) {
            playerBody.vel.y = -1
        }
    }

    if(playerBody.x > 45 && playerBody.x < 4884) {
        if(playerBody.x > 50) {
            if(kb.pressing('a')) {
                if(playerBody.vel.y < playerSpeed) {
                    playerBody.vel.x -= 1 * ease
                    playerBody.rotateMinTo(0, 4)
                }
            }
        }
        if(playerBody.x < 4884) {
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

function cameraMovement1() {
    if(playerBody.x < 700) {
        camera.x = 700
        healthBar.x = 700 - healthAdjust
        healthContainer.x = 700
        leftBorder.x = camera.x - width/2 + 5
        rightBorder.x = camera.x + width/2 - 5
        scoreSprite.x = 350
        ammoSprite.x = 1050
    }
    else if(playerBody.x > 2380) {
        camera.x = 2380
        healthBar.x = 2380 - healthAdjust
        healthContainer.x = 2380
        leftBorder.x = camera.x - width/2 + 5
        rightBorder.x = camera.x + width/2 - 5
        scoreSprite.x = 2030
        ammoSprite.x = 2730
    }
    else {
        camera.x = playerBody.x
        healthBar.x = playerBody.x - healthAdjust
        healthContainer.x = playerBody.x
        leftBorder.x = playerBody.x - width/2 + 5
        rightBorder.x = playerBody.x + width/2 - 5
        scoreSprite.x = playerBody.x - 350
        ammoSprite.x = playerBody.x + 350
    }

    if(playerBody.y < 450) {
        camera.y = 450
        healthBar.y = 450 + 400
        healthContainer.y = 450 + 400
        topBorder.y = camera.y - height/2 + 5
        bottomBorder.y = camera.y + height/2 - 5
        scoreSprite.y = 850
        ammoSprite.y = 850
    }
    else if(playerBody.y > 2630) {
        camera.y = 2630
        healthBar.y = 2630 + 400
        healthContainer.y = 2630 + 400
        topBorder.y = camera.y - height/2 + 5
        bottomBorder.y = camera.y + height/2 - 5
        scoreSprite.y = 3030
        ammoSprite.y = 3030
    }
    else {
        camera.y = playerBody.y
        healthBar.y = playerBody.y + 400
        healthContainer.y = playerBody.y + 400
        topBorder.y = playerBody.y - height/2 + 5
        bottomBorder.y = playerBody.y + height/2 - 5
        scoreSprite.y = playerBody.y + 400
        ammoSprite.y = playerBody.y + 400
    } 
}

function cameraMovement2() {
    if(playerBody.x < 700) {
        camera.x = 700
        healthBar.x = 700 - healthAdjust
        healthContainer.x = 700
        leftBorder.x = camera.x - width/2 + 5
        rightBorder.x = camera.x + width/2 - 5
        scoreSprite.x = 350
        ammoSprite.x = 1050
    }
    else if(playerBody.x > 4220) {
        camera.x = 4220
        healthBar.x = 4220 - healthAdjust
        healthContainer.x = 4220
        leftBorder.x = camera.x - width/2 + 5
        rightBorder.x = camera.x + width/2 - 5
        scoreSprite.x = 4220 - 350
        ammoSprite.x = 4220 + 350
    }
    else {
        camera.x = playerBody.x
        healthBar.x = playerBody.x - healthAdjust
        healthContainer.x = playerBody.x
        leftBorder.x = playerBody.x - width/2 + 5
        rightBorder.x = playerBody.x + width/2 - 5
        scoreSprite.x = playerBody.x - 350
        ammoSprite.x = playerBody.x + 350
    }

    if(playerBody.y < 450) {
        camera.y = 450
        healthBar.y = 450 + 400
        healthContainer.y = 450 + 400
        topBorder.y = camera.y - height/2 + 5
        bottomBorder.y = camera.y + height/2 - 5
        scoreSprite.y = 850
        ammoSprite.y = 850
    }
    else if(playerBody.y > 4475) {
        camera.y = 4475
        healthBar.y = 4475 + 400
        healthContainer.y = 4475 + 400
        topBorder.y = camera.y - height/2 + 5
        bottomBorder.y = camera.y + height/2 - 5
        scoreSprite.y = 4475 + 400
        ammoSprite.y = 4475 + 400
    }
    else {
        camera.y = playerBody.y
        healthBar.y = playerBody.y + 400
        healthContainer.y = playerBody.y + 400
        topBorder.y = playerBody.y - height/2 + 5
        bottomBorder.y = playerBody.y + height/2 - 5
        scoreSprite.y = playerBody.y + 400
        ammoSprite.y = playerBody.y + 400
    } 
}

function createBorder() {
    border = new Group()
    leftBorder = new border.Sprite(5,0,10,64000)

    rightBorder = new border.Sprite(3076,0,10,64000)

    topBorder = new border.Sprite(0,5,64000,10)

    bottomBorder = new border.Sprite(0,3076,64000,10)

    border.collider = 'n'
    border.color = '#000'
    border.stroke = '#000'
    border.layer = 6
}

function loadGame() {
    state = 1
    console.log('pressed' + state)
    if(pHealth <= 0) {
        retryButton.remove()
        menuButton.remove()
        pHealth = 100
        healthAdjust = 0
    }
}

function exit() {
    noLoop()
}

function loadInstruct() {
    state = 2
}

function loadSelect() {
    state = 3
}

function die() {
    state = 4
}

function back() {
    window.open("index.html", "_self")
}