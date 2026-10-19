import { useState } from "react";
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Braces,
  Check,
  Code2,
  Database,
  GitBranch,
  Mail,
  Play,
  Server,
  Sparkles,
} from "lucide-react";
import MazeGame from "./MazeGame.jsx";

const colors = {
  ink: "#1d211c",
  muted: "#62685f",
  line: "#d8d9d1",
  paper: "#f7f5ef",
  surface: "#fffdf8",
  forest: "#314b38",
  forestLight: "#d8e6cc",
  lime: "#d9efad",
  rust: "#a74f36",
};

const projects = [
  {
    number: "01",
    title: "Boston Dumplings",
    type: "Full-stack ordering experience",
    description:
      "A welcoming restaurant storefront with a streamlined cart and checkout flow, customer accounts, pickup or delivery options, and automated order emails.",
    highlights: ["Responsive ordering flow", "Express + MySQL accounts", "Netlify email function"],
    tags: ["React", "Vite", "Express", "MySQL", "Netlify"],
    live: "https://bostondumplings.com",
    repository: "https://github.com/abhuraya/Boston_Dumplings",
    visual: "dumplings",
    featured: true,
  },
  {
    number: "02",
    title: "Flag Quiz",
    type: "Interactive geography game",
    description:
      "A fast, responsive quiz experience with difficulty levels, timed questions, immediate feedback, and a best score that persists between sessions.",
    highlights: ["Timed quiz sessions", "Difficulty levels", "Persistent best score"],
    tags: ["React", "Vite", "React Router", "Material UI"],
    live: "https://flagquizlet.netlify.app",
    repository: "https://github.com/abhuraya/Flag_Quiz",
    visual: "flags",
  },
  {
    number: "03",
    title: "Calculator",
    type: "Vanilla JavaScript application",
    description:
      "A polished dark-mode calculator supporting chained arithmetic, decimals, keyboard input, deletion, and clear error handling across screen sizes.",
    highlights: ["Keyboard controls", "Chained operations", "Responsive CSS Grid"],
    tags: ["JavaScript", "HTML5", "CSS3", "Netlify"],
    live: "https://lightcalculator.netlify.app",
    repository: "https://github.com/abhuraya/Calculator",
    visual: "calculator",
  },
  {
    number: "04",
    title: "Corn Maze",
    type: "Playable first-person experiment",
    description:
      "A procedurally generated first-person cornfield maze with a custom raycasting engine, leafy stalk walls, open sky, smooth movement, and a directional exit indicator.",
    highlights: ["New maze every run", "Desktop + mobile controls", "Timer and step tracking"],
    tags: ["React", "Canvas API", "Raycasting", "Procedural generation"],
    repository: "https://github.com/abhuraya/developer-portfolio",
    visual: "maze",
    playable: true,
  },
  {
    number: "05",
    title: "Fluid Wave Lab",
    type: "Interactive physics simulation",
    description:
      "A real-time top-down wave simulator where overlapping ripples naturally reinforce or cancel, reflective walls reshape the field, and a continuous double-slit source reveals interference bands.",
    highlights: ["Constructive + destructive interference", "Drawable reflective walls", "Continuous double-slit experiment"],
    tags: ["React", "TypeScript", "Canvas API", "Wave Physics", "GitHub Pages"],
    live: "https://abhuraya.github.io/Week-1-Project/",
    repository: "https://github.com/abhuraya/Week-1-Project",
    visual: "waves",
    featured: true,
  },
  {
    number: "06",
    title: "Fruit Picker",
    type: "Playful randomizer",
    description:
      "A colorful, responsive app that chooses from a broad collection of fruits, pairs every result with an emoji, and keeps each pick feeling fresh by preventing immediate repeats.",
    highlights: ["75+ fruit choices", "Click + keyboard controls", "Animated, repeat-safe results"],
    tags: ["JavaScript", "HTML5", "CSS3", "Netlify"],
    live: "https://pickyfruits.netlify.app/",
    repository: "https://github.com/abhuraya/Fruits",
    visual: "fruit",
  },
];

const skills = [
  {
    icon: Braces,
    title: "Front end",
    items: "React, JavaScript, Chakra UI, Material UI, Bootstrap, HTML, CSS",
  },
  {
    icon: Server,
    title: "Back end",
    items: "Node.js, Express, REST APIs, authentication, Netlify Functions",
  },
  {
    icon: Database,
    title: "Data",
    items: "MySQL, SQL, MongoDB, relational modeling, validation",
  },
  {
    icon: Code2,
    title: "Workflow",
    items: "Git, GitHub, VS Code, npm, Netlify, testing and debugging",
  },
];

function SectionLabel({ children, light = false }) {
  return (
    <HStack gap="3" mb="5">
      <Box w="8" h="1px" bg={light ? colors.lime : colors.forest} />
      <Text
        as="p"
        color={light ? colors.lime : colors.forest}
        fontSize="xs"
        fontWeight="800"
        letterSpacing="0.18em"
        textTransform="uppercase"
      >
        {children}
      </Text>
    </HStack>
  );
}

