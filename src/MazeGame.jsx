import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box, Button, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import {
  Footprints,
  MousePointer2,
  RefreshCw,
  Timer,
  X,
} from "lucide-react";

const MAZE_SIZE = 17;
const FIELD_OF_VIEW = Math.PI / 3;
const PLAYER_RADIUS = 0.18;

const palette = {
  ink: "#1d211c",
  paper: "#f7f5ef",
  surface: "#fffdf8",
  forest: "#314b38",
  forestDark: "#142019",
  lime: "#d9efad",
  rust: "#a74f36",
};

function mulberry32(seed) {
  return function random() {
    let value = (seed += 0x6d2b79f5);
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function findFarthestCell(grid, startX, startY) {
  const queue = [[startX, startY, 0]];
  const visited = new Set([`${startX},${startY}`]);
  let farthest = { x: startX, y: startY, distance: 0 };

  for (let index = 0; index < queue.length; index += 1) {
    const [x, y, distance] = queue[index];

    if (distance > farthest.distance) {
      farthest = { x, y, distance };
    }

    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const nextX = x + dx;
      const nextY = y + dy;
      const key = `${nextX},${nextY}`;

      if (
        grid[nextY]?.[nextX] === 0 &&
        !visited.has(key)
      ) {
        visited.add(key);
        queue.push([nextX, nextY, distance + 1]);
      }
    }
  }

  return farthest;
}

function createMaze(seed) {
  const random = mulberry32(seed);
  const grid = Array.from({ length: MAZE_SIZE }, () =>
    Array(MAZE_SIZE).fill(1),
  );
  const stack = [[1, 1]];
  grid[1][1] = 0;

  while (stack.length > 0) {
    const [x, y] = stack[stack.length - 1];
    const choices = [
      [2, 0],
      [-2, 0],
      [0, 2],
      [0, -2],
    ].filter(([dx, dy]) => {
      const nextX = x + dx;
      const nextY = y + dy;
      return (
        nextX > 0 &&
        nextY > 0 &&
        nextX < MAZE_SIZE - 1 &&
        nextY < MAZE_SIZE - 1 &&
        grid[nextY][nextX] === 1
      );
    });

    if (choices.length === 0) {
      stack.pop();
      continue;
    }

    const [dx, dy] = choices[Math.floor(random() * choices.length)];
    grid[y + dy / 2][x + dx / 2] = 0;
    grid[y + dy][x + dx] = 0;
    stack.push([x + dx, y + dy]);
  }

  const farthest = findFarthestCell(grid, 1, 1);
  const firstOpening = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ].find(([dx, dy]) => grid[1 + dy]?.[1 + dx] === 0) ?? [1, 0];

  return {
    grid,
    start: {
      x: 1.5,
      y: 1.5,
      angle: Math.atan2(firstOpening[1], firstOpening[0]),
    },
    exit: {
      x: farthest.x + 0.5,
      y: farthest.y + 0.5,
    },
  };
}

function castRay(grid, playerX, playerY, angle) {
  const rayX = Math.cos(angle);
  const rayY = Math.sin(angle);
  let mapX = Math.floor(playerX);
  let mapY = Math.floor(playerY);
  const deltaX = Math.abs(1 / (rayX || 0.000001));
  const deltaY = Math.abs(1 / (rayY || 0.000001));
  const stepX = rayX < 0 ? -1 : 1;
  const stepY = rayY < 0 ? -1 : 1;
  let sideDistanceX =
    rayX < 0
      ? (playerX - mapX) * deltaX
      : (mapX + 1 - playerX) * deltaX;
  let sideDistanceY =
    rayY < 0
      ? (playerY - mapY) * deltaY
      : (mapY + 1 - playerY) * deltaY;
  let side = 0;

  for (let depth = 0; depth < 64; depth += 1) {
    if (sideDistanceX < sideDistanceY) {
      sideDistanceX += deltaX;
      mapX += stepX;
      side = 0;
    } else {
      sideDistanceY += deltaY;
      mapY += stepY;
      side = 1;
    }

    if (grid[mapY]?.[mapX] !== 0) {
      const distance =
        side === 0
          ? (mapX - playerX + (1 - stepX) / 2) / rayX
          : (mapY - playerY + (1 - stepY) / 2) / rayY;

      return {
        distance: Math.max(0.001, Math.abs(distance)),
        side,
      };
    }
  }

  return { distance: 32, side: 0 };
}

