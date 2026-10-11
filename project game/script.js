const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Fix 1: Use valid hex (#ffffff instead of #ffff) and canvas.width/height instead of clientWidth/hight
ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, canvas.width, canvas.height);

const enemyWidth = 30;
const enemyHeight = 30;
let enemies = [];

function drawEnemies() {
    ctx.fillStyle = '#ff2233'; // Fix 2: Valid 6-digit or 3-digit hex (#ff2 or #ff2233)
    enemies.forEach(function(enemy) { // Fix 3: Typo 'functon' -> 'function'
        ctx.fillRect(enemy.x, enemy.y, enemyWidth, enemyHeight);
    });
}

function createEnemy() {
    const enemyX = Math.random() * (canvas.width - enemyWidth);
    const enemyY = 0;
    enemies.push({ x: enemyX, y: enemyY });
}

function updateEnemy() {
    enemies = enemies.filter(function(enemy) {
        return enemy.y < canvas.height;
    });
    enemies.forEach(function(enemy) { // Fix 4: Typo 'funtion' -> 'function'
        enemy.y += 2;
    });
}

function gameLoop() {
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawEnemies();
    updateEnemy();
    requestAnimationFrame(gameLoop); // Fix 5: Added missing semicolon
}

setInterval(createEnemy, 2000); // Fix 6: Typo 'createEnemey' -> 'createEnemy'
gameLoop();