function LinkButton({ href, children, primary = false }) {
  return (
    <Button
      asChild
      h="12"
      px="6"
      borderRadius="full"
      border="1px solid"
      borderColor={primary ? colors.forest : colors.line}
      bg={primary ? colors.forest : "transparent"}
      color={primary ? "white" : colors.ink}
      fontWeight="700"
      boxShadow="none"
      transition="all 180ms ease"
      _hover={{
        bg: primary ? "#243b2b" : colors.surface,
        borderColor: colors.forest,
        transform: "translateY(-2px)",
      }}
      _focusVisible={{ outline: `3px solid ${colors.lime}`, outlineOffset: "3px" }}
    >
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
      >
        {children}
      </a>
    </Button>
  );
}

function ProfilePhotoSlot() {
  const [photoMissing, setPhotoMissing] = useState(false);

  return (
    <Box
      position="relative"
      minH={{ base: "280px", lg: "330px" }}
      overflow="hidden"
      border="1px solid"
      borderColor={colors.line}
      borderRadius="3xl"
      bg="linear-gradient(145deg, #dbe8d2 0%, #a7c28f 48%, #e4d4ae 100%)"
      boxShadow="0 18px 45px rgba(29, 33, 28, 0.1)"
      aria-label="Portrait photo area"
    >
      {!photoMissing && (
        <Box
          as="img"
          src="/profile.jpg"
          alt="Abhudaya Rayamajhi"
          position="absolute"
          inset="0"
          w="100%"
          h="100%"
          objectFit="cover"
          onError={() => setPhotoMissing(true)}
        />
      )}
      {photoMissing && (
        <Flex position="absolute" inset="0" direction="column" align="center" justify="center" gap="4" color={colors.forest}>
          <Box position="relative" w="24" h="24" borderRadius="full" bg="rgba(255,253,248,.72)" boxShadow="0 12px 28px rgba(49,75,56,.14)">
            <Box position="absolute" top="22%" left="50%" w="30%" h="30%" transform="translateX(-50%)" borderRadius="full" bg="#a6b89a" />
            <Box position="absolute" bottom="13%" left="50%" w="58%" h="38%" transform="translateX(-50%)" borderRadius="50% 50% 35% 35%" bg="#a6b89a" />
          </Box>
          <Box textAlign="center" px="4">
            <Text fontSize="sm" fontWeight="900" letterSpacing="0.12em">YOUR PHOTO</Text>
            <Text mt="1" color={colors.muted} fontSize="xs">Add public/profile.jpg to personalize this space</Text>
          </Box>
        </Flex>
      )}
      {!photoMissing && (
        <Badge position="absolute" left="4" bottom="4" px="3" py="1.5" borderRadius="full" bg="rgba(29,33,28,.62)" color="white" backdropFilter="blur(8px)">
          ABHUDAYA RAYAMAJHI
        </Badge>
      )}
    </Box>
  );
}

function CornMazeCardVisual() {
  const leaves = Array.from({ length: 28 }, (_, index) => index);
  const clouds = [["12%", "20%"], ["57%", "16%"], ["80%", "30%"]];

  return (
    <Box aria-hidden="true" position="relative" minH="245px" overflow="hidden" bg="#8fcbe1" isolation="isolate">
      <style>{`
        @keyframes hedge-cloud-drift { from { transform: translateX(-7px); } to { transform: translateX(12px); } }
        @media (prefers-reduced-motion: reduce) { .hedge-cloud { animation: none !important; } }
      `}</style>
      <Box position="absolute" inset="0" bg="linear-gradient(180deg, #68b8df 0%, #b8e1e9 48%, #f3dfaa 58%, #748d49 59%, #34442d 100%)" />
      <Box position="absolute" top="12%" right="18%" w="42px" h="42px" borderRadius="full" bg="#fff4c4" boxShadow="0 0 35px 12px rgba(255,244,196,.35)" />
      {clouds.map(([left, top], index) => (
        <Box key={left} className="hedge-cloud" position="absolute" left={left} top={top} w="92px" h="25px" borderRadius="full" bg="rgba(255,255,255,.76)" filter="blur(1px)" animation={`hedge-cloud-drift ${6 + index * 2}s ease-in-out infinite alternate`}>
          <Box position="absolute" left="18%" top="-40%" w="42%" h="90%" borderRadius="full" bg="inherit" />
          <Box position="absolute" right="14%" top="-25%" w="38%" h="76%" borderRadius="full" bg="inherit" />
        </Box>
      ))}
      <Box position="absolute" left="50%" top="57%" w="100%" h="48%" transform="translateX(-50%)" clipPath="polygon(48% 0, 52% 0, 100% 100%, 0 100%)" bg="linear-gradient(180deg, #b89a61 0%, #82613b 55%, #57422e 100%)" />
      <Box position="absolute" left="50%" top="58%" w="76%" h="44%" transform="translateX(-50%)" clipPath="polygon(49% 0, 51% 0, 100% 100%, 0 100%)" opacity=".4" backgroundImage="repeating-linear-gradient(176deg, transparent 0 17px, rgba(47,34,22,.38) 18px 20px)" />
      {[{ side: "left", reverse: false }, { side: "right", reverse: true }].map(({ side, reverse }) => (
        <Box key={side} position="absolute" top="54%" bottom="-7%" left={reverse ? "56%" : "-8%"} right={reverse ? "-8%" : "56%"} clipPath={reverse ? "polygon(18% 0,100% 0,100% 100%,0 100%)" : "polygon(0 0,82% 0,100% 100%,0 100%)"} bg="linear-gradient(180deg, #315d34 0%, #21492b 45%, #173923 100%)" overflow="hidden">
          {leaves.map((leaf) => (
            <Box key={leaf} position="absolute" left={`${(leaf * 37) % 101}%`} top={`${(leaf * 53) % 106 - 3}%`} w={`${12 + (leaf % 4) * 3}%`} h={`${8 + (leaf % 3) * 2}%`} transform={`rotate(${(leaf * 47) % 70 - 35}deg)`} borderRadius="70% 30% 70% 30%" bg={["#28552f", "#376b38", "#4c7940", "#658447"][leaf % 4]} boxShadow="inset 2px 2px 4px rgba(190,210,128,.22)" opacity=".94" />
          ))}
        </Box>
      ))}
      <Box position="absolute" left="50%" top="50%" w="2px" h="14px" transform="translate(-50%, -50%)" bg="rgba(255,255,255,.88)" boxShadow="0 0 8px rgba(255,255,255,.9)" />
      <Box position="absolute" left="50%" top="50%" w="14px" h="2px" transform="translate(-50%, -50%)" bg="rgba(255,255,255,.88)" boxShadow="0 0 8px rgba(255,255,255,.9)" />
      <Badge position="absolute" top="4" left="4" px="3" py="1.5" borderRadius="full" bg="rgba(22,42,29,.58)" color="white" backdropFilter="blur(8px)">FIRST-PERSON HEDGE MAZE</Badge>
    </Box>
  );
}

