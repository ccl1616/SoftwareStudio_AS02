# ss2021 hw2

# Software Studio 2021 Spring Assignment 2

## Basic Components
|Component|Score|Y/N|
|:-:|:-:|:-:|
|Membership Mechanism|10%|Y|
|Complete Game Process|5%|Y|
|Basic Rules|45%|Y|
|Animations|10%|Y|
|Sound Effects|10%|Y|
|UI|10%|Y|

## Website Detail Description

### Basic Components Description : 
1. World map : 
    
``` 
    stage1: mainly with traditional elements.
    note: clouds are just decoration. 
```
    
![](https://i.imgur.com/erfNUyU.png)
    
``` 
    stage2: include some new elements.
    (menetioned in Bonus part, includes ghost floor and moving brick)
```
![](https://i.imgur.com/lIkT6Aj.png)


2. Player : 
```
    - press Z,X to move
    - press K to jump
    - player have 4 kinds of animation during the game.
    (idle, walk, jump, dead)
```
3. Enemies : 
    |Name|Situation|Result on player|
    |:-:|:-:|:-:|
    |Goomba|player horizontally touch it. <br> (Goomba will not disappear if not being stepped.)|die|
    ||player vertically stepped onto it. (Goomba disappears after being stepped)|score+500|
    |Turtle|player  horizontally touch it|x, walk through|
    ||player vertically stepped onto it. (Turtle disappears after being stepped)|score+200|
    |Flower|player touch it|die|
4. Question Blocks : 
    |Name|Situation|Result on player|
    |:-:|:-:|:-:|
    |coin type|player hit it from below|a coin will show, <br> coin+1, score+100 |
    |mushroom type|player hit it from below|a mushroom will show, <br>Mario grows bigger for 5 sec, then shrink back to normal.|
    
5. Animations : 
    |Node|it's animation clip|
    |:-:|:-:|
    |Player|idle,walk,jump,die|
    |Goomba|idle,walk,being_stepped|
    |Turtle|idle,walk,being_stepped|
    |Mushroom|idle,being_stepped|
    
6. Sound effects : 
    |Scene|Node|Sound|
    |:-:|:-:|:-:|
    |menu||BGM|
    |stage||BGM|
    ||player|player jump|
    ||player|player die|
    ||coin|coin effect|
    ||Goomba|being stepped effect|
    ||Turtle|being stepped effect|
    ||Mushroom|grow up : player powerup|
    |||shrink: player powerdown|
    
7. UI : 
    world name, life, timer, coin number, score
    ![](https://i.imgur.com/sXqZMCm.png)


### Bonus Functions Description : 
``` 
    stage2: include some new elements
    1. ghost floor: 
        ghost floor will disappear after a few seconds after player step onto it.
    2. moving brick: 
        moving brick for player to step on.
```
![](https://i.imgur.com/SfZhzEh.png)
![](https://i.imgur.com/WW2aIvV.jpg)