function normalizeAngle(angle) {
  let normalized = angle;

  while (normalized > Math.PI) normalized -= Math.PI * 2;
  while (normalized < -Math.PI) normalized += Math.PI * 2;

  return normalized;
}

function isWalkable(grid, x, y) {
  return [
    [x - PLAYER_RADIUS, y - PLAYER_RADIUS],
    [x + PLAYER_RADIUS, y - PLAYER_RADIUS],
    [x - PLAYER_RADIUS, y + PLAYER_RADIUS],
    [x + PLAYER_RADIUS, y + PLAYER_RADIUS],
  ].every(([cornerX, cornerY]) =>
    grid[Math.floor(cornerY)]?.[Math.floor(cornerX)] === 0,
  );
}

function resizeCanvas(canvas) {
  const rect = canvas.getBoundingClientRect();
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(1, Math.round(rect.width * pixelRatio));
  const height = Math.max(1, Math.round(rect.height * pixelRatio));

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }

  return { width, height, pixelRatio };
}

function drawScene(canvas, maze, player) {
  const context = canvas.getContext("2d");
  const { width, height, pixelRatio } = resizeCanvas(canvas);
  const horizon = height * 0.47;
  const sky = context.createLinearGradient(0, 0, 0, horizon);
  sky.addColorStop(0, "#79c9ed");
  sky.addColorStop(0.62, "#c6e5df");
  sky.addColorStop(1, "#f4d99a");
  context.fillStyle = sky;
  context.fillRect(0, 0, width, horizon);

  const floor = context.createLinearGradient(0, horizon, 0, height);
  floor.addColorStop(0, "#9b8052");
  floor.addColorStop(0.35, "#705536");
  floor.addColorStop(1, "#3c3022");
  context.fillStyle = floor;
  context.fillRect(0, horizon, width, height - horizon);

  // A compacted earth track narrows into the distance between the corn rows.
  context.beginPath();
  context.moveTo(width * 0.47, horizon);
  context.lineTo(width * 0.53, horizon);
  context.lineTo(width * 0.96, height);
  context.lineTo(width * 0.04, height);
  context.closePath();
  const path = context.createLinearGradient(0, horizon, 0, height);
  path.addColorStop(0, "#b4935f");
  path.addColorStop(0.48, "#80603b");
  path.addColorStop(1, "#60472e");
  context.fillStyle = path;
  context.fill();

  // Uneven dirt clods and ruts follow the ground perspective.
  for (let index = 0; index < 90; index += 1) {
    const progress = ((index * 37) % 89 + 1) / 90;
    const y = horizon + progress * progress * (height - horizon);
    const spread = width * (0.04 + progress * 0.42);
    const x = width * 0.5 + ((((index * 53) % 101) / 100) - 0.5) * spread * 2;
    const size = Math.max(1, pixelRatio * (0.5 + progress * 2));
    context.fillStyle = index % 3 === 0 ? "rgba(211, 174, 112, 0.2)" : "rgba(35, 27, 19, 0.2)";
    context.beginPath();
    context.ellipse(x, y, size * 1.8, size * 0.65, 0, 0, Math.PI * 2);
    context.fill();
  }
  context.strokeStyle = "rgba(45, 34, 23, 0.24)";
  context.lineWidth = Math.max(1, pixelRatio);
  for (let index = 1; index <= 8; index += 1) {
    const progress = index / 8;
    const y = horizon + progress * progress * (height - horizon);
    context.beginPath();
    context.moveTo(width * (0.5 - progress * 0.43), y);
    context.lineTo(width * (0.5 + progress * 0.43), y);
    context.stroke();
  }

  const stripWidth = Math.max(2, Math.round(pixelRatio * 2));
  const depthBuffer = [];

  for (let x = 0; x < width; x += stripWidth) {
    const rayAngle =
      player.angle - FIELD_OF_VIEW / 2 + (x / width) * FIELD_OF_VIEW;
    const hit = castRay(maze.grid, player.x, player.y, rayAngle);
    const correctedDistance = Math.max(
      0.001,
      hit.distance * Math.cos(rayAngle - player.angle),
    );
    const wallHeight = Math.min(
      height * 1.8,
      (height * 0.84) / correctedDistance,
    );
    const wallTop = horizon - wallHeight / 2;
    const depthShade = Math.max(0.2, 1 - correctedDistance / 18);
    const sideShade = hit.side === 1 ? 0.76 : 1;
    const shade = depthShade * sideShade;
    const red = Math.round(180 * shade);
    const green = Math.round(204 * shade);
    const blue = Math.round(161 * shade);

    context.fillStyle = `rgb(${red}, ${green}, ${blue})`;
    context.fillRect(x, wallTop, stripWidth + 1, wallHeight);
    context.fillStyle = `rgba(255, 236, 157, ${0.1 * depthShade})`;
    context.fillRect(x, wallTop, Math.max(1, pixelRatio), wallHeight);
    depthBuffer.push({ x, distance: correctedDistance, wallTop, wallHeight, shade });
  }

  // Model neighboring corn plants along the wall with ribbed stalks,
  // broad tapered leaves, and occasional golden ears tucked in husks.
  for (let index = 0; index < depthBuffer.length; index += Math.max(8, Math.floor(46 / stripWidth))) {
    const column = depthBuffer[index];
    const stalkX = column.x + stripWidth * 0.5;
    const plantScale = Math.max(0.42, Math.min(1.25, column.wallHeight / (height * 0.82)));
    const stalkWidth = Math.max(5 * pixelRatio, 12 * pixelRatio * plantScale);
    const plantTop = column.wallTop + column.wallHeight * 0.06;
    const plantBottom = column.wallTop + column.wallHeight * 1.04;
    const bend = ((index * 17) % 9 - 4) * pixelRatio * plantScale;
    context.save();
    context.beginPath();
    context.rect(stalkX - stalkWidth * 7, column.wallTop, stalkWidth * 14, column.wallHeight);
    context.clip();

    const stem = context.createLinearGradient(stalkX - stalkWidth, 0, stalkX + stalkWidth, 0);
    stem.addColorStop(0, `rgba(42, 84, 39, ${0.9 * column.shade})`);
    stem.addColorStop(0.45, `rgba(132, 157, 65, ${0.92 * column.shade})`);
    stem.addColorStop(0.72, `rgba(178, 170, 79, ${0.82 * column.shade})`);
    stem.addColorStop(1, `rgba(48, 91, 39, ${0.9 * column.shade})`);
    context.strokeStyle = stem;
    context.lineWidth = stalkWidth;
    context.beginPath();
    context.moveTo(stalkX + bend, plantBottom);
    context.quadraticCurveTo(stalkX - bend * 0.4, (plantTop + plantBottom) / 2, stalkX, plantTop);
    context.stroke();

    for (let leaf = 0; leaf < 4; leaf += 1) {
      const leafY = plantTop + column.wallHeight * (0.38 + leaf * 0.14);
      const side = (leaf + index) % 2 === 0 ? 1 : -1;
      const reach = stalkWidth * (2.8 + ((leaf + index) % 3) * 0.65);
      const tipX = stalkX + side * reach;
      const tipY = leafY - column.wallHeight * (0.1 + (leaf % 2) * 0.025);
      context.beginPath();
      context.moveTo(stalkX, leafY);
      context.quadraticCurveTo(stalkX + side * reach * 0.28, leafY - column.wallHeight * 0.12, tipX, tipY);
      context.quadraticCurveTo(stalkX + side * reach * 0.48, leafY + column.wallHeight * 0.045, stalkX + side * stalkWidth * 0.45, leafY + column.wallHeight * 0.035);
      context.closePath();
      context.fillStyle = leaf % 2 === 0
        ? `rgba(77, 119, 47, ${0.88 * column.shade})`
        : `rgba(145, 155, 65, ${0.8 * column.shade})`;
      context.fill();
      context.strokeStyle = `rgba(204, 196, 112, ${0.42 * column.shade})`;
      context.lineWidth = Math.max(1, pixelRatio * plantScale);
      context.beginPath();
      context.moveTo(stalkX, leafY + column.wallHeight * 0.02);
      context.quadraticCurveTo(stalkX + side * reach * 0.36, leafY - column.wallHeight * 0.035, tipX * 0.96 + stalkX * 0.04, tipY + column.wallHeight * 0.025);
      context.stroke();
    }

    if (index % 3 === 0) {
      const earY = plantTop + column.wallHeight * 0.62;
      const earX = stalkX + stalkWidth * 0.55;
      context.save();
      context.translate(earX, earY);
      context.rotate(-0.16);
      context.fillStyle = `rgba(218, 184, 79, ${0.9 * column.shade})`;
      context.beginPath();
      context.ellipse(0, 0, stalkWidth * 0.58, column.wallHeight * 0.055, 0, 0, Math.PI * 2);
      context.fill();
      context.strokeStyle = `rgba(116, 135, 55, ${0.9 * column.shade})`;
      context.lineWidth = stalkWidth * 0.48;
      context.beginPath();
      context.moveTo(-stalkWidth * 0.2, column.wallHeight * 0.06);
      context.quadraticCurveTo(stalkWidth, column.wallHeight * 0.035, stalkWidth * 0.3, -column.wallHeight * 0.04);
      context.stroke();
      context.restore();
    }
    context.restore();
  }

  const exitDx = maze.exit.x - player.x;
  const exitDy = maze.exit.y - player.y;
  const exitDistance = Math.hypot(exitDx, exitDy);
  const exitAngle = normalizeAngle(Math.atan2(exitDy, exitDx) - player.angle);
  const wallBeforeExit = castRay(
    maze.grid,
    player.x,
    player.y,
    Math.atan2(exitDy, exitDx),
  ).distance;

  if (
    Math.abs(exitAngle) < FIELD_OF_VIEW * 0.56 &&
    wallBeforeExit > exitDistance - 0.28
  ) {
    const screenX = width * (0.5 + exitAngle / FIELD_OF_VIEW);
    const spriteHeight = Math.min(height * 0.78, (height * 0.72) / exitDistance);
    const spriteWidth = spriteHeight * 0.46;
    const spriteTop = horizon - spriteHeight * 0.52;
    const glow = context.createRadialGradient(
      screenX,
      spriteTop + spriteHeight * 0.48,
      0,
      screenX,
      spriteTop + spriteHeight * 0.48,
      spriteWidth,
    );
    glow.addColorStop(0, "rgba(225, 255, 172, 0.96)");
    glow.addColorStop(0.32, "rgba(168, 229, 106, 0.62)");
    glow.addColorStop(1, "rgba(168, 229, 106, 0)");
    context.fillStyle = glow;
    context.fillRect(
      screenX - spriteWidth,
      spriteTop - spriteHeight * 0.1,
      spriteWidth * 2,
      spriteHeight * 1.2,
    );
    context.fillStyle = "#d9efad";
    context.fillRect(
      screenX - spriteWidth * 0.18,
      spriteTop + spriteHeight * 0.08,
      spriteWidth * 0.36,
      spriteHeight * 0.84,
    );
    context.fillStyle = "#1d211c";
    context.font = `800 ${Math.max(9, spriteWidth * 0.17)}px ui-sans-serif, system-ui`;
    context.textAlign = "center";
    context.fillText("EXIT", screenX, spriteTop + spriteHeight * 0.53);
  }

  const vignette = context.createRadialGradient(
    width / 2,
    height / 2,
    height * 0.18,
    width / 2,
    height / 2,
    Math.max(width, height) * 0.68,
  );
  vignette.addColorStop(0.5, "rgba(0,0,0,0)");
  vignette.addColorStop(1, "rgba(0,0,0,0.58)");
  context.fillStyle = vignette;
  context.fillRect(0, 0, width, height);

  context.strokeStyle = "rgba(255, 253, 248, 0.78)";
  context.lineWidth = Math.max(1, pixelRatio);
  context.beginPath();
  context.moveTo(width / 2 - 7 * pixelRatio, height / 2);
  context.lineTo(width / 2 + 7 * pixelRatio, height / 2);
  context.moveTo(width / 2, height / 2 - 7 * pixelRatio);
  context.lineTo(width / 2, height / 2 + 7 * pixelRatio);
  context.stroke();

  return depthBuffer;
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

function Stat({ icon: Icon, label, value }) {
  return (
    <HStack
      gap="2"
      px={{ base: "3", md: "4" }}
      py="2.5"
      border="1px solid rgba(255,255,255,.16)"
      borderRadius="full"
      bg="rgba(9, 16, 12, 0.68)"
      color="white"
      backdropFilter="blur(14px)"
    >
      <Icon size={15} aria-hidden="true" />
      <Text as="span" display={{ base: "none", sm: "inline" }} color="rgba(255,255,255,.62)" fontSize="xs" fontWeight="700">
        {label}
      </Text>
      <Text as="span" fontFamily="monospace" fontSize="sm" fontWeight="800">
        {value}
      </Text>
    </HStack>
  );
}

function ControlButton({ label, controlKey, onPress, onRelease, children }) {
  return (
    <Button
      aria-label={label}
      minW="12"
      h="12"
      p="0"
      border="1px solid rgba(255,255,255,.18)"
      borderRadius="xl"
      bg="rgba(9, 16, 12, 0.76)"
      color="white"
      fontSize="lg"
      boxShadow="0 8px 25px rgba(0,0,0,.24)"
      backdropFilter="blur(12px)"
      userSelect="none"
      touchAction="none"
      _hover={{ bg: "rgba(49, 75, 56, 0.9)" }}
      _active={{ bg: palette.rust, transform: "scale(.96)" }}
      onPointerDown={(event) => {
        event.preventDefault();
        event.currentTarget.setPointerCapture?.(event.pointerId);
        onPress(controlKey);
      }}
      onPointerUp={() => onRelease(controlKey)}
      onPointerCancel={() => onRelease(controlKey)}
      onLostPointerCapture={() => onRelease(controlKey)}
    >
      {children}
    </Button>
  );
}

function MazeGame({ onClose }) {
  const [seed, setSeed] = useState(() => Date.now() % 2147483647);
  const maze = useMemo(() => createMaze(seed), [seed]);
  const canvasRef = useRef(null);
  const playerRef = useRef({ ...maze.start });
  const keysRef = useRef(new Set());
  const lastCellRef = useRef("1,1");
  const startTimeRef = useRef(Date.now());
  const completedRef = useRef(false);
  const [elapsed, setElapsed] = useState(0);
  const [steps, setSteps] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [pointerLocked, setPointerLocked] = useState(false);

  const pressControl = useCallback((key) => {
    keysRef.current.add(key);
  }, []);

  const releaseControl = useCallback((key) => {
    keysRef.current.delete(key);
  }, []);

  const resetMaze = useCallback(() => {
    setSeed((currentSeed) => currentSeed + 7919);
  }, []);

  useEffect(() => {
    playerRef.current = { ...maze.start };
    lastCellRef.current = `${Math.floor(maze.start.x)},${Math.floor(maze.start.y)}`;
    keysRef.current.clear();
    completedRef.current = false;
    startTimeRef.current = Date.now();
    setElapsed(0);
    setSteps(0);
    setCompleted(false);
  }, [maze]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      if (document.pointerLockElement) document.exitPointerLock?.();
    };
  }, []);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      if (!completedRef.current) {
        setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }
    }, 250);

    return () => window.clearInterval(timerId);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      const key = event.key.toLowerCase();
      if (
        ["w", "a", "s", "d", "q", "e", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(key)
      ) {
        event.preventDefault();
        keysRef.current.add(key);
      }
      if (key === "m") setShowMap((visible) => !visible);
      if (key === "r") resetMaze();
    };
    const onKeyUp = (event) => keysRef.current.delete(event.key.toLowerCase());
    const onMouseMove = (event) => {
      if (document.pointerLockElement === canvasRef.current && !completedRef.current) {
        playerRef.current.angle += event.movementX * 0.0022;
      }
    };
    const onPointerLockChange = () => {
      setPointerLocked(document.pointerLockElement === canvasRef.current);
    };

    window.addEventListener("keydown", onKeyDown, { passive: false });
    window.addEventListener("keyup", onKeyUp);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("pointerlockchange", onPointerLockChange);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("pointerlockchange", onPointerLockChange);
    };
  }, [resetMaze]);

  useEffect(() => {
    let animationFrame;
    let previousTime = performance.now();

    const animate = (now) => {
      const delta = Math.min((now - previousTime) / 1000, 0.05);
      previousTime = now;
      const player = playerRef.current;
      const keys = keysRef.current;

      if (!completedRef.current) {
        const turn =
          (keys.has("arrowright") || keys.has("e") ? 1 : 0) -
          (keys.has("arrowleft") || keys.has("q") ? 1 : 0);
        player.angle = normalizeAngle(player.angle + turn * delta * 1.95);

        let forward =
          (keys.has("w") || keys.has("arrowup") ? 1 : 0) -
          (keys.has("s") || keys.has("arrowdown") ? 1 : 0);
        let strafe = (keys.has("d") ? 1 : 0) - (keys.has("a") ? 1 : 0);
        const movementLength = Math.hypot(forward, strafe);

        if (movementLength > 0) {
          forward /= movementLength;
          strafe /= movementLength;
          const speed = delta * 2.15;
          const moveX =
            (Math.cos(player.angle) * forward +
              Math.cos(player.angle + Math.PI / 2) * strafe) *
            speed;
          const moveY =
            (Math.sin(player.angle) * forward +
              Math.sin(player.angle + Math.PI / 2) * strafe) *
            speed;

          if (isWalkable(maze.grid, player.x + moveX, player.y)) {
            player.x += moveX;
          }
          if (isWalkable(maze.grid, player.x, player.y + moveY)) {
            player.y += moveY;
          }

          const currentCell = `${Math.floor(player.x)},${Math.floor(player.y)}`;
          if (currentCell !== lastCellRef.current) {
            lastCellRef.current = currentCell;
            setSteps((currentSteps) => currentSteps + 1);
          }
        }

        if (Math.hypot(player.x - maze.exit.x, player.y - maze.exit.y) < 0.42) {
          completedRef.current = true;
          setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
          setCompleted(true);
          if (document.pointerLockElement) document.exitPointerLock?.();
        }
      }

      if (canvasRef.current) drawScene(canvasRef.current, maze, player);
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [maze]);

  const exitDirection = normalizeAngle(
    Math.atan2(maze.exit.y - playerRef.current.y, maze.exit.x - playerRef.current.x) - playerRef.current.angle,
  );

  return (
    <Box
      role="dialog"
      aria-modal="true"
      aria-label="Playable 3D maze"
      position="fixed"
      inset="0"
      zIndex="1000"
      overflow="hidden"
      bg={palette.forestDark}
    >
      <Box
        as="canvas"
        ref={canvasRef}
        aria-label="First-person view of the maze. Use W A S D to move and the mouse or arrow keys to turn."
        display="block"
        w="100%"
        h="100%"
        cursor={pointerLocked ? "none" : "crosshair"}
        touchAction="none"
        onClick={(event) => {
          event.currentTarget.focus();
          event.currentTarget.requestPointerLock?.();
        }}
      />

      <Flex
        position="absolute"
        top="0"
        left="0"
        right="0"
        zIndex="2"
        align="center"
        justify="space-between"
        gap="3"
        p={{ base: "3", md: "5" }}
        pointerEvents="none"
      >
        <Stack gap="0" color="white" textShadow="0 2px 12px rgba(0,0,0,.46)">
          <Text fontSize={{ base: "md", md: "xl" }} fontWeight="900" letterSpacing="-0.03em">
            Corn Maze
          </Text>
          <Text display={{ base: "none", sm: "block" }} color="rgba(255,255,255,.62)" fontSize="xs" fontWeight="700">
            Find the glowing exit
          </Text>
        </Stack>

        <HStack gap="2" pointerEvents="auto">
          <Stat icon={Timer} label="TIME" value={formatTime(elapsed)} />
          <Stat icon={Footprints} label="STEPS" value={String(steps).padStart(2, "0")} />
          <Box
            aria-label="Direction to exit"
            role="img"
            position="absolute"
            left="50%"
            top={{ base: "72px", md: "86px" }}
            transform="translateX(-50%)"
            display="flex"
            alignItems="center"
            gap="2"
            px="3"
            py="2"
            border="1px solid rgba(255,255,255,.18)"
            borderRadius="full"
            bg="rgba(9, 16, 12, 0.68)"
            color="white"
            fontSize="xs"
            fontWeight="800"
            whiteSpace="nowrap"
            backdropFilter="blur(14px)"
          >
            <Box as="span" color={palette.lime} fontSize="lg" lineHeight="1" transform={`rotate(${exitDirection}rad)`} aria-hidden="true">↑</Box>
            EXIT DIRECTION
          </Box>
          <Button
            aria-label="Close maze"
            minW="11"
            h="11"
            p="0"
            border="1px solid rgba(255,255,255,.16)"
            borderRadius="full"
            bg="rgba(9, 16, 12, 0.68)"
            color="white"
            backdropFilter="blur(14px)"
            _hover={{ bg: palette.rust }}
            onClick={onClose}
          >
            <X size={18} />
          </Button>
        </HStack>
      </Flex>

      <HStack
        display={{ base: "none", md: "flex" }}
        position="absolute"
        left="5"
        bottom="5"
        zIndex="2"
        gap="3"
        px="4"
        py="3"
        border="1px solid rgba(255,255,255,.15)"
        borderRadius="2xl"
        bg="rgba(9, 16, 12, 0.72)"
        color="white"
        backdropFilter="blur(14px)"
        pointerEvents="none"
      >
        <MousePointer2 size={17} />
        <Text fontSize="sm" fontWeight="700">
          Click for mouse look · WASD move · arrows turn · R restart
        </Text>
      </HStack>

      <Box
        display={{ base: "block", md: "none" }}
        position="absolute"
        left="50%"
        bottom="4"
        zIndex="3"
        transform="translateX(-50%)"
      >
        <Stack gap="2" align="center">
          <HStack gap="2">
            <ControlButton label="Turn left" controlKey="arrowleft" onPress={pressControl} onRelease={releaseControl}>↶</ControlButton>
            <ControlButton label="Move forward" controlKey="w" onPress={pressControl} onRelease={releaseControl}>↑</ControlButton>
            <ControlButton label="Turn right" controlKey="arrowright" onPress={pressControl} onRelease={releaseControl}>↷</ControlButton>
          </HStack>
          <HStack gap="2">
            <ControlButton label="Strafe left" controlKey="a" onPress={pressControl} onRelease={releaseControl}>←</ControlButton>
            <ControlButton label="Move backward" controlKey="s" onPress={pressControl} onRelease={releaseControl}>↓</ControlButton>
            <ControlButton label="Strafe right" controlKey="d" onPress={pressControl} onRelease={releaseControl}>→</ControlButton>
          </HStack>
        </Stack>
      </Box>

      {completed && (
        <Flex
          position="absolute"
          inset="0"
          zIndex="5"
          align="center"
          justify="center"
          p="5"
          bg="rgba(5, 10, 7, 0.72)"
          backdropFilter="blur(10px)"
        >
          <Stack
            w="full"
            maxW="480px"
            p={{ base: "7", md: "10" }}
            gap="6"
            align="center"
            border="1px solid rgba(255,255,255,.2)"
            borderRadius="3xl"
            bg={palette.surface}
            color={palette.ink}
            textAlign="center"
            boxShadow="0 30px 100px rgba(0,0,0,.38)"
          >
            <Flex w="14" h="14" align="center" justify="center" borderRadius="full" bg={palette.lime} fontSize="2xl">
              ✓
            </Flex>
            <Box>
              <Text mb="2" color={palette.rust} fontSize="xs" fontWeight="900" letterSpacing="0.16em" textTransform="uppercase">
                Maze solved
              </Text>
              <Text fontSize={{ base: "3xl", md: "4xl" }} fontWeight="900" letterSpacing="-0.05em">
                You found the way out.
              </Text>
            </Box>
            <HStack gap="3">
              <Stat icon={Timer} label="TIME" value={formatTime(elapsed)} />
              <Stat icon={Footprints} label="STEPS" value={String(steps)} />
            </HStack>
            <Flex w="full" gap="3" direction={{ base: "column", sm: "row" }}>
              <Button
                flex="1"
                h="12"
                borderRadius="full"
                bg={palette.forest}
                color="white"
                fontWeight="800"
                _hover={{ bg: "#243b2b" }}
                onClick={resetMaze}
              >
                <HStack gap="2">
                  <RefreshCw size={17} />
                  <Text>New maze</Text>
                </HStack>
              </Button>
              <Button
                flex="1"
                h="12"
                border="1px solid #d8d9d1"
                borderRadius="full"
                bg="transparent"
                color={palette.ink}
                fontWeight="800"
                _hover={{ bg: palette.paper }}
                onClick={onClose}
              >
                Back to portfolio
              </Button>
            </Flex>
          </Stack>
        </Flex>
      )}
    </Box>
  );
}

export default MazeGame;