function ProjectVisual({ type }) {
  if (type === "dumplings") {
    return (
      <Box
        aria-hidden="true"
        position="relative"
        minH={{ base: "260px", md: "340px" }}
        overflow="hidden"
        bg="#e7d7bd"
      >
        <Box
          position="absolute"
          top="10%"
          right="8%"
          w="46%"
          h="34%"
          borderRadius="50%"
          bg="#c85f3f"
          opacity="0.9"
        />
        <Box
          position="absolute"
          left="10%"
          bottom="11%"
          w="76%"
          h="48%"
          borderRadius="50%"
          bg="#fbf7ed"
          border="10px solid #314b38"
          boxShadow="0 22px 55px rgba(29, 33, 28, 0.22)"
        >
          <Flex h="100%" align="center" justify="center" gap={{ base: "2", md: "4" }}>
            {["-12deg", "2deg", "14deg"].map((rotation) => (
              <Box
                key={rotation}
                w={{ base: "58px", md: "84px" }}
                h={{ base: "48px", md: "66px" }}
                borderRadius="50% 50% 46% 46%"
                bg="#f1d9a8"
                border="2px solid #c49a58"
                transform={`rotate(${rotation})`}
                boxShadow="inset 0 -9px 0 rgba(183, 130, 61, 0.14)"
              />
            ))}
          </Flex>
        </Box>
        <Text
          position="absolute"
          top="8%"
          left="8%"
          color={colors.ink}
          fontSize={{ base: "xl", md: "3xl" }}
          fontWeight="900"
          letterSpacing="-0.04em"
        >
          Handmade. Simple. Good.
        </Text>
      </Box>
    );
  }

  if (type === "flags") {
    return (
      <Box
        aria-hidden="true"
        minH="245px"
        p={{ base: "6", md: "8" }}
        bg="#dce8ff"
        backgroundImage="radial-gradient(#8ca4ce 1px, transparent 1px)"
        backgroundSize="18px 18px"
      >
        <Flex justify="space-between" align="center" mb="7">
          <Badge px="3" py="1" borderRadius="full" bg="white" color="#3f5271">
            QUESTION 07 / 10
          </Badge>
          <Text color="#3f5271" fontWeight="800">
            00:12
          </Text>
        </Flex>
        <Text mb="5" color="#25334b" fontSize="lg" fontWeight="800">
          Which country has this flag?
        </Text>
        <Flex
          w="112px"
          h="74px"
          mb="7"
          borderRadius="md"
          align="center"
          justify="center"
          bg="white"
          boxShadow="0 14px 30px rgba(42, 62, 94, 0.18)"
          fontSize="5xl"
        >
          🇳🇵
        </Flex>
        <SimpleGrid columns="2" gap="3">
          {["Nepal", "Bhutan", "India", "Sri Lanka"].map((country, index) => (
            <Box
              key={country}
              px="4"
              py="3"
              borderRadius="lg"
              bg={index === 0 ? "#364f79" : "rgba(255, 255, 255, 0.88)"}
              color={index === 0 ? "white" : "#33405a"}
              fontSize="sm"
              fontWeight="700"
            >
              {country}
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    );
  }

  if (type === "waves") {
    return (
      <Box
        aria-hidden="true"
        position="relative"
        minH={{ base: "280px", md: "360px" }}
        overflow="hidden"
        bg="linear-gradient(135deg, #052b3b 0%, #075665 54%, #0b7480 100%)"
      >
        <Box
          position="absolute"
          inset="0"
          opacity="0.25"
          backgroundImage="linear-gradient(rgba(185,245,239,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(185,245,239,.18) 1px, transparent 1px)"
          backgroundSize="28px 28px"
        />

        {[72, 126, 184, 244].map((size, index) => (
          <Box
            key={size}
            position="absolute"
            left="23%"
            top="53%"
            w={`${size}px`}
            h={`${size}px`}
            border="2px solid"
            borderColor={index % 2 === 0 ? "rgba(129,238,226,.68)" : "rgba(223,250,246,.34)"}
            borderRadius="full"
            transform="translate(-50%, -50%)"
          />
        ))}

        <Box position="absolute" left="22.8%" top="12%" w="3px" h="76%" bg="#9af0e6" boxShadow="0 0 22px rgba(154,240,230,.8)" />

        <Box position="absolute" left="56%" top="0" w="7px" h="30%" bg="#e9e2cc" />
        <Box position="absolute" left="56%" top="42%" w="7px" h="16%" bg="#e9e2cc" />
        <Box position="absolute" left="56%" top="70%" w="7px" h="30%" bg="#e9e2cc" />

        {["38%", "62%"].map((top) => (
          <Box
            key={top}
            position="absolute"
            left="76%"
            top={top}
            w={{ base: "150px", md: "220px" }}
            h={{ base: "82px", md: "112px" }}
            border="2px solid rgba(159,239,229,.54)"
            borderRadius="50%"
            transform="translate(-50%, -50%)"
            boxShadow="0 0 0 18px rgba(125,222,214,.08), 0 0 0 38px rgba(125,222,214,.05)"
          />
        ))}

        <Badge position="absolute" top="6" left="6" px="3" py="1.5" borderRadius="full" bg="rgba(4,29,40,.66)" color="#b9f5ef" backdropFilter="blur(9px)">
          DOUBLE-SLIT SOURCE
        </Badge>
        <Text position="absolute" right="6" bottom="6" color="rgba(226,249,246,.72)" fontFamily="monospace" fontSize="xs" fontWeight="800" letterSpacing="0.12em">
          LIVE WAVE FIELD
        </Text>
      </Box>
    );
  }

  if (type === "fruit") {
    return (
      <Box
        aria-hidden="true"
        position="relative"
        minH="245px"
        overflow="hidden"
        p={{ base: "6", md: "8" }}
        bg="#fff0bd"
        backgroundImage="radial-gradient(rgba(124,86,39,.18) 1px, transparent 1px)"
        backgroundSize="17px 17px"
      >
        <Flex position="absolute" top="4" right="5" gap="1" align="end">
          <Text fontSize={{ base: "5xl", md: "6xl" }} transform="rotate(-11deg)">🍓</Text>
          <Text fontSize={{ base: "6xl", md: "7xl" }} transform="translateY(16px) rotate(8deg)">🍊</Text>
          <Text fontSize={{ base: "5xl", md: "6xl" }} transform="rotate(12deg)">🥝</Text>
        </Flex>

        <Text color="#8d3f2b" fontSize="xs" fontWeight="900" letterSpacing="0.16em" textTransform="uppercase">
          Feeling fruity?
        </Text>
        <Heading mt="3" maxW="230px" color="#342d20" fontSize={{ base: "2xl", md: "3xl" }} letterSpacing="-0.045em" lineHeight="1.02">
          Pick a random fruit.
        </Heading>

        <Flex
          position="absolute"
          left={{ base: "6", md: "8" }}
          right={{ base: "6", md: "8" }}
          bottom={{ base: "6", md: "8" }}
          align="center"
          justify="space-between"
          gap="4"
          p="4"
          border="1px solid rgba(114,76,34,.18)"
          borderRadius="2xl"
          bg="rgba(255,253,246,.86)"
          boxShadow="0 14px 35px rgba(115,76,34,.13)"
          backdropFilter="blur(8px)"
        >
          <HStack gap="3">
            <Text fontSize="3xl">🍑</Text>
            <Box>
              <Text color="#89745a" fontSize="9px" fontWeight="900" letterSpacing="0.13em">TODAY&apos;S PICK</Text>
              <Text color="#342d20" fontWeight="900">Peach</Text>
            </Box>
          </HStack>
          <Badge px="3" py="2" borderRadius="full" bg="#4f6b45" color="white">PICK AGAIN →</Badge>
        </Flex>
      </Box>
    );
  }

  if (type === "maze") {
    return <CornMazeCardVisual />;
  }

  return (
    <Flex
      aria-hidden="true"
      minH="245px"
      align="center"
      justify="center"
      p="7"
      bg="#d9ead9"
    >
      <Box
        w="210px"
        p="4"
        borderRadius="3xl"
        bg="#171a18"
        boxShadow="0 22px 45px rgba(29, 33, 28, 0.28)"
      >
        <Flex
          h="52px"
          mb="3"
          px="4"
          align="center"
          justify="flex-end"
          borderRadius="xl"
          bg="#2b302d"
          color="#eff5ea"
          fontFamily="monospace"
          fontSize="2xl"
        >
          1,024
        </Flex>
        <SimpleGrid columns="4" gap="2">
          {["AC", "DEL", "÷", "×", "7", "8", "9", "−", "4", "5", "6", "+", "1", "2", "3", "=", "0", "."].map(
            (key, index) => (
              <Flex
                key={`${key}-${index}`}
                minH="32px"
                gridColumn={key === "0" ? "span 2" : undefined}
                gridRow={key === "=" ? "span 2" : undefined}
                align="center"
                justify="center"
                borderRadius="lg"
                bg={key === "=" ? colors.rust : ["÷", "×", "−", "+"].includes(key) ? "#8fb06e" : "#343a36"}
                color="white"
                fontSize="xs"
                fontWeight="800"
              >
                {key}
              </Flex>
            ),
          )}
        </SimpleGrid>
      </Box>
    </Flex>
  );
}

function ProjectCard({ project, onPlayMaze }) {
  return (
    <Grid
      as="article"
      gridColumn={project.featured ? { lg: "1 / -1" } : undefined}
      templateColumns={project.featured ? { base: "1fr", lg: "1.08fr 0.92fr" } : "1fr"}
      overflow="hidden"
      border="1px solid"
      borderColor={colors.line}
      borderRadius={{ base: "2xl", md: "3xl" }}
      bg={colors.surface}
      boxShadow="0 16px 55px rgba(29, 33, 28, 0.06)"
      transition="transform 220ms ease, box-shadow 220ms ease"
      _hover={{ transform: "translateY(-5px)", boxShadow: "0 24px 70px rgba(29, 33, 28, 0.11)" }}
    >
      <ProjectVisual type={project.visual} />

      <Stack p={{ base: "6", md: "8", lg: project.featured ? "10" : "8" }} gap="5">
        <Flex align="center" justify="space-between" gap="4">
          <Text color={colors.forest} fontSize="xs" fontWeight="800" letterSpacing="0.14em" textTransform="uppercase">
            {project.type}
          </Text>
          <Text color="#a9ada4" fontSize="2xl" fontWeight="800">
            {project.number}
          </Text>
        </Flex>

        <Heading color={colors.ink} fontSize={{ base: "2xl", md: project.featured ? "4xl" : "3xl" }} letterSpacing="-0.04em">
          {project.title}
        </Heading>

        <Text color={colors.muted} fontSize={{ base: "md", md: "lg" }} lineHeight="1.75">
          {project.description}
        </Text>

        <Stack gap="2">
          {project.highlights.map((highlight) => (
            <HStack key={highlight} gap="3" color={colors.ink}>
              <Flex w="5" h="5" flex="0 0 auto" align="center" justify="center" borderRadius="full" bg={colors.forestLight}>
                <Check size={12} strokeWidth={3} />
              </Flex>
              <Text fontSize="sm" fontWeight="650">
                {highlight}
              </Text>
            </HStack>
          ))}
        </Stack>

        <Flex flexWrap="wrap" gap="2">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              px="3"
              py="1.5"
              borderRadius="full"
              border="1px solid"
              borderColor={colors.line}
              bg="transparent"
              color={colors.muted}
              fontSize="xs"
              fontWeight="700"
            >
              {tag}
            </Badge>
          ))}
        </Flex>

        <HStack pt="2" gap="5" flexWrap="wrap">
          {project.playable ? (
            <Button
              h="11"
              px="5"
              borderRadius="full"
              bg={colors.forest}
              color="white"
              fontWeight="800"
              _hover={{ bg: "#243b2b", transform: "translateY(-1px)" }}
              _focusVisible={{ outline: `3px solid ${colors.lime}`, outlineOffset: "3px" }}
              onClick={onPlayMaze}
            >
              <HStack gap="2">
                <Play size={16} fill="currentColor" />
                <Text>Play maze</Text>
              </HStack>
            </Button>
          ) : (
            <Link
              href={project.live}
              target="_blank"
              rel="noreferrer"
              color={colors.forest}
              fontWeight="800"
              textDecoration="none"
              _hover={{ color: colors.rust }}
              _focusVisible={{ outline: `3px solid ${colors.lime}`, outlineOffset: "3px" }}
            >
              <HStack gap="2">
                <Text>Visit live app</Text>
                <ArrowUpRight size={17} />
              </HStack>
            </Link>
          )}
          <Link
            href={project.repository}
            target="_blank"
            rel="noreferrer"
            color={colors.muted}
            fontWeight="700"
            textDecoration="none"
            _hover={{ color: colors.ink }}
            _focusVisible={{ outline: `3px solid ${colors.lime}`, outlineOffset: "3px" }}
          >
            <HStack gap="2">
              <GitBranch size={17} />
              <Text>View repository</Text>
            </HStack>
          </Link>
        </HStack>
      </Stack>
    </Grid>
  );
}

