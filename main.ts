/**
 * Gestion des véhicules obstacles
 */
/**
 * Boucle infinie du jeu
 */
/**
 * Gestion des boutons
 */
/**
 * Déplacement du véhicule
 */
/**
 * Affichage des véhicules
 */
/**
 * Gestion des collisions
 */
function Collision () {
    CollisionVehicle(vehiclesList[offsetY])
}
function DrawVehicles () {
    basic.clearScreen()
    led.plot(offsetX + vehicle, offsetY)
    for (let y = 0; y <= 4; y++) {
        DrawVehicleLine(vehiclesList[y], y)
    }
    led.plot(offsetX + vehicle, offsetY)
}
/**
 * Initialisation des variables
 */
function InitVariables () {
    vehiclesList = [0, 0, 0, 0, 0]
    vehicle = 0
    maxLeft = -2
    maxRight = 2
    offsetX = 2
    offsetY = 4
    pause2 = 1
    level = 1
}
function InitScore () {
    life = 10
    score = 0
}
input.onButtonPressed(Button.A, function () {
    MoveLeft()
})
function MoveRight () {
    if (pause2 == 0) {
        vehicle = Math.min(maxRight, vehicle + 1)
    }
}
function InitDisplay () {
    led.setDisplayMode(DisplayMode.Greyscale)
    led.plot(offsetX, offsetY)
}
function MoveVehicles () {
    if (vehiclesList[0] == 0) {
        vehicles = GetVehicles()
    } else {
        vehicles = 0
    }
    vehiclesList.pop()
    vehiclesList.unshift(vehicles)
    score = score + 1 / level
    if (score / 100 > level) {
        level = level + 0.5
    }
}
function CollisionVehicle (num: number) {
    for (let x = 0; x <= 4; x++) {
        if ((num & (2 ** x)) != 0) {
            if (x == offsetX + vehicle) {
                music.playTone(262, music.beat(BeatFraction.Half))
                life = life - 1
                if (life == 0) {
                    game.setScore(Math.round(score))
                    game.gameOver()
                }
            }
        }
    }
}
input.onButtonPressed(Button.AB, function () {
    if (pause2 == 0) {
        pause2 = 1
    } else {
        pause2 = 0
    }
})
input.onButtonPressed(Button.B, function () {
    MoveRight()
})
function DrawVehicleLine (num: number, line: number) {
    for (let x = 0; x <= 4; x++) {
        if ((num & (2 ** x)) != 0) {
            led.plotBrightness(x, line, 80)
        }
    }
}
function MoveLeft () {
    if (pause2 == 0) {
        vehicle = Math.max(maxLeft, vehicle - 1)
    }
}
function GetVehicles () {
    ret = 0
    i = 0
    vehicleNumber = randint(0, 2)
    while (vehicleNumber > 0 && i < 5) {
        if (Math.randomBoolean()) {
            vehicleNumber += -1
            ret = ret + 2 ** i
        }
        i += 1
    }
    return ret
}
let vehicleNumber = 0
let i = 0
let ret = 0
let vehicles = 0
let score = 0
let life = 0
let level = 0
let pause2 = 0
let maxRight = 0
let maxLeft = 0
let vehicle = 0
let offsetX = 0
let offsetY = 0
let vehiclesList: number[] = []
InitVariables()
InitScore()
InitDisplay()
basic.forever(function () {
    if (pause2 == 0) {
        MoveVehicles()
        DrawVehicles()
        Collision()
        basic.pause(300 - level * 100)
    }
})
