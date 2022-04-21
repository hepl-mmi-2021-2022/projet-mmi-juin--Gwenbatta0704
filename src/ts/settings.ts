export const settings = {
    fond : {
        image : "../../fond.png"
    },
    platform : {
        platforms: {
            green:'#00C600',
            color: ['#00A8D6','rgba(173,98,44,1)'],
            stroke:'rgba(0,0,0,1)'
        },
        ratioColor:0.85,
        ratioSpring : 0.1,
        maxCount : 20,
        verticalStart : 1/10,
        verticalGap:{min:1/20, max: 1/10},
        horizontalGap:{min:60, max: 288},
        width:45,
        height:14,
        move : {x: 0.5, y: 0},
        active : false,
    },
    doodler : {
        sprite : '../../sprite-doodle.png',
        frames : [
            {sx: 31, sy: 122, height:78, width:78},
            {sx: 0, sy: 202, height:78, width:78},
            {sx: 31, sy: 290, height:70, width: 78},
            {sx: 0, sy: 373, height:70, width: 78},
        ],
        move : {x: 0, y: 0.9},
        jump : 100,
        Maxjump : 50,
    },
    spring : {
        sprite : '../../sprite-doodle.png',
        frames: [
            {sx: 0, sy: 469, height:30, width:48},
            {sx: 0, sy: 500, height:53, width:48},
        ]
    }
}