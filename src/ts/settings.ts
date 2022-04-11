export const settings = {
    fond : {
        image : "../../fond.png"
    },
    platform : {
        platforms: {
            green:'#00C600',
            color: ['#00A8D6','#AD622C'],
            stroke:'#000000'
        },
        ratioColor:0.85,
        ratioSpring : 0.1,
        maxCount : 20,
        verticalStart : 1/8,
        verticalGap:{min:1/20, max: 1/10},
        horizontalGap:{min:60, max: 288},
        width:45,
        height:14,
        move : {x: 0.5, y: 0}
    },
    doodler : {
        sprite : '../../sprite-doodle.png',
        frames : [
            {sx: 0, sy: 157, height:117, width:148},
            {sx: 0, sy: 267, height:117, width:148},
            {sx: 0, sy: 380, height:117, width: 148},
            {sx: 0, sy: 486, height:117, width: 148},
        ],
        move : {x: 0, y: 0.8},
        jump : 100,
    },
}