function AnimatedMazeDisplay() {
  const plants = Array.from({ length: 9 }, (_, index) => ({
    index,
    offset: index * 13 - 17,
    height: 48 + index * 6,
    width: 11 + index * 1.7,
  }));

  return (
    <Box role="img" aria-label="Animated first-person view down a sunny corn maze path" position="relative" minH={{ base: "330px", md: "410px" }} overflow="hidden" borderRadius={{ base: "3xl", md: "4xl" }} bg="#8fcbe1" boxShadow="0 28px 90px rgba(49, 75, 56, 0.22)" isolation="isolate">
      <style>{`
        @keyframes maze-cloud-drift { from { transform: translateX(-10px); } to { transform: translateX(16px); } }
        @keyframes maze-camera-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(3px); } }
        @keyframes maze-field-sway { 0%, 100% { transform: rotate(-1deg); } 50% { transform: rotate(1deg); } }
        @media (prefers-reduced-motion: reduce) { .maze-cloud, .maze-camera, .maze-plant { animation: none !important; } }
      `}</style>
      <Box position="absolute" inset="0" bg="linear-gradient(180deg, #68b8df 0%, #b8e1e9 42%, #f3dfaa 58%, #6e8b43 59%, #263b27 100%)" />
      <Box position="absolute" top="9%" right="14%" w={{ base: "44px", md: "64px" }} h={{ base: "44px", md: "64px" }} borderRadius="full" bg="#fff4c4" boxShadow="0 0 55px 18px rgba(255,244,196,.34)" />
      {[["12%", "22%", "112px"], ["43%", "13%", "150px"], ["75%", "29%", "126px"]].map(([left, top, cloudWidth], index) => (
        <Box key={left} className="maze-cloud" position="absolute" left={left} top={top} w={{ base: "90px", md: cloudWidth }} h={{ base: "30px", md: "42px" }} borderRadius="full" bg="rgba(255,255,255,.72)" filter="blur(2px)" animation={`maze-cloud-drift ${7 + index * 2}s ease-in-out infinite alternate`}>
          <Box position="absolute" left="18%" top="-42%" w="44%" h="92%" borderRadius="full" bg="inherit" />
          <Box position="absolute" right="14%" top="-25%" w="38%" h="78%" borderRadius="full" bg="inherit" />
        </Box>
      ))}
      <Box className="maze-camera" position="absolute" inset="0" animation="maze-camera-bob 4s ease-in-out infinite">
        <Box position="absolute" inset="0" top="55%" bg="linear-gradient(180deg, #8d9a57 0%, #465a36 45%, #243527 100%)" />
        <Box position="absolute" left="50%" top="55%" w="100%" h="50%" transform="translateX(-50%)" clipPath="polygon(47% 0, 53% 0, 100% 100%, 0 100%)" bg="linear-gradient(180deg, #b89a61 0%, #82613b 48%, #57422e 100%)" />
        <Box position="absolute" left="50%" top="57%" w="78%" h="43%" transform="translateX(-50%)" clipPath="polygon(49% 0, 51% 0, 100% 100%, 0 100%)" opacity=".38" backgroundImage="repeating-linear-gradient(176deg, transparent 0 19px, rgba(47,34,22,.34) 20px 22px)" />
        {[{ side: "left", reverse: false }, { side: "right", reverse: true }].map(({ side, reverse }) => (
          <Box key={side} position="absolute" inset="0" pointerEvents="none">
            {plants.map(({ index, offset, height, width }) => (
              <Box key={index} className="maze-plant" position="absolute" bottom="-9%" left={reverse ? undefined : `${offset}%`} right={reverse ? `${offset}%` : undefined} w={{ base: `${width * 0.72}%`, md: `${width}%` }} h={{ base: `${height * 0.82}%`, md: `${height}%` }} zIndex={index + 1} opacity={0.76 + index * 0.025} transform={`rotate(${index % 2 ? 1 : -1}deg)`} animation={`maze-field-sway ${4 + index % 3}s ease-in-out infinite`} style={{ animationDelay: `${index * -0.4}s` }}>
                <Box position="absolute" left="46%" top="0" w="12%" h="100%" borderRadius="full" bg="linear-gradient(90deg, #385c2e, #a1a54f 48%, #4c7334)" />
                {[0, 1, 2, 3, 4].map((leaf) => (
                  <Box key={leaf} position="absolute" left={leaf % 2 ? "45%" : "48%"} top={`${15 + leaf * 15}%`} w={`${48 + (leaf % 2) * 10}%`} h="18%" transformOrigin="left center" transform={`rotate(${leaf % 2 ? 28 : -32}deg)`} clipPath="polygon(0 45%, 36% 12%, 100% 0, 72% 55%, 100% 100%, 34% 76%)" bg={leaf % 3 === 0 ? "#557b36" : leaf % 3 === 1 ? "#759341" : "#a0a151"} opacity=".94" />
                ))}
              </Box>
            ))}
          </Box>
        ))}
        <Box position="absolute" left="50%" top="48%" w="3px" h="18px" transform="translate(-50%, -50%)" bg="rgba(255,255,255,.85)" boxShadow="0 0 12px rgba(255,255,255,.8)" />
        <Box position="absolute" left="50%" top="48%" w="18px" h="3px" transform="translate(-50%, -50%)" bg="rgba(255,255,255,.85)" boxShadow="0 0 12px rgba(255,255,255,.8)" />
      </Box>
      <Flex position="absolute" top="5" left="5" right="5" align="center" justify="space-between" gap="3">
        <Badge px="3" py="1.5" borderRadius="full" bg="rgba(22,42,29,.58)" color="white" backdropFilter="blur(8px)">CORN MAZE · FIRST PERSON</Badge>
        <Text px="3" py="1.5" borderRadius="full" bg="rgba(22,42,29,.48)" color="white" fontFamily="monospace" fontSize="xs">↑ EXIT BEARING</Text>
      </Flex>
      <Box position="absolute" left="5" bottom="5" px="3" py="2" border="1px solid rgba(255,255,255,.2)" borderRadius="full" bg="rgba(22,42,29,.55)" color="white" fontSize="xs" fontWeight="800" backdropFilter="blur(8px)">A field level, in motion</Box>
    </Box>
  );
}

function App() {
  const [mazeOpen, setMazeOpen] = useState(false);

  return (
    <Box minH="100vh" color={colors.ink}>
      <Box
        as="header"
        position="sticky"
        top="0"
        zIndex="10"
        borderBottom="1px solid rgba(216, 217, 209, 0.78)"
        bg="rgba(247, 245, 239, 0.86)"
        backdropFilter="blur(18px)"
      >
        <Container maxW="1180px" px={{ base: "5", md: "8" }}>
          <Flex h="18" align="center" justify="space-between">
            <Link
              href="#home"
              color={colors.ink}
              fontSize="lg"
              fontWeight="900"
              letterSpacing="-0.04em"
              textDecoration="none"
              _focusVisible={{ outline: `3px solid ${colors.lime}`, outlineOffset: "4px" }}
            >
              AR<span style={{ color: colors.rust }}>.</span>
            </Link>

            <HStack as="nav" aria-label="Primary navigation" display={{ base: "none", md: "flex" }} gap="7">
              {["About", "Projects", "Skills"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  color={colors.muted}
                  fontSize="sm"
                  fontWeight="700"
                  textDecoration="none"
                  _hover={{ color: colors.ink }}
                  _focusVisible={{ outline: `3px solid ${colors.lime}`, outlineOffset: "4px" }}
                >
                  {item}
                </Link>
              ))}
            </HStack>

            <Button
              asChild
              h="10"
              px={{ base: "4", md: "5" }}
              borderRadius="full"
              bg={colors.ink}
              color="white"
              fontSize="sm"
              _hover={{ bg: colors.forest, transform: "translateY(-1px)" }}
              _focusVisible={{ outline: `3px solid ${colors.lime}`, outlineOffset: "3px" }}
            >
              <a href="mailto:arayamajhi19@gmail.com">
                <HStack gap="2">
                  <Mail size={15} />
                  <Text display={{ base: "none", sm: "block" }}>Let&apos;s talk</Text>
                  <Text display={{ base: "block", sm: "none" }}>Email</Text>
                </HStack>
              </a>
            </Button>
          </Flex>
        </Container>
      </Box>

      <Box as="main">
        <Container id="home" maxW="1180px" px={{ base: "5", md: "8" }} pt={{ base: "20", md: "28" }} pb={{ base: "24", md: "32" }}>
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: "14", lg: "16" }} alignItems="end">
            <Stack gap="7">
              <HStack gap="3">
                <Flex w="8" h="8" align="center" justify="center" borderRadius="full" bg={colors.forestLight} color={colors.forest}>
                  <Sparkles size={16} />
                </Flex>
                <Text color={colors.forest} fontSize="sm" fontWeight="800" letterSpacing="0.1em" textTransform="uppercase">
                  Full-stack developer
                </Text>
              </HStack>

              <Heading
                as="h1"
                maxW="760px"
                color={colors.ink}
                fontSize={{ base: "5xl", sm: "6xl", md: "7xl", lg: "8xl" }}
                fontWeight="850"
                letterSpacing="-0.065em"
                lineHeight={{ base: "0.98", md: "0.94" }}
              >
                Software built with clarity and care.
              </Heading>

              <Text maxW="650px" color={colors.muted} fontSize={{ base: "lg", md: "xl" }} lineHeight="1.7">
                I&apos;m Abhudaya Rayamajhi. I combine software development with a background in healthcare, research, and quality systems to build useful products people can trust.
              </Text>

              <Flex flexWrap="wrap" gap="3">
                <LinkButton href="#projects" primary>
                  <HStack gap="2">
                    <Text>Explore my work</Text>
                    <ArrowDownRight size={17} />
                  </HStack>
                </LinkButton>
              </Flex>
            </Stack>

            <AnimatedMazeDisplay />
          </SimpleGrid>
        </Container>

        <Box borderY="1px solid" borderColor={colors.line} bg="rgba(255, 253, 248, 0.7)">
          <Container maxW="1180px" px={{ base: "5", md: "8" }} py="5">
            <Flex justify="space-between" gap="6" flexWrap="wrap" color={colors.muted} fontSize="sm" fontWeight="700">
              <Text>REACT + CHAKRA UI</Text>
              <Text>NODE.JS + EXPRESS</Text>
              <Text>MYSQL + REST APIS</Text>
              <Text>NETLIFY + GITHUB</Text>
            </Flex>
          </Container>
        </Box>

        <Container id="about" maxW="1180px" px={{ base: "5", md: "8" }} py={{ base: "24", md: "32" }}>
          <SectionLabel>About</SectionLabel>
          <SimpleGrid columns={{ base: 1, lg: 3 }} gap={{ base: "10", lg: "12" }} alignItems="center">
            <Heading fontSize={{ base: "4xl", md: "6xl" }} letterSpacing="-0.055em" lineHeight="1.02">
              A different perspective on building software.
            </Heading>
            <Stack gap="6" color={colors.muted} fontSize={{ base: "lg", md: "xl" }} lineHeight="1.75">
              <Text>
                My work across healthcare, clinical research, and quality systems taught me to listen carefully, investigate methodically, and communicate complex ideas clearly.
              </Text>
              <Text>
                I bring that same discipline to software: understand the real problem, keep the experience simple, and build the details to last.
              </Text>
            </Stack>
            <ProfilePhotoSlot />
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, md: 3 }} gap="5" mt={{ base: "14", md: "20" }}>
            {[
              ["01", "Clear thinking", "I turn broad requirements into focused, testable steps."],
              ["02", "Human-centered", "I design around the person using the product, not just the code."],
              ["03", "Built for trust", "I value reliability, readable systems, and thoughtful validation."],
            ].map(([number, title, copy]) => (
              <Stack key={number} p={{ base: "6", md: "7" }} gap="7" borderTop="2px solid" borderColor={colors.forest} bg={colors.surface}>
                <Text color={colors.rust} fontWeight="900">
                  {number}
                </Text>
                <Box>
                  <Heading mb="3" fontSize="xl" letterSpacing="-0.025em">
                    {title}
                  </Heading>
                  <Text color={colors.muted} lineHeight="1.65">
                    {copy}
                  </Text>
                </Box>
              </Stack>
            ))}
          </SimpleGrid>
        </Container>

        <Box id="projects" bg="#eeeee7" borderY="1px solid" borderColor={colors.line}>
          <Container maxW="1180px" px={{ base: "5", md: "8" }} py={{ base: "24", md: "32" }}>
            <Flex mb={{ base: "12", md: "16" }} align={{ base: "start", md: "end" }} justify="space-between" direction={{ base: "column", md: "row" }} gap="6">
              <Box>
                <SectionLabel>Selected projects</SectionLabel>
                <Heading maxW="760px" fontSize={{ base: "4xl", md: "6xl" }} letterSpacing="-0.055em" lineHeight="1">
                  Recent work, made to be used.
                </Heading>
              </Box>
              <Link
                href="https://github.com/abhuraya"
                target="_blank"
                rel="noreferrer"
                color={colors.forest}
                fontWeight="800"
                textDecoration="none"
                _hover={{ color: colors.rust }}
                _focusVisible={{ outline: `3px solid ${colors.lime}`, outlineOffset: "4px" }}
              >
                <HStack gap="2">
                  <GitBranch size={18} />
                  <Text>All repositories</Text>
                  <ArrowUpRight size={17} />
                </HStack>
              </Link>
            </Flex>

            <SimpleGrid columns={{ base: 1, lg: 2 }} gap="6">
              {projects.map((project) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  onPlayMaze={() => setMazeOpen(true)}
                />
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        <Container id="skills" maxW="1180px" px={{ base: "5", md: "8" }} py={{ base: "24", md: "32" }}>
          <SectionLabel>Technical toolkit</SectionLabel>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: "8", md: "16" }} alignItems="end" mb={{ base: "12", md: "16" }}>
            <Heading fontSize={{ base: "4xl", md: "6xl" }} letterSpacing="-0.055em" lineHeight="1">
              The tools behind the work.
            </Heading>
            <Text color={colors.muted} fontSize={{ base: "lg", md: "xl" }} lineHeight="1.7">
              I&apos;m most at home connecting a clean React interface to practical server-side logic and well-structured data.
            </Text>
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, sm: 2 }} borderTop="1px solid" borderLeft="1px solid" borderColor={colors.line}>
            {skills.map(({ icon: SkillIcon, title, items }) => (
              <Stack key={title} minH="220px" p={{ base: "6", md: "8" }} gap="9" borderRight="1px solid" borderBottom="1px solid" borderColor={colors.line} bg="rgba(255, 253, 248, .66)">
                <Flex w="11" h="11" align="center" justify="center" borderRadius="xl" bg={colors.forestLight} color={colors.forest}>
                  <SkillIcon size={21} />
                </Flex>
                <Box>
                  <Heading mb="3" fontSize="xl" letterSpacing="-0.03em">
                    {title}
                  </Heading>
                  <Text color={colors.muted} lineHeight="1.7">
                    {items}
                  </Text>
                </Box>
              </Stack>
            ))}
          </SimpleGrid>
        </Container>

        <Box as="section" bg={colors.forest} color="white">
          <Container maxW="1180px" px={{ base: "5", md: "8" }} py={{ base: "24", md: "32" }}>
            <SectionLabel light>Contact</SectionLabel>
            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: "10", lg: "20" }} alignItems="end">
              <Heading maxW="720px" fontSize={{ base: "5xl", md: "7xl" }} letterSpacing="-0.06em" lineHeight="0.96">
                Have a useful idea? Let&apos;s make it real.
              </Heading>
              <Stack gap="7" alignItems="start">
                <Text maxW="560px" color="rgba(255,255,255,.72)" fontSize={{ base: "lg", md: "xl" }} lineHeight="1.7">
                  I&apos;m looking for developer opportunities where I can contribute, keep learning, and help build thoughtful, reliable products.
                </Text>
                <Button
                  asChild
                  h="14"
                  px="7"
                  borderRadius="full"
                  bg={colors.lime}
                  color={colors.ink}
                  fontWeight="800"
                  _hover={{ bg: "#e5f7be", transform: "translateY(-2px)" }}
                  _focusVisible={{ outline: "3px solid white", outlineOffset: "4px" }}
                >
                  <a href="mailto:arayamajhi19@gmail.com">
                    <HStack gap="3">
                      <Mail size={18} />
                      <Text>arayamajhi19@gmail.com</Text>
                      <ArrowUpRight size={18} />
                    </HStack>
                  </a>
                </Button>
              </Stack>
            </SimpleGrid>
          </Container>
        </Box>
      </Box>

      <Box as="footer" bg="#24382a" color="rgba(255,255,255,.66)">
        <Container maxW="1180px" px={{ base: "5", md: "8" }} py="8">
          <Flex justify="space-between" align={{ base: "start", md: "center" }} direction={{ base: "column", md: "row" }} gap="5" fontSize="sm">
            <Text>© {new Date().getFullYear()} Abhudaya Rayamajhi</Text>
            <HStack gap="6">
              <Link href="https://github.com/abhuraya" target="_blank" rel="noreferrer" color="inherit" _hover={{ color: "white" }}>
                GitHub
              </Link>
              <Link href="#home" color="inherit" _hover={{ color: "white" }}>
                Back to top ↑
              </Link>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {mazeOpen && <MazeGame onClose={() => setMazeOpen(false)} />}
    </Box>
  );
}

export default App;